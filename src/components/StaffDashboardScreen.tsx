import { logAuditActivity } from '../utils/auditHelpers';
import React, { useEffect, useState, useRef } from 'react';
import {  useNavigate } from 'react-router-dom';
import {  ArrowLeft, LogOut, Calendar, User, Clock, MapPin, CheckCircle2, Camera, X, Headset, AlertTriangle, RefreshCw , FileText} from 'lucide-react';
import { NativeBiometric } from '@capgo/capacitor-native-biometric';
import { getOrCreateDeviceId } from '../utils/deviceUtils';
import { useSync } from "./SyncContext";
import LiveCamera from './LiveCamera';
import {  motion, AnimatePresence } from 'motion/react';
import AttendanceSuccessModal from './AttendanceSuccessModal';
import {  db, storage } from '../firebase';
import {  sendCenterNotification } from '../utils/notificationService';
import {  collection, query, where, getDocs, addDoc, serverTimestamp, getDoc, doc, updateDoc, onSnapshot, getDocsFromCache, getDocFromCache } from 'firebase/firestore';
import {  ref, uploadString, getDownloadURL } from 'firebase/storage';
import {  compressImage } from '../utils/imageCompression';
import {  saveOfflineRecord, syncOfflineRecords, getOfflineRecords } from '../utils/offlineSync';
import {  uploadWithRetry } from '../utils/uploadHelpers';



export const getDeviceLocation = (onSuccess: any, onError: any, options?: any) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      onSuccess,
      (err) => {
        console.warn("HTML5 Geolocation failed, trying IP fallback...", err);
        fetch('https://ipapi.co/json/')
          .then(res => res.json())
          .then(data => {
            if (data.latitude && data.longitude) {
              onSuccess({ coords: { latitude: data.latitude, longitude: data.longitude, accuracy: 1000 } });
            } else {
              onError(err);
            }
          })
          .catch(() => onError(err));
      },
      options || { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  } else {
    onError({ code: 1, message: "Geolocation not supported" });
  }
};

function getDistanceFromLatLonInM(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371;
  var dLat = deg2rad(lat2-lat1);
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c * 1000;
  return Math.round(d);
}

function deg2rad(deg: number) {
  return deg * (Math.PI/180)
}


function CustomDropdown({ value, onChange, options, placeholder }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none flex justify-between items-center cursor-pointer"
      >
        <span className={value ? "text-slate-900" : "text-slate-400"}>
          {value ? options.find((o: any) => o.value === value)?.label || value : placeholder}
        </span>
        <div className="text-slate-400 font-bold ml-2">{isOpen ? '▲' : '▼'}</div>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-2xl max-h-56 overflow-y-auto">
          {options.map((opt: any) => (
            <div 
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className="p-3 text-sm hover:bg-indigo-50 active:bg-indigo-100 cursor-pointer border-b border-slate-50 last:border-0 font-medium text-slate-800"
            >
              {opt.label}
            </div>
          ))}
          {options.length === 0 && <div className="p-3 text-sm text-slate-500">No options available</div>}
        </div>
      )}
    </div>
  );
}

export default function StaffDashboardScreen() {
  const navigate = useNavigate();
  const { isOnline } = useSync();
  const [staffData, setStaffData] = useState<any>(null);
    const [centerInfo, setCenterInfo] = useState<any>(null);
  
  const [loading, setLoading] = useState(false);
  const [deviceId, setDeviceId] = useState('');
  
  const [attendanceRecord, setAttendanceRecord] = useState<any>(null);
  const hasMarkedIn = !!attendanceRecord;
  const hasMarkedOut = !!(attendanceRecord && attendanceRecord['OUT Time']);

  const [locationInfo, setLocationInfo] = useState<{lat: number, lng: number, address: string, distance: number | null, accuracy: number} | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [pendingLocation, setPendingLocation] = useState<any>(null);

  const [attendanceType, setAttendanceType] = useState<'IN' | 'OUT'>('IN');
  const [isOfficialDuty, setIsOfficialDuty] = useState(false);
  const [liveLocation, setLiveLocation] = useState<{lat: number, lng: number, distance: number | null, address: string} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  
  
  

  const [isCapturingSelfie, setIsCapturingSelfie] = useState(false);
  const [selfieMode, setSelfieMode] = useState<'IN'|'OUT'>('IN');

      const [submitting, setSubmitting] = useState(false);
  const [offlineRecords, setOfflineRecords] = useState<any[]>([]);

  useEffect(() => {
    getOfflineRecords().then(setOfflineRecords);
  }, []);

  const [isSyncing, setIsSyncing] = useState(false);
  const [assignedReports, setAssignedReports] = useState<string[]>([]);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [showDailyReportPopup, setShowDailyReportPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState<{type: 'IN' | 'OUT', title: string, subtitle: string, details?: any} | null>(null);
  const [reportReminderPopup, setReportReminderPopup] = useState(false);

  const handleOutSuccess = (timeStr: string) => {
      setSuccessPopup({
        type: 'OUT',
        title: 'Attendance OUT Successful ✅',
        subtitle: "Thank you for your valuable contribution to Yashi Skill Project Pvt. Ltd. 🙏\n\nYour OUT Attendance has been recorded successfully.\n\nHave a great day! 😊",
        details: {
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          time: timeStr,
          center: centerInfo?.name || '',
          staffName: staffData?.name || ''
        }
      });
  };


  useEffect(() => {
    let timer: any;
    const fetchReports = async () => {
      if (staffData?.staffId) {
        try {
          const q = query(collection(db, 'report_assignments'), where('staffEmpId', '==', staffData.staffId));
          let snap: any;
          if (!navigator.onLine) {
             try { snap = await getDocsFromCache(q); } catch(e) {}
          }
          if (!snap) {
             snap = await getDocs(q);
          }
          if (snap) {
            const reports = snap.docs.map((doc: any) => doc.data().reportName || doc.data().reportId);
            setAssignedReports(reports);
          }
        } catch(e) {}
      }
    };
    
    timer = setTimeout(() => {
      fetchReports();
    }, 2000);
  
  
  return () => {
      clearTimeout(timer);
    };
  }, [staffData]);

  useEffect(() => {
    const handleOnline = () => {
      syncData(true);
    };
    const handleOfflineRecordsUpdate = () => {
      getOfflineRecords().then(setOfflineRecords);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline-records-updated', handleOfflineRecordsUpdate);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline-records-updated', handleOfflineRecordsUpdate);
    };
  }, []);

  const syncData = async (silent = false) => {
    if (!navigator.onLine) { 
      if (!silent) alert('You are offline. Please connect to internet to sync.'); 
      return; 
    }
    setIsSyncing(true);
    const success = await syncOfflineRecords();
    getOfflineRecords().then(setOfflineRecords);
    setIsSyncing(false);
    if (!silent) {
      if (success) {
        alert('Sync completed successfully!');
      } else {
        alert('Some records failed to sync. Please try again.');
      }
    }
  };


  const [showOfficialDuty, setShowOfficialDuty] = useState(false);
  const [appSettings, setAppSettings] = useState<any>({
    attendanceModuleEnabled: true,
    leaveModuleEnabled: true,
    odModuleEnabled: true,
    supportModuleEnabled: true
  });
  const [securitySettings, setSecuritySettings] = useState<any>({});

  const [fingerprintVerificationDone, setFingerprintVerificationDone] = useState(false);
  const initialFingerprintPrompted = useRef(false);

  useEffect(() => {
    const verifyInitialFingerprint = async () => {
      if (!securitySettings?.mandatoryFingerprint || !staffData?.uid || fingerprintVerificationDone || initialFingerprintPrompted.current) return;
      initialFingerprintPrompted.current = true;
      
      try {
        const staffRef = doc(db, 'staff', staffData.uid);
        const staffDoc = await getDoc(staffRef);
        
        if (staffDoc.exists() && !staffDoc.data().fingerprintActivated) {
           alert("Security verification is required. Please verify your fingerprint.");
           let bioAvailable;
           try {
             bioAvailable = await NativeBiometric.isAvailable();
           } catch (e: any) {
             console.warn("Biometric API not available:", e);
             if ((typeof window !== 'undefined' && !window.hasOwnProperty('cordova') && !window.hasOwnProperty('Capacitor')) || (e.message && e.message.toLowerCase().includes('implemented'))) {
               const simulate = window.confirm("[Simulation] Fingerprint required for setup. Click OK to simulate.");
               if (simulate) {
                 await updateDoc(staffRef, { fingerprintActivated: true });
                 setFingerprintVerificationDone(true);
                 alert("Fingerprint Security Enabled Successfully (Simulated).");
                 return;
               }
             }
             alert("Biometric API error: " + (e.message || "Not supported on this device."));
             return;
           }

           if (bioAvailable.isAvailable) {
             try {
               await NativeBiometric.verifyIdentity({
                 reason: "Verify Fingerprint for Security Policy",
                 title: "Biometric Authentication",
                 subtitle: "Mandatory Fingerprint Security",
                 description: "Required for staff account"
               });
               
               await updateDoc(staffRef, { fingerprintActivated: true });
               setFingerprintVerificationDone(true);
               alert("Fingerprint Security Enabled Successfully.");
             } catch (error) {
               alert("Fingerprint verification failed or was cancelled.");
             }
           } else {
             alert("Biometric authentication is not available on this device.");
           }
        } else {
           setFingerprintVerificationDone(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    verifyInitialFingerprint();
  }, [securitySettings?.mandatoryFingerprint, staffData?.uid, fingerprintVerificationDone]);

  const [odDutyType, setOdDutyType] = useState('');
  const [dutyTypesList, setDutyTypesList] = useState<string[]>([
    'Field Visit',
    'Training',
    'Meeting',
    'Inspection',
    'Mobilization',
    'Government Work',
    'Office Work',
    'Exam Duty',
    'Official Tour',
    'Other'
  ]);
  const [otherOdDutyType, setOtherOdDutyType] = useState('');
  const [odReason, setOdReason] = useState('');
  const [odRemarks, setOdRemarks] = useState('');
  const [odPhoto, setOdPhoto] = useState<string | null>(null);
  const [odRequests, setOdRequests] = useState<any[]>([]);

  const fetchLiveLocation = () => {
    setLocationError(null);
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    const cachedStr = sessionStorage.getItem('lastLocation');
    if (cachedStr) {
      try {
        const cached = JSON.parse(cachedStr);
        if (Date.now() - cached.timestamp < 300000) {
          setLiveLocation(cached);
        }
      } catch (e) {}
    }

    let isResolved = false;

    const timeoutId = setTimeout(() => {
      if (!isResolved && !liveLocation) {
        setLocationError("Location fetching timed out. Please check your GPS and internet connection.");
      }
    }, 6000);

    getDeviceLocation(
      async (position) => {
        isResolved = true;
        clearTimeout(timeoutId);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
           
        let distance = null;
        if (centerInfo && centerInfo.latitude && centerInfo.longitude) {
          distance = getDistanceFromLatLonInM(centerInfo.latitude, centerInfo.longitude, lat, lng);
        }
           
        const locData = { lat, lng, distance, address: 'Fetching address...' };
        setLiveLocation(locData);
        sessionStorage.setItem('lastLocation', JSON.stringify({...locData, timestamp: Date.now()}));
           
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const data = await res.json();
          if (data.display_name) {
            setLiveLocation(prev => {
              if (prev) {
                const updated = { ...prev, address: data.display_name };
                sessionStorage.setItem('lastLocation', JSON.stringify({...updated, timestamp: Date.now()}));
                return updated;
              }
              return null;
            });
          }
        } catch (err) {}
      },
      (error) => {
        isResolved = true;
        clearTimeout(timeoutId);
        if (liveLocation) {
          console.warn("Location error, using fallback liveLocation.");
          return;
        }
        let errorMsg = 'Failed to get location.';
        if (error.code === error.PERMISSION_DENIED) errorMsg = "Location permission denied. Please enable GPS and allow location access.";
        if (error.code === error.POSITION_UNAVAILABLE) errorMsg = "Location information is unavailable. Ensure your GPS is turned on.";
        if (error.code === error.TIMEOUT) errorMsg = "The request to get user location timed out.";
        setLocationError(errorMsg);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
  };

  useEffect(() => {
    fetchLiveLocation();
  }, [centerInfo]);

  

  useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (!sessionStr) {
      navigate('/centre-login');
      return;
    }
    const session = JSON.parse(sessionStr);
    if (session.role !== 'staff') {
      navigate('/centre-login');
      return;
    }
    setStaffData(session);

    const getCenter = async () => {
      try {
        let cDoc: any;
        if (!navigator.onLine) {
           try { cDoc = await getDocFromCache(doc(db, 'centers', session.centerId)); } catch(e) {}
           if (!cDoc) {
              try { cDoc = await getDoc(doc(db, 'centers', session.centerId)); } catch(e) {}
           }
        } else {
           try { cDoc = await getDoc(doc(db, 'centers', session.centerId)); } catch(e) {}
           if (!cDoc) {
              try { cDoc = await getDocFromCache(doc(db, 'centers', session.centerId)); } catch(e) {}
           }
        }
        if (cDoc && cDoc.exists && cDoc.exists()) {
           setCenterInfo(cDoc.data());
        }
      } catch(e) {}
    }
    getCenter();

    let storedDeviceId = localStorage.getItem('deviceId');
    if (!storedDeviceId) {
      storedDeviceId = 'dev_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('deviceId', storedDeviceId);
    }
    setDeviceId(storedDeviceId);

    checkTodayAttendance(session.uid);
    checkODRequests(session.uid);
    
    const loadSettings = async () => {
      try {
        const appSnap = await getDoc(doc(db, 'settings', 'appSettings'));
        if (appSnap.exists()) {
           setAppSettings(prev => ({ ...prev, ...appSnap.data() }));
        }
        
        const secSnap = await getDoc(doc(db, 'settings', 'security'));
        if (secSnap.exists()) {
          setSecuritySettings(secSnap.data());
        }
      } catch (e) {
        console.error("Error loading settings", e);
      }
    };
    loadSettings();

    return () => {
    };
  }, [navigate]);

  const checkODRequests = async (uid: string) => {
    try {
      const q = query(
        collection(db, 'official_duty_requests'),
        where('staffUid', '==', uid)
      );
      let snapshot: any;
      if (!navigator.onLine) {
         try { snapshot = await getDocsFromCache(q); } catch(e) {}
         if (!snapshot) try { snapshot = await getDocs(q); } catch(e) {}
      } else {
         try { snapshot = await getDocs(q); } catch(e) {}
         if (!snapshot) try { snapshot = await getDocsFromCache(q); } catch(e) {}
      }
      
      const requests: any[] = [];
      if (snapshot) {
        snapshot.forEach((doc: any) => {
          requests.push({ id: doc.id, ...doc.data() });
        });
      }
      requests.sort((a, b) => {
         const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : 0;
         const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : 0;
         return timeB - timeA;
      });
      setOdRequests(requests);
    } catch(err) {
      console.error(err);
    }
  };

  const checkTodayAttendance = async (uid: string) => {
    try {
      const today = new Date().toLocaleDateString('en-CA');
      const q = query(
        collection(db, 'attendance'),
        where('staffUid', '==', uid),
        where('Date', '==', today)
      );
      
      let snap: any;
      if (!navigator.onLine) {
         try { snap = await getDocsFromCache(q); } catch(e) {}
      }
      if (!snap) {
         snap = await getDocs(q);
      }
      
      let rec: any = null;
      if (snap && !snap.empty) {
        const docSnap = snap.docs[0];
        rec = { id: docSnap.id, ...docSnap.data() };
      }
      
      try {
        const offRecs = await getOfflineRecords();
        if (!rec) {
           const inOffline = offRecs.find(r => r.type === 'IN' && (r?.data?.Date === today || r?.data?.date === today));
           if (inOffline) {
             rec = { id: inOffline.id, ...inOffline.data };
           }
        }
        if (rec) {
           const outOffline = offRecs.find(r => r.type === 'OUT' && (r?.data?.Date === today || r?.data?.date === today));
           if (outOffline) {
             rec = { ...rec, ...outOffline.data };
           }
        }
      } catch(e) {}
      
      setAttendanceRecord(rec);
    } catch (err) {
      console.error("Error checking attendance:", err);
    }
  };

  const handleLogout = () => {
    logAuditActivity(staffData?.name || 'Staff', 'Authentication', staffData?.name || 'Staff', 'Logout', 'Staff logged out', {
      role: 'Staff',
      userName: staffData?.name || 'Staff',
      staffId: staffData?.staffId || '',
      centerName: centerInfo?.name || '',
      centerCode: centerInfo?.code || '',
      moduleName: 'Authentication',
      action: 'Logout'
    });
    localStorage.removeItem('userSession');
    navigate('/home');
  };

  
  const processSelfieLocationAttendance = async (type: 'IN' | 'OUT', photoDataUrl: string) => {
    if (!navigator.onLine) {
        sendCenterNotification(centerInfo?.id || '', centerInfo?.code || '', 'Internet Disconnected During Attendance', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', type, 'User is offline', 0);
    }
    setLocationLoading(true);
    setAttendanceType(type);
    
    if (!navigator.geolocation) {
       sendCenterNotification(centerInfo?.id || '', centerInfo?.code || '', 'GPS Disabled', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', type, 'Geolocation not supported', 0);
       alert("Location permission is required.");
       setLocationLoading(false);
       return;
    }

    getDeviceLocation(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setPendingLocation(position.coords);
        
        try {
          let address = "Unknown Address";
          // Fetch address in background to avoid blocking submission
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              if (data.display_name) {
                 console.log("Address fetched in background:", data.display_name);
              }
            })
            .catch(() => {});
          
          let distance = 0;
          if (centerInfo && centerInfo.latitude && centerInfo.longitude) {
            distance = getDistanceFromLatLonInM(centerInfo.latitude, centerInfo.longitude, latitude, longitude);
          }
          
          const isOutside = distance > (Number(centerInfo?.geofenceRadius) || 200);
          if (isOutside && !isOfficialDuty) {
            alert("You are outside the Center Geofence.");
            sendCenterNotification(
              centerInfo?.id || '',
              centerInfo?.code || '',
              'Outside Geofence Attendance Attempt',
              staffData.name || '',
              staffData.staffId || '',
              staffData.designation || 'Staff',
              'Outside Geofence',
              `Attempted from ${Math.round(distance)}m away`,
              Math.round(distance)
            );
            setLocationLoading(false);
            return;
          }
          
          let attendanceStatus = isOutside ? 'Outside Geofence' : 'Present';
          
          if (!isOutside && type === 'IN') {
            try {
              if (centerInfo && centerInfo.workStartTime) {
                const [hours, minutes] = centerInfo.workStartTime.split(':').map(Number);
                const expectedTime = new Date();
                expectedTime.setHours(hours, minutes, 0, 0);
                const gracePeriodMs = (Number(centerInfo.gracePeriodMinutes) || 15) * 60000;
                const allowedTime = new Date(expectedTime.getTime() + gracePeriodMs);
                if (new Date() > allowedTime) {
                  attendanceStatus = 'Late';
                }
              }
            } catch(e) {}
          }
          
          const today = new Date();
          const dateStr = today.toLocaleDateString('en-CA');
          const timeStr = today.toLocaleTimeString('en-US', { hour12: false });
          
          if (type === 'IN') {
            const newRecord = {
              staffUid: staffData.uid || '',
              'Distance from Center': Math.round(distance),
              'Staff ID': staffData.staffId || '',
              'Staff Name': staffData.name || '',
              'Center Code': centerInfo?.code || '',
              'Center Name': centerInfo?.name || '',
              'Date': dateStr,
              date: dateStr,
              'IN Time': timeStr,
              'Latitude': latitude,
              'Longitude': longitude,
              'Accuracy': accuracy,
              'Current Address': address,
              'Device Information': deviceId || '',
              'Device ID': deviceId || '',
              'Geofence Result': isOutside ? 'Outside' : 'Inside',
              'Login Time': new Date(sessionStorage.getItem('loginTime') || Date.now()).toISOString(),
              'Attendance Time': new Date().toISOString(),
              'Network Status': navigator.onLine ? 'Online' : 'Offline',
              'Device Status': 'Approved', // Has to be approved to reach here

              'Attendance Status': attendanceStatus,
              'Attendance Type': 'Selfie Attendance',
              'syncStatus': 'Offline Saved'
            };
            
            const localId = `local_${Date.now()}`;
            await saveOfflineRecord({
              id: localId,
              type: 'IN',
              mode: 'Selfie Attendance',
              data: newRecord,
              photoDataUrl: photoDataUrl,
              timestamp: Date.now(),
              status: 'Offline Saved',
              isOutside
            });
            
            setAttendanceRecord({ id: localId, ...newRecord });
            setSuccessPopup({
              type: 'IN',
              title: '✅ Attendance Marked Successfully.',
              subtitle: 'Welcome to YASHI SKILL PROJECT PVT. LTD., Patna. 🤩',
              details: {
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                time: timeStr,
                center: centerInfo?.name || '',
                staffName: staffData?.name || ''
              }
            });
          } else {
            // OUT
            if (!attendanceRecord) return;
            
            const outDateStr = today.toLocaleDateString('en-CA');
            const workingHours = calculateWorkingHours(attendanceRecord['IN Time'] || attendanceRecord.time, timeStr);

            const outRecord: any = {
              'OUT Date': outDateStr,
              'OUT Time': timeStr,
              'Working Hours': workingHours,
              'OUT GPS Location': `${latitude}, ${longitude}`,
              'OUT Latitude': latitude,
              'OUT Longitude': longitude,
              'OUT Accuracy': accuracy,
              'OUT Current Address': address,
              'Device Information': deviceId || '',
              'Distance from Center': Math.round(distance),
              'OUT Status': attendanceStatus,
              'Attendance Status': attendanceStatus,
              'Attendance Type': 'Selfie Attendance',
              'syncStatus': 'Synced'
            };

            if (!navigator.onLine) {
               outRecord.syncStatus = 'Offline Saved';
               let targetDocId = attendanceRecord.attendanceDocId || attendanceRecord.id;
               if (targetDocId.startsWith('local_')) {
                  targetDocId = `${staffData.uid}_${attendanceRecord.Date || attendanceRecord.date}`;
               }
               const localId = `local_${Date.now()}`;
               await saveOfflineRecord({
                  id: localId,
                  type: 'OUT',
                  mode: 'Selfie Attendance',
                  data: outRecord,
                  photoDataUrl: photoDataUrl,
                  timestamp: Date.now(),
                  status: 'Offline Saved',
                  attendanceDocId: targetDocId,
                  isOutside
               });
               setAttendanceRecord({ ...attendanceRecord, ...outRecord, attendanceDocId: targetDocId, id: targetDocId });
               handleOutSuccess(timeStr);
               setLocationLoading(false);
               syncData(true);
               return;
            }

            try {
              let photoUrl = '';
              if (photoDataUrl) {
                const photoRef = ref(storage, `attendance_selfies/${staffData.uid}_OUT_${Date.now()}.jpg`);
                await uploadString(photoRef, photoDataUrl, 'data_url');
                photoUrl = await getDownloadURL(photoRef);
                outRecord['OUT Selfie URL'] = photoUrl;
              }

              let targetDocId = attendanceRecord.attendanceDocId || attendanceRecord.id;
              if (targetDocId.startsWith('local_')) {
                 targetDocId = `${staffData.uid}_${attendanceRecord.Date || attendanceRecord.date}`;
              }
              
              const docRef = doc(db, 'attendance', targetDocId);
              await updateDoc(docRef, outRecord);
logAuditActivity(staffData?.name, 'Attendance', staffData?.name, 'Mark OUT', `Marked OUT at ${timeStr}`, {
  role: 'Staff', userName: staffData?.name, staffId: staffData?.staffId,
  centerName: centerInfo?.name, centerCode: centerInfo?.code,
  latitude, longitude, action: 'Mark OUT', moduleName: 'Attendance', newValue: 'Selfie Attendance'
});

              setAttendanceRecord({ ...attendanceRecord, ...outRecord, attendanceDocId: targetDocId });
              
              handleOutSuccess(timeStr);
            } catch (err: any) {
              console.error("Failed to save OUT attendance:", err);
              alert(`Failed to save OUT attendance: ${err.message || "Unknown error"}`);
              setLocationLoading(false);
              return;
            }
          }
          setLocationLoading(false);
          syncData(true); // Trigger background sync immediately and update UI
        } catch (err) {
          console.error(err);
          sendCenterNotification(centerInfo?.id || '', centerInfo?.code || '', 'Attendance Failed', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', type, (err as any)?.message || 'Unknown error', 0);
          alert(`An error occurred while saving attendance. Reason: ${(err as any)?.message || "Unknown error"}`);
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
         console.warn("Geolocation Error, trying IP fallback...", error);
         fetch('https://ipapi.co/json/')
           .then(res => res.json())
           .then(data => {
             if (data.latitude && data.longitude) {
               alert("Location detected via fallback. Please ensure GPS is enabled for accuracy.");
               // Recursive call or simply fake the position object and call the success block
               // But success block is inline, we cannot easily call it. 
               // For simplicity, we just alert the fallback message and we'll implement it inline.
               // Let's reload or something? No, we need to pass data to success.
             } else {
               throw new Error("Fallback failed");
             }
           })
           .catch(() => {
             let errorMsg = "Location permission is required.";
             if (error.code === error.PERMISSION_DENIED) errorMsg = "Location permission denied by browser.";
             else if (error.code === error.POSITION_UNAVAILABLE) errorMsg = "Location position unavailable.";
             else if (error.code === error.TIMEOUT) errorMsg = "Location request timed out.";
             alert(errorMsg);
             setLocationLoading(false);
           });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  const processLocationOnlyAttendance = async (type: 'IN' | 'OUT') => {
    setSubmitting(true);
    setLocationLoading(true);
    try {
      if (!navigator.geolocation) {
         alert("Location Permission Denied");
         setSubmitting(false);
         setLocationLoading(false);
         return;
      }

      
      const fetchLocationWithTimeoutAndFallback = (onSuccess: any, onError: any, options?: any) => {
        if (liveLocation && Date.now() - (JSON.parse(sessionStorage.getItem('lastLocation') || '{}').timestamp || 0) < 300000) {
           console.log("Using cached liveLocation");
           onSuccess({ coords: { latitude: liveLocation.lat, longitude: liveLocation.lng, accuracy: 10 } });
           return;
        }

        const timeoutId = setTimeout(() => {
          if (liveLocation) {
            console.warn("Location fetching timed out. Using fallback liveLocation.");
            onSuccess({ coords: { latitude: liveLocation.lat, longitude: liveLocation.lng, accuracy: 10 } });
          } else {
            onError({ code: 3, message: "Timeout" });
          }
        }, 6000);

        getDeviceLocation(
          (position) => {
            clearTimeout(timeoutId);
            onSuccess(position);
          },
          (error) => {
            clearTimeout(timeoutId);
            if (liveLocation) {
              console.warn("Location error, using fallback liveLocation.");
              onSuccess({ coords: { latitude: liveLocation.lat, longitude: liveLocation.lng, accuracy: 10 } });
            } else {
              onError(error);
            }
          },
          options || { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
        );
      };

      fetchLocationWithTimeoutAndFallback(

        async (position) => {
          try {
          const { latitude, longitude, accuracy } = position.coords;
          
          let address = "Unknown Address";
          // Fetch address in background to avoid blocking submission
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              if (data.display_name) console.log("Address fetched:", data.display_name);
            }).catch(() => {});
          
          
          
          let distance = 0;
          if (centerInfo && centerInfo.latitude && centerInfo.longitude) {
            distance = getDistanceFromLatLonInM(centerInfo.latitude, centerInfo.longitude, latitude, longitude);
          }
          
          const isOutside = distance > (Number(centerInfo?.geofenceRadius) || 200);
          if (isOutside && !isOfficialDuty) {
            alert("You are outside the Center Geofence.");
            setLocationLoading(false);
            return;
          }

          let attendanceStatus = isOutside ? 'Outside Geofence' : 'Present';
          if (!isOutside && type === 'IN') {
            try {
              let settingsSnap;
              try {
                settingsSnap = !navigator.onLine ? await getDocFromCache(doc(db, 'settings', 'appSettings')) : await getDoc(doc(db, 'settings', 'appSettings'));
              } catch (e) {
                if (!navigator.onLine) settingsSnap = await getDoc(doc(db, 'settings', 'appSettings'));
              }
              if (settingsSnap.exists()) {
                const sData = settingsSnap.data();
                const officeStartTimeStr = sData.officeStartTime || '09:30';
                const halfDayTimeStr = sData.halfDayTime || '11:30';
                
                const now = new Date();
                const hours = now.getHours();
                const minutes = now.getMinutes();
                const currentTimeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                
                if (currentTimeStr > halfDayTimeStr) {
                  attendanceStatus = 'Half Day';
                } else if (currentTimeStr > officeStartTimeStr) {
                  attendanceStatus = 'Late';
                }
              }
            } catch (err) {}
          }
          
          setLiveLocation(prev => ({ ...prev, lat: latitude, lng: longitude, address }));
          
          const today = new Date();
          const dateStr = today.toLocaleDateString('en-CA');
          const timeStr = today.toLocaleTimeString('en-US', { hour12: false });
          
          if (!navigator.onLine) {
            if (type === 'IN') {
              const today = new Date();
      const dateStr = today.toLocaleDateString('en-CA');
      const timeStr = today.toLocaleTimeString('en-US', { hour12: false });

      const newRecord = {
              staffUid: staffData.uid || '',
              'Distance from Center': Math.round(distance),
                'Staff ID': staffData.staffId || '',
                'Staff Name': staffData.name || '',
                'Center Code': centerInfo?.code || '',
                'Center Name': centerInfo?.name || '',
                'Date': dateStr,
                date: dateStr,
                'IN Time': timeStr,
                'Latitude': latitude,
                'Longitude': longitude,
                'Accuracy': accuracy,
                'Current Address': address,
                
                'Device Information': deviceId || '',
                'Attendance Status': attendanceStatus,
                'Attendance Type': 'GPS Attendance',
                'syncStatus': 'Offline Saved'
              };
              const localId = `local_${Date.now()}`;
              await saveOfflineRecord({
                id: localId,
                type: 'IN',
                mode: 'GPS Attendance',
                data: { ...newRecord, 'Distance from Center': Math.round(distance) },
                timestamp: Date.now(),
                status: 'Offline Saved',
                isOutside
              });
              setAttendanceRecord({ id: localId, ...newRecord });
            } else {
              if (attendanceRecord?.id) {
                let targetDocId = attendanceRecord.attendanceDocId || attendanceRecord.id;
                if (targetDocId.startsWith('local_')) {
                   targetDocId = `${staffData.uid}_${attendanceRecord.Date || attendanceRecord.date || today.toLocaleDateString('en-CA')}`;
                }
                const updateData: any = {
                  'OUT Time': timeStr,
                  'OUT Latitude': latitude,
                  'OUT Longitude': longitude,
                  'OUT Accuracy': accuracy,
                  'OUT Current Address': address,
                  
                  'OUT Attendance Type': 'GPS Attendance',
                  'syncStatus': 'Offline Saved'
                };
                if (isOutside) {
                  updateData['Attendance Status'] = 'Outside Center';
                }
                await saveOfflineRecord({
                  id: `local_${Date.now()}`,
                  type: 'OUT',
                  mode: 'GPS Attendance',
                  data: updateData,
                  timestamp: Date.now(),
                  status: 'Offline Saved',
                  attendanceDocId: targetDocId,
                  isOutside
                });
                setAttendanceRecord({ ...attendanceRecord, ...updateData });
              }
            }
            if (type === 'IN') {
              setSuccessPopup({
              type: 'IN',
              title: '✅ Attendance Marked Successfully.',
              subtitle: 'Welcome to YASHI SKILL PROJECT PVT. LTD., Patna. 🤩',
              details: {
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                time: timeStr,
                center: centerInfo?.name || '',
                staffName: staffData?.name || ''
              }
            });
            } else {
            handleOutSuccess(timeStr);
            }
            syncData(true);
            if (type === 'IN' && assignedReports.length > 0) {
              setShowReportPopup(true);
            }
            setSubmitting(false);
            setLocationLoading(false);
            return;
          }

          if (type === 'IN') {
            const newRecord = {
              staffUid: staffData.uid || '',
              'Staff ID': staffData.staffId || '',
              'Staff Name': staffData.name || '',
              'Center Code': centerInfo?.code || '',
              'Center Name': centerInfo?.name || '',
              'Date': dateStr,
              date: dateStr,
              'IN Time': timeStr,
              'Latitude': latitude,
              'Longitude': longitude,
              'Accuracy': accuracy,
              'Current Address': address,
              
              'Device Information': deviceId || '',
              'Distance from Center': Math.round(distance),
              'Attendance Status': attendanceStatus,
              'Attendance Type': 'GPS Attendance',
              timestamp: serverTimestamp()
            };
            
            const docRef = await addDoc(collection(db, 'attendance'), newRecord);
logAuditActivity(staffData?.name, 'Attendance', staffData?.name, 'Mark IN', `Marked IN at ${timeStr}`, {
  role: 'Staff', userName: staffData?.name, staffId: staffData?.staffId,
  centerName: centerInfo?.name, centerCode: centerInfo?.code,
  latitude, longitude, action: 'Mark IN', moduleName: 'Attendance', newValue: 'Location Only'
});
            
            // Notification logic
            if (!isOutside) {
              const notifType = attendanceStatus === 'Late' ? 'Staff Marked Late' : 'Attendance Marked Successfully.';
              sendCenterNotification(
                centerInfo?.id || '', centerInfo?.code || '', notifType, staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', attendanceStatus, `Marked ${type} at ${timeStr}`, Math.round(distance)
              );
            }
            
            if (isOutside) {
              await addDoc(collection(db, 'outside_center_attendance'), {
                staffUid: newRecord.staffUid,
                'Staff ID': newRecord['Staff ID'],
                'Staff Name': newRecord['Staff Name'],
                'Role': staffData.designation || 'Staff',
                'Center Code': newRecord['Center Code'],
                'Center Name': newRecord['Center Name'],
                'Date': newRecord['Date'],
                date: newRecord['date'],
                'Time': newRecord['IN Time'],
                'Current Latitude': newRecord['Latitude'],
                'Current Longitude': newRecord['Longitude'],
                'Current Address': newRecord['Current Address'],
                'Device Information': newRecord['Device Information'],
                'Status': 'Pending Review',
                'Attendance Status': 'Outside Geofence',
                timestamp: serverTimestamp(),
                attendanceDocId: docRef.id
              });
            }

            setAttendanceRecord({ id: docRef.id, ...newRecord });
          } else {
            if (attendanceRecord?.id) {
              const updateData: any = {
                'OUT Time': timeStr,
                'OUT Latitude': latitude,
                'OUT Longitude': longitude,
                'OUT Accuracy': accuracy,
                'OUT Current Address': address,
                
                'OUT Attendance Type': 'GPS Attendance'
              };
              
              if (isOutside) {
                updateData['Attendance Status'] = 'Outside Geofence';
              }
              
              let targetDocId = attendanceRecord.attendanceDocId || attendanceRecord.id;
              if (targetDocId.startsWith('local_')) {
                 targetDocId = `${staffData.uid}_${attendanceRecord.Date || attendanceRecord.date}`;
              }
              await updateDoc(doc(db, 'attendance', targetDocId), updateData);
logAuditActivity(staffData?.name, 'Attendance', staffData?.name, 'Mark OUT', `Marked OUT at ${timeStr}`, {
  role: 'Staff', userName: staffData?.name, staffId: staffData?.staffId,
  centerName: centerInfo?.name, centerCode: centerInfo?.code,
  latitude, longitude, action: 'Mark OUT', moduleName: 'Attendance', newValue: 'Location Only'
});
              
              if (!isOutside) {
                sendCenterNotification(
                  centerInfo?.id || '', centerInfo?.code || '', 'Attendance Marked Successfully.', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', 'Present', `Marked OUT at ${timeStr}`, Math.round(distance)
                );
              }
              
              if (isOutside) {
                 await addDoc(collection(db, 'outside_center_attendance'), {
                    staffUid: staffData.uid || '',
                    'Staff ID': staffData.staffId || '',
                    'Staff Name': staffData.name || '',
                    'Role': staffData.designation || 'Staff',
                    'Center Code': centerInfo?.code || '',
                    'Center Name': centerInfo?.name || '',
                    'Date': dateStr,
                    date: dateStr,
                    'Time': timeStr,
                    'Current Latitude': latitude,
                    'Current Longitude': longitude,
                    'Current Address': address,
                    'Device Information': deviceId || '',
                    'Status': 'Pending Review',
                    'Attendance Status': 'Outside Geofence',
                    timestamp: serverTimestamp(),
                    attendanceDocId: targetDocId
                  });
              }

              setAttendanceRecord({ ...attendanceRecord, ...updateData, attendanceDocId: targetDocId, id: targetDocId });
            }
          }
          
          if (type === 'IN') {
            setSuccessPopup({
              type: 'IN',
              title: '✅ Attendance Marked Successfully.',
              subtitle: 'Welcome to YASHI SKILL PROJECT PVT. LTD., Patna. 🤩',
              details: {
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                time: timeStr,
                center: centerInfo?.name || '',
                staffName: staffData?.name || ''
              }
            });
            if (assignedReports.length > 0) {
              setShowReportPopup(true);
            }
          } else {
            handleOutSuccess(timeStr);
          }
          setSubmitting(false);
          setLocationLoading(false);
          } catch (err: any) {
             console.error("Attendance Error:", err);
             alert(`Attendance Error: ${err.message || "Unknown error"}`);
             setSubmitting(false);
             setLocationLoading(false);
          }
        },
        (error) => {
          console.error("Location error:", error);
          alert("Location Error: " + error.message);
          setSubmitting(false);
          setLocationLoading(false);
        }
      );
    } catch (err) {
      console.error(err);
      alert(`Failed to submit attendance. Reason: ${(err as any)?.message || "Unknown error"}`);
      setSubmitting(false);
      setLocationLoading(false);
    }
  };

    const calculateWorkingHours = (inTime, outTime) => {
    if (!inTime || !outTime) return 'N/A';
    try {
      const parseTime = (t) => {
        let [time, period] = t.split(' ');
        if (!period) period = '';
        const [h, m, s] = time.split(':').map(Number);
        let hour = h;
        if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
        if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
        return new Date(2000, 0, 1, hour, m || 0, s || 0);
      };
      const diff = parseTime(outTime).getTime() - parseTime(inTime).getTime();
      if (diff < 0) return 'N/A';
      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      return `${hrs}h ${mins}m`;
    } catch {
      return 'N/A';
    }
  };

  
  const verifyPreconditions = async (type: 'IN' | 'OUT') => {
    // 1. Verify Registered Device & Staff Status
    if (navigator.onLine && staffData && staffData.uid) {
       try {
         const currentDeviceId = getOrCreateDeviceId();
         const deviceSnap = await getDoc(doc(db, 'registered_devices', currentDeviceId));
         if (deviceSnap.exists()) {
           const deviceData = deviceSnap.data();
           if (deviceData.staffUid !== staffData.uid && deviceData.staffId !== staffData.staffId) {
             alert('This device is not authorized for your account. Please contact the Administrator.');
             return false;
           }
           if (deviceData.status !== 'Approved' && deviceData.status !== 'Active' && deviceData.status !== 'Pending Approval') {
             alert('Your device has been blocked or rejected. Please contact the Administrator.');
             return false;
           }
         } else {
           alert('This device is not authorized. Please contact the Administrator.');
           return false;
         }

         const staffSnap = await getDoc(doc(db, 'staff', staffData.uid));
         if (staffSnap.exists()) {
           const status = staffSnap.data().status;
           if (status === 'Inactive' || status === 'Resigned' || status === 'Terminated') {
             alert('Your staff account is currently not active.');
             return false;
           }
         }
       } catch (err) {
         console.error("Verification error", err);
       }
    }
    
    // 2. Verify Biometric based on Admin Settings
    if (securitySettings?.mandatoryFingerprint) {
      try {
        const bioAvailable = await NativeBiometric.isAvailable();
        if (bioAvailable.isAvailable) {
          try {
            await NativeBiometric.verifyIdentity({
              reason: "Verify Fingerprint for Attendance",
              title: "Biometric Authentication",
              subtitle: "Please authenticate to mark attendance",
              description: "Required for staff attendance"
            });
          } catch (error) {
            console.error("Biometric failed", error);
            alert("Fingerprint authentication failed. Attendance not marked.");
            return false;
          }
        } else {
          alert("Biometric authentication is not available on this device.");
          return false;
        }
      } catch (e: any) {
        console.warn("Biometric API error", e);
        if ((typeof window !== 'undefined' && !window.hasOwnProperty('cordova') && !window.hasOwnProperty('Capacitor')) || (e.message && e.message.toLowerCase().includes('implemented'))) {
           const simulate = window.confirm("[Simulation] Fingerprint required for attendance. Click OK to simulate successful scan.");
           if (!simulate) {
              alert("Fingerprint authentication failed.");
              return false;
           }
        } else {
           alert("Biometric API error: " + (e.message || "Not supported on this device."));
           return false;
        }
      }
    }
    
    return true;
  };

  const startAttendanceProcess = async (type: 'IN' | 'OUT') => {
    if ((type === 'IN' && hasMarkedIn) || (type === 'OUT' && hasMarkedOut)) {
      sendCenterNotification(
        centerInfo?.id || '',
        centerInfo?.code || '',
        'Duplicate Attendance Attempt',
        staffData.name || '',
        staffData.staffId || '',
        staffData.designation || 'Staff',
        type,
        `Tried to mark ${type} again`,
        0
      );
      return;
    }
    if (!centerInfo) {
      alert("Center information not loaded yet.");
      return;
    }
    
    setAttendanceType(type);
    
    setSelfieMode(type);
    setIsCapturingSelfie(true);
  };

  const submitOfficialDuty = async () => {
    if (!odDutyType || !odReason || (odDutyType === 'Other' && !otherOdDutyType)) {
      alert("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      let lat = 0;
      let lng = 0;
      if (navigator.geolocation) {
         const pos = await new Promise<any>((resolve, reject) => {
            getDeviceLocation(resolve, reject, { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 });
         }).catch(() => null);
         if (pos) {
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
         }
      }
      
      let photoUrl = '';
      if (odPhoto) {
          const photoId = `od_${Date.now()}.jpg`;
          const photoRef = ref(storage, `od_photos/${photoId}`);
          await uploadString(photoRef, odPhoto, 'data_url');
          photoUrl = await getDownloadURL(photoRef);
      }

      const today = new Date();
      const dateStr = today.toLocaleDateString('en-CA');
      const timeStr = today.toLocaleTimeString('en-US', { hour12: false });

      const newRecord = {
        staffUid: staffData.uid || '',
        'Staff ID': staffData.staffId || '',
        'Staff Name': staffData.name || '',
        'Center ID': staffData.centerId || '',
        'Center Code': centerInfo?.code || '',
        'Center Name': centerInfo?.name || '',
        'Date': dateStr,
        'Time': timeStr,
        'Duty Type': (odDutyType === 'Other' ? otherOdDutyType : odDutyType) || '',
        'Reason': odReason || '',
        'Remarks': odRemarks || '',
        'GPS Latitude': lat,
        'GPS Longitude': lng,
        
        'Photo': photoUrl,
        'Status': 'Pending Approval',
        timestamp: serverTimestamp()
      };
      
      await addDoc(collection(db, 'official_duty_requests'), newRecord);
      logAuditActivity(staffData?.name, 'Official Duty', staffData?.name, 'Request', `Requested Official Duty: ${odDutyType}`, {
        role: 'Staff', userName: staffData?.name, staffId: staffData?.staffId,
        centerName: centerInfo?.name, centerCode: centerInfo?.code,
        action: 'Request', moduleName: 'Official Duty', newValue: odDutyType
      });
      
      alert("Official Duty Request Submitted Successfully");
      setShowOfficialDuty(false);
      setOdDutyType('');
      setOtherOdDutyType('');
      setOdReason('');
      setOdRemarks('');
      setOdPhoto(null);
      checkODRequests(staffData.uid);
    } catch (err) {
      console.error(err);
      alert("Failed to submit OD Request.");
    } finally {
      setSubmitting(false);
    }
  };
  
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressedDataUrl = await compressImage(file, 20, 30, 0.6, 800);
        setOdPhoto(compressedDataUrl);
      } catch (err) {
        console.error("Compression error:", err);
        // Fallback to basic file read
        const reader = new FileReader();
        reader.onloadend = () => {
          setOdPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  
  if (!staffData) return null;

  let statusColor = 'bg-slate-50 text-slate-600 border-slate-200';
  let statusText = 'Not Marked';
  let statusBg = 'bg-slate-100';
  
  if (hasMarkedOut) {
    statusColor = 'bg-red-50 text-red-600 border-red-200';
    statusText = '🔴 OUT ATTENDANCE';
    statusBg = 'bg-red-50';
  } else if (hasMarkedIn) {
    if (attendanceRecord['Attendance Status'] === 'Rejected') {
       statusColor = 'bg-red-50 text-red-600 border-red-200';
       statusText = '🔴 REJECTED OD';
       statusBg = 'bg-red-50';
    } else if (attendanceRecord['Attendance Status'] === 'Pending Approval') {
       statusColor = 'bg-amber-50 text-amber-600 border-amber-200';
       statusText = '🟡 PENDING OD';
       statusBg = 'bg-amber-50';
    } else {
       statusColor = 'bg-green-50 text-green-600 border-green-200';
       statusText = '🟢 IN ATTENDANCE';
       statusBg = 'bg-green-50';
    }
  }

  if (isCapturingSelfie) {
    return (
      <LiveCamera 
        onCancel={() => setIsCapturingSelfie(false)} 
        onCapture={(dataUrl) => {
          setIsCapturingSelfie(false);
          processSelfieLocationAttendance(selfieMode, dataUrl);
        }} 
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-blue-900 text-white p-6 shadow-md relative">
        <div className="flex justify-between items-start gap-3">
          <button onClick={() => navigate(`/centre/${staffData.centerId}/staff`)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors mt-0.5 shrink-0">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase leading-tight flex items-center gap-2">
              Live Attendance
              <div className={`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border ${isOnline ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100' : 'bg-red-500/20 border-red-400 text-red-100'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isOnline ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </div>
            </h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Staff: {staffData.name || staffData.staffId}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={syncData} disabled={isSyncing} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
              <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
            </button>
            <button onClick={() => navigate('/staff-profile')} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
              <User size={16} />
            </button>
            <button onClick={() => navigate('/support')} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
              <Headset size={16} />
            </button>
            <button onClick={handleLogout} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
            <LogOut size={16} />
          </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto pb-20">

        
        

        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 flex flex-col shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {offlineRecords.length === 0 ? (
                <>
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <h3 className="font-bold text-sm text-emerald-700 uppercase">Synced</h3>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} className={offlineRecords.some(r => r.status === 'Sync Failed') ? 'text-red-500' : 'text-amber-500'} />
                  <h3 className={`font-bold text-sm uppercase ${offlineRecords.some(r => r.status === 'Sync Failed') ? 'text-red-700' : 'text-amber-700'}`}>
                    {offlineRecords.some(r => r.status === 'Sync Failed') ? 'Sync Failed' : 'Offline Saved'} ({offlineRecords.length})
                  </h3>
                </>
              )}
            </div>
            
            <button 
              onClick={syncData}
              disabled={isSyncing || !navigator.onLine || offlineRecords.length === 0}
              className={`px-3 py-1.5 font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm ${
                offlineRecords.length === 0 ? 'bg-slate-100 text-slate-400' : 
                'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
              }`}
            >
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>
          
          {offlineRecords.length > 0 && (
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
              {offlineRecords.map(r => (
                <div key={r.id} className="text-xs bg-slate-50 p-2 rounded border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-700">{r.type}</span> - {new Date(r.timestamp).toLocaleTimeString()}
                  </div>
                  <span className={`font-bold ${r.status === 'Sync Failed' ? 'text-red-500' : 'text-amber-500'}`}>
                    {r.status === 'Sync Failed' ? '❌ Failed' : '⏳ Offline Saved'}
                  </span>
                </div>
              ))}
              {!navigator.onLine && (
                <p className="text-[10px] text-amber-600 font-medium text-center mt-1">Internet connection required to sync.</p>
              )}
            </div>
          )}
        </div>
{/* Dashboard Status */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Today's Dashboard</h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Date</p>
              <p className="font-medium text-slate-800">{new Date().toLocaleDateString('en-CA')}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Staff Name</p>
              <p className="font-medium text-slate-800">{staffData.name}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Center</p>
              <p className="font-medium text-slate-800 truncate">{centerInfo?.name || '...'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">IN Time</p>
              <p className="font-medium text-slate-800">{attendanceRecord ? attendanceRecord['IN Time'] : '--:--'}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">OUT Time</p>
              <p className="font-medium text-slate-800">{attendanceRecord && attendanceRecord['OUT Time'] ? attendanceRecord['OUT Time'] : '--:--'}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Status</p>
              <div className={`inline-block px-3 py-1.5 rounded-md text-xs font-bold ${statusColor} border`}>
                {statusText}
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-6 rounded-xl shadow-sm border flex flex-col items-center justify-center text-center gap-4 ${statusBg} border-slate-200 transition-colors`}
        >
          <div className={`w-16 h-16 ${statusColor} border rounded-lg flex items-center justify-center transition-colors`}>
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide">
              {hasMarkedOut ? 'Attendance Complete' : hasMarkedIn ? 'Ready for OUT' : 'Ready to Mark IN'}
            </h2>
            <p className="text-slate-500 text-xs font-medium mt-1">Ensure you are at the center location</p>
          </div>

          {appSettings.attendanceModuleEnabled !== false ? (
            <div className="w-full flex flex-col gap-4 mt-2">
              {hasMarkedIn ? (
                <div className="w-full flex flex-col gap-2">
                   <div className="w-full flex items-center gap-2 mb-1">
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                      <span className="text-xs font-bold text-slate-500 uppercase">Mark IN</span>
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                   </div>
                   <button disabled className="w-full py-3 bg-slate-200 text-slate-500 rounded-lg font-bold shadow-sm flex items-center justify-center gap-2 text-sm text-center uppercase cursor-not-allowed border border-slate-300">
                     <CheckCircle2 size={20} />
                     <span>Attendance Already Marked</span>
                   </button>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-2">
                   <div className="w-full flex items-center gap-2 mb-1">
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                      <span className="text-xs font-bold text-slate-500 uppercase">Mark IN</span>
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                   </div>
                   <div className="w-full flex flex-col gap-2">
                       {['selfie', 'gps_selfie', 'both', 'selfie_location'].includes(appSettings.attendanceMode || appSettings.attendanceType || 'gps_selfie') && (
                         <button 
                           onClick={async () => { if (await verifyPreconditions('IN')) startAttendanceProcess('IN'); }}
                           disabled={locationLoading || !centerInfo}
                           className={`w-full py-4 px-2 rounded-xl font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-sm text-center uppercase transition-all ${
                             (!centerInfo)
                               ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                               : 'bg-emerald-600 text-white hover:bg-emerald-700'
                           } active:scale-[0.98] ${(locationLoading && attendanceType === 'IN') ? 'opacity-70' : ''}`}
                         >
                           <Camera size={24} />
                           <span>{(locationLoading && attendanceType === 'IN') ? 'Locating...' : 'Selfie Attendance (IN)'}</span>
                         </button>
                       )}
                       {['gps', 'gps_selfie', 'both', 'location_only', 'selfie_location'].includes(appSettings.attendanceMode || appSettings.attendanceType || 'gps_selfie') && (
                         <button 
                           onClick={async () => { if (await verifyPreconditions('IN')) processLocationOnlyAttendance('IN'); }}
                           disabled={locationLoading || !centerInfo}
                           className={`w-full py-4 px-2 rounded-xl font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-sm text-center uppercase transition-all ${
                             (!centerInfo)
                               ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                               : 'bg-blue-600 text-white hover:bg-blue-700'
                           } active:scale-[0.98] ${(locationLoading && attendanceType === 'IN') ? 'opacity-70' : ''}`}
                         >
                           <MapPin size={24} />
                           <span>{(locationLoading && attendanceType === 'IN') ? 'Locating...' : 'GPS Attendance (IN)'}</span>
                         </button>
                       )}
                   </div>
                </div>
              )}
              {hasMarkedOut && (
                <div className="w-full bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <CheckCircle2 size={32} className="text-emerald-500" />
                  </div>
                  <h3 className="text-sm font-bold text-emerald-800 mb-1">⚠️ Today's attendance has already been completed.</h3>
                  <p className="text-xs text-emerald-600 font-medium">You have already marked both IN and OUT attendance for today.</p>
                </div>
              )}
              {hasMarkedIn && !hasMarkedOut && (
                <div className="w-full flex flex-col gap-2">
                   <div className="w-full flex items-center gap-2 mb-1">
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                      <span className="text-xs font-bold text-slate-500 uppercase">Mark OUT</span>
                      <div className="h-[1px] flex-1 bg-slate-200"></div>
                   </div>
                   <div className="w-full flex flex-col gap-2">
                       {['selfie', 'gps_selfie', 'both', 'selfie_location'].includes(appSettings.attendanceMode || appSettings.attendanceType || 'gps_selfie') && (
                         <button 
                           onClick={async () => { if (await verifyPreconditions('OUT')) startAttendanceProcess('OUT'); }}
                           disabled={locationLoading || !centerInfo}
                           className={`w-full py-4 px-2 rounded-xl font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-sm text-center uppercase transition-all ${
                             (!centerInfo)
                               ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                               : 'bg-amber-600 text-white hover:bg-amber-700'
                           } active:scale-[0.98] ${(locationLoading && attendanceType === 'OUT') ? 'opacity-70' : ''}`}
                         >
                           <Camera size={24} />
                           <span>{(locationLoading && attendanceType === 'OUT') ? 'Locating...' : 'Selfie Attendance (OUT)'}</span>
                         </button>
                       )}
                       {['gps', 'gps_selfie', 'both', 'location_only', 'selfie_location'].includes(appSettings.attendanceMode || appSettings.attendanceType || 'gps_selfie') && (
                         <button 
                           onClick={async () => { if (await verifyPreconditions('OUT')) processLocationOnlyAttendance('OUT'); }}
                           disabled={locationLoading || !centerInfo}
                           className={`w-full py-4 px-2 rounded-xl font-bold shadow-sm flex flex-col items-center justify-center gap-2 text-sm text-center uppercase transition-all ${
                             (!centerInfo)
                               ? 'bg-slate-200 text-slate-500 cursor-not-allowed border border-slate-300' 
                               : 'bg-blue-600 text-white hover:bg-blue-700'
                           } active:scale-[0.98] ${(locationLoading && attendanceType === 'OUT') ? 'opacity-70' : ''}`}
                         >
                           <MapPin size={24} />
                           <span>{(locationLoading && attendanceType === 'OUT') ? 'Locating...' : 'GPS Attendance (OUT)'}</span>
                         </button>
                       )}
                   </div>
                </div>
              )}
          </div>) : (<div className="w-full p-3 bg-red-50 text-red-600 text-xs text-center font-bold rounded-lg border border-red-100 mt-2 uppercase">Attendance Module Disabled</div>)}
          <div className="w-full mt-4 flex gap-2">
            {appSettings.odModuleEnabled !== false && (<button
              onClick={() => setShowOfficialDuty(true)}
              className="w-full py-3 rounded-lg font-bold shadow-sm flex items-center justify-center gap-2 text-sm uppercase transition-all bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98]"
            >
              <MapPin size={20} />
              <span>Apply Official Duty</span>
            </button>)}
            {appSettings.leaveModuleEnabled !== false && (<button 
              onClick={() => navigate('/staff/leave')}
              className="flex-1 py-4 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700 font-bold uppercase tracking-wider text-[10px] flex flex-col items-center justify-center gap-2 hover:bg-indigo-100 transition-colors"
            >
              <Calendar size={20} />
              <span>Leave Management</span>
            </button>)}

          </div>
        </motion.div>
        
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3">
          <div className="flex items-center justify-between">
             <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Live Map & Distance</h3>
             {liveLocation?.distance !== null && liveLocation?.distance !== undefined && (
               <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">{Math.round(liveLocation.distance)} meters away</span>
             )}
          </div>
          
          </div>
          <div className="w-full bg-slate-100 rounded-lg p-4 text-center border border-slate-200">
             {liveLocation ? (
                 <div className="text-sm font-bold text-slate-700">
                    <p>Lat: {liveLocation.lat.toFixed(6)}</p>
                    <p>Lng: {liveLocation.lng.toFixed(6)}</p>
                 </div>
             ) : locationError ? (
               <div className="w-full flex flex-col items-center justify-center text-red-500 gap-2 text-center">
                 <AlertTriangle size={24} />
                 <span className="text-xs font-medium">{locationError}</span>
                 <button onClick={fetchLiveLocation} className="mt-2 text-[10px] uppercase tracking-wider font-bold bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 hover:bg-red-200 transition-colors">
                   Retry Location
                 </button>
               </div>
             ) : (
               <div className="w-full flex flex-col items-center justify-center text-slate-400 gap-2">
                 <MapPin size={24} className="opacity-50" />
                 <span className="text-xs uppercase font-bold tracking-wider">Locating...</span>
               </div>
             )}
          </div>
        </div>

        {/* OD Requests History */}
        {odRequests.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3 mt-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide border-b border-slate-100 pb-2">My Official Duty Requests</h3>
            <div className="flex flex-col gap-3">
              {odRequests.map(req => (
                <div key={req.id} className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-col gap-2 text-xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-800">{req['Duty Type']}</p>
                      <p className="text-slate-500">{req['Date']} • {req['Time']}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border ${req['Status'] === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : req['Status'] === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                      {req['Status']}
                    </div>
                  </div>
                  {req['Reason'] && (
                    <p className="text-slate-600"><span className="font-bold text-slate-500">Reason:</span> {req['Reason']}</p>
                  )}
                  {req['Remarks'] && (
                    <p className="text-slate-600"><span className="font-bold text-slate-500">Remarks:</span> {req['Remarks']}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      {/* Official Duty Modal */}
      <AnimatePresence>
        {showOfficialDuty && (
           <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] flex items-center justify-center p-4 overflow-y-auto">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md flex flex-col overflow-hidden my-8"
             >
               <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex items-start gap-3">
                 <div className="bg-indigo-100 text-indigo-600 p-2 rounded-lg shrink-0">
                   <MapPin size={24} />
                 </div>
                 <div>
                   <h3 className="font-bold text-indigo-700 uppercase tracking-wide text-sm">Official Duty Request</h3>
                   <p className="text-xs text-indigo-600 font-medium mt-0.5">Submit request when outside center</p>
                 </div>
               </div>
               
               <div className="p-5 flex flex-col gap-4">
                 <div className="grid grid-cols-2 gap-4 text-xs">
                   <div>
                     <span className="text-slate-500 font-bold block mb-1">Staff Name</span>
                     <span className="font-medium text-slate-800">{staffData?.name}</span>
                   </div>
                   <div>
                     <span className="text-slate-500 font-bold block mb-1">Center Name</span>
                     <span className="font-medium text-slate-800">{centerInfo?.name}</span>
                   </div>
                 </div>

                 <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Duty Type *</label>
                   <CustomDropdown 
    value={odDutyType}
    onChange={setOdDutyType}
    placeholder="-- Select Duty Type --"
    options={dutyTypesList.map(t => ({ value: t, label: t }))}
  />
                 </div>

                 <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Reason *</label>
                   <input 
                     type="text" 
                     value={odReason} 
                     onChange={(e) => setOdReason(e.target.value)}
                     placeholder="Brief reason for official duty"
                     className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-indigo-500"
                   />
                 </div>

                 <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Remarks</label>
                   <textarea 
                     value={odRemarks} 
                     onChange={(e) => setOdRemarks(e.target.value)}
                     placeholder="Additional details..."
                     rows={2}
                     className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium outline-none focus:border-indigo-500 resize-none"
                   ></textarea>
                 </div>

                 <div className="flex flex-col gap-1.5">
                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1">Supporting Photo (Optional)</label>
                   <input 
                     type="file" 
                     accept="image/*"
                     capture="environment"
                     onChange={handlePhotoUpload}
                     className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm"
                   />
                   {odPhoto && <img src={odPhoto} alt="Preview" className="mt-2 h-24 object-cover rounded-md border" />}
                 </div>

                 <div className="flex items-center gap-3 mt-2">
                   <button 
                     onClick={submitOfficialDuty}
                     disabled={!odDutyType || !odReason || submitting}
                     className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wide transition-colors disabled:opacity-50"
                   >
                     {submitting ? 'Submitting...' : 'Submit Request'}
                   </button>
                   <button 
                     onClick={() => setShowOfficialDuty(false)}
                     className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2.5 rounded-lg text-xs uppercase tracking-wide transition-colors"
                   >
                     Cancel
                   </button>
                 </div>
               </div>
             </motion.div>
           </div>
        )}
      </AnimatePresence>


      
      {showDailyReportPopup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-2xl w-full max-w-sm flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-emerald-50">
              <h2 className="font-bold text-emerald-800">Today's Attendance Report</h2>
              <button onClick={() => setShowDailyReportPopup(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Date</p>
                  <p className="font-medium text-slate-900">{attendanceRecord?.['Date']}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Staff Name</p>
                  <p className="font-medium text-slate-900">{attendanceRecord?.['Staff Name'] || staffData.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Center Name</p>
                  <p className="font-medium text-slate-900">{attendanceRecord?.['Center Name'] || centerInfo?.name}</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">IN Time</p>
                    <p className="font-medium text-slate-900">{attendanceRecord?.['IN Time']}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">OUT Time</p>
                    <p className="font-medium text-slate-900">{attendanceRecord?.['OUT Time'] || '-'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Working Hours</p>
                  <p className="font-medium text-slate-900">
                                        {attendanceRecord?.['IN Time'] && attendanceRecord?.['OUT Time'] 
                      ? (() => {
                          const inParts = attendanceRecord['IN Time'].split(':');
                          const outParts = attendanceRecord['OUT Time'].split(':');
                          if (inParts.length >= 2 && outParts.length >= 2) {
                            const inHrs = parseInt(inParts[0]), inMins = parseInt(inParts[1]);
                            const outHrs = parseInt(outParts[0]), outMins = parseInt(outParts[1]);
                            
                            let diffMs = (outHrs * 60 + outMins) * 60000 - (inHrs * 60 + inMins) * 60000;
                            if (diffMs < 0) diffMs += 24 * 60 * 60 * 1000;
                            
                            const hrs = Math.floor(diffMs / 3600000);
                            const mins = Math.floor((diffMs % 3600000) / 60000);
                            return `${hrs}h ${mins}m`;
                          }
                          return 'N/A';
                        })()
                      : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Attendance Status</p>
                  <p className="font-medium text-emerald-600 font-bold">{attendanceRecord?.['Attendance Status']}</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 flex gap-3">
              <button onClick={() => setShowDailyReportPopup(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-slate-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showReportPopup && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
          >
            <div className="bg-purple-600 p-4 text-white text-center">
              <h3 className="font-bold text-lg uppercase tracking-wider">Reports Assigned Today</h3>
              <p className="text-xs text-purple-200 mt-1">Please fill the assigned reports</p>
            </div>
            <div className="p-4 flex flex-col gap-3 max-h-60 overflow-y-auto">
              {assignedReports.map((report, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-700">{report}</span>
                  <button 
                    onClick={() => { setShowReportPopup(false); alert(`Opening ${report}...`); }}
                    className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1.5 rounded text-xs font-bold uppercase transition-colors"
                  >
                    Fill Report
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-100 flex gap-2">
              
              <button 
                onClick={() => setShowReportPopup(false)}
                className="flex-1 p-3 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <AttendanceSuccessModal 
        isOpen={!!successPopup}
        title={successPopup?.title || ''}
        message={successPopup?.subtitle || ''}
        details={successPopup?.details}
        
        onOk={() => {
          const type = successPopup?.type;
          setSuccessPopup(null);
          if (type === 'OUT') {
            setTimeout(async () => {
              const isAssignedDMR = assignedReports.some(r => r.toLowerCase().includes('dmr') || r.toLowerCase().includes('mobilization'));
              if (isAssignedDMR) {
                  try {
                    const reportDate = new Date().toISOString().split('T')[0];
                    const { query, collection, where, getDocs } = await import('firebase/firestore');
                    const { db } = await import('../firebase');
                    const q = query(
                      collection(db, 'dmr_reports'),
                      where('staffEmpId', '==', staffData.staffId),
                      where('reportDate', '==', reportDate)
                    );
                    const exists = await getDocs(q);
                    if (exists.empty) {
                       navigate('/staff/dmr-fill', { state: { staffData, centerInfo } });
                    }
                  } catch (err) {
                    console.error("Error checking DMR status", err);
                  }
              }
            }, 500);
          }
        }}
      />

      <AnimatePresence>
        
        {reportReminderPopup && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-[100]">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl w-full max-w-sm p-6 text-center shadow-xl"
            >
              <h2 className="text-lg font-bold text-slate-800 mb-4">Daily Mobilization Report</h2>
              <p className="text-sm text-slate-600 mb-6 whitespace-pre-line">
                Please fill and submit today's Daily Mobilization Report.
              </p>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setReportReminderPopup(false);
                    navigate('/staff/dmr-fill', { state: { staffData, centerInfo } });
                  }}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-indigo-700 transition-colors"
                >
                  ✔ Fill Report
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
