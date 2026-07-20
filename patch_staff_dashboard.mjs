import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const processLocationOnlyCode = `
  const processLocationOnlyAttendance = async (type: 'IN' | 'OUT') => {
    setSubmitting(true);
    try {
      if (!navigator.geolocation) {
         alert("Location Permission Denied");
         setSubmitting(false);
         return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          
          let address = "Unknown Address";
          try {
            const res = await fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${latitude}&lon=\${longitude}\`);
            const data = await res.json();
            if (data.display_name) address = data.display_name;
          } catch (err) {}
          
          const googleMapsLink = \`https://www.google.com/maps?q=\${latitude},\${longitude}\`;
          
          let distance = 0;
          if (centerInfo && centerInfo.latitude && centerInfo.longitude) {
            distance = getDistanceFromLatLonInM(centerInfo.latitude, centerInfo.longitude, latitude, longitude);
          }
          
          const isOutside = distance > (centerInfo?.geofenceRadius || 100);
          if (isOutside && !isOfficialDuty) {
            alert(\`Outside Centre Geofence (\${Math.round(distance)}m).\`);
            setSubmitting(false);
            return;
          }

          let attendanceStatus = isOutside ? 'Outside Center' : 'Present';
          if (!isOutside && type === 'IN') {
            try {
              const settingsSnap = await getDoc(doc(db, 'settings', 'appSettings'));
              if (settingsSnap.exists()) {
                const sData = settingsSnap.data();
                const officeStartTimeStr = sData.officeStartTime || '09:30';
                const halfDayTimeStr = sData.halfDayTime || '11:30';
                
                const now = new Date();
                const hours = now.getHours();
                const minutes = now.getMinutes();
                const currentTimeStr = \`\${hours.toString().padStart(2, '0')}:\${minutes.toString().padStart(2, '0')}\`;
                
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
          
          if (type === 'IN') {
            const newRecord = {
              staffUid: staffData.uid,
              'Staff ID': staffData.staffId,
              'Staff Name': staffData.name,
              'Center Code': centerInfo?.code || '',
              'Center Name': centerInfo?.name || '',
              'Date': dateStr,
              date: dateStr,
              'IN Time': timeStr,
              'Latitude': latitude,
              'Longitude': longitude,
              'Accuracy': accuracy,
              'Current Address': address,
              'Google Maps Link': googleMapsLink,
              'Device Information': deviceId,
              'Attendance Status': attendanceStatus,
              'Attendance Type': 'Location Only',
              timestamp: serverTimestamp()
            };
            const docRef = await addDoc(collection(db, 'attendance'), newRecord);
            setAttendanceRecord({ id: docRef.id, ...newRecord });
          } else {
            if (attendanceRecord?.id) {
              const updateData: any = {
                'OUT Time': timeStr,
                'OUT Latitude': latitude,
                'OUT Longitude': longitude,
                'OUT Accuracy': accuracy,
                'OUT Current Address': address,
                'OUT Google Maps Link': googleMapsLink,
                'OUT Attendance Type': 'Location Only'
              };
              if (isOutside) {
                updateData['Attendance Status'] = 'Outside Center';
              }
              await updateDoc(doc(db, 'attendance', attendanceRecord.id), updateData);
              setAttendanceRecord({ ...attendanceRecord, ...updateData });
            }
          }
          
          alert("Attendance Recorded Successfully");
          setSubmitting(false);
        },
        (error) => {
          console.error("Location error:", error);
          alert("Location Permission Denied");
          setSubmitting(false);
        },
        { enableHighAccuracy: true }
      );
    } catch (err) {
      console.error(err);
      alert("Failed to submit attendance.");
      setSubmitting(false);
    }
  };
`;

content = content.replace(
  "const startAttendanceProcess = async (type: 'IN' | 'OUT') => {",
  processLocationOnlyCode + "\n\n  const startAttendanceProcess = async (type: 'IN' | 'OUT', overrideMode?: 'selfie_location' | 'location_only') => {"
);

content = content.replace(
  "setAttendanceType(type);\n    setShowCamera(true);\n    \n    // Step 1: Request Camera Permission",
  `setAttendanceType(type);
    const modeToUse = overrideMode || appSettings?.attendanceMode || 'both';
    
    if (modeToUse === 'location_only') {
       processLocationOnlyAttendance(type);
       return;
    }
    
    setShowCamera(true);
    
    // Step 1: Request Camera Permission`
);

content = content.replace(
  "const [attendanceType, setAttendanceType] = useState<'IN' | 'OUT'>('IN');",
  "const [attendanceType, setAttendanceType] = useState<'IN' | 'OUT'>('IN');\n  const [isOfficialDuty, setIsOfficialDuty] = useState(false);"
);

content = content.replace(
  "// Step 1 cont.: Capture LIVE SELFIE",
  "// Step 1 cont.: Capture LIVE SELFIE"
);

// We need to pass isOfficialDuty properly, so let's check captureAndSubmit usage
content = content.replace(
  "'Attendance Status': attendanceStatus,",
  "'Attendance Status': attendanceStatus,\n              'Attendance Type': 'Selfie + Location',"
);
content = content.replace(
  "'OUT Google Maps Link': googleMapsLink,",
  "'OUT Google Maps Link': googleMapsLink,\n                'OUT Attendance Type': 'Selfie + Location',"
);


fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
