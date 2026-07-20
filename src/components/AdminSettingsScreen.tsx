import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Save, Wrench } from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'motion/react';

export default function AdminSettingsScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [attendanceModuleEnabled, setAttendanceModuleEnabled] = useState(true);
  const [attendanceMode, setAttendanceMode] = useState<'gps' | 'selfie' | 'gps_selfie'>('gps');
  const [leaveModuleEnabled, setLeaveModuleEnabled] = useState(true);
  const [odModuleEnabled, setOdModuleEnabled] = useState(true);
  const [supportModuleEnabled, setSupportModuleEnabled] = useState(true);
  const [salaryModuleEnabled, setSalaryModuleEnabled] = useState(false);
  const [salaryDeductionControl, setSalaryDeductionControl] = useState('skip');
  const [officeStartTime, setOfficeStartTime] = useState('09:30');
  const [lateDeductionAmount, setLateDeductionAmount] = useState('50');
  const [enableLateDeduction, setEnableLateDeduction] = useState(true);
  const [halfDayDeductionAmount, setHalfDayDeductionAmount] = useState('250');
  const [enableHalfDayDeduction, setEnableHalfDayDeduction] = useState(true);
  const [halfDayTime, setHalfDayTime] = useState('11:30');
  const [centerDashboardViewAllCenters, setCenterDashboardViewAllCenters] = useState(false);
  const [centerDashboardViewAttendanceDashboard, setCenterDashboardViewAttendanceDashboard] = useState(true);
  const [centerDashboardViewAttendanceSummary, setCenterDashboardViewAttendanceSummary] = useState(true);
  const [centerDashboardViewDateFilter, setCenterDashboardViewDateFilter] = useState(true);
  const [centerDashboardViewCenterFilter, setCenterDashboardViewCenterFilter] = useState(true);
  const [centerDashboardViewStaffAttendanceDetails, setCenterDashboardViewStaffAttendanceDetails] = useState(true);
  const [centerDashboardViewReports, setCenterDashboardViewReports] = useState(true);
  const [centerDashboardViewSearchFilter, setCenterDashboardViewSearchFilter] = useState(true);
  const [isProd, setIsProd] = useState(import.meta.env.PROD);
  const [supportWhatsApp, setSupportWhatsApp] = useState('+91 7070972806');
  const [supportPhone, setSupportPhone] = useState('+91 7070972806');
  const [supportHours, setSupportHours] = useState('Monday – Saturday\n09:00 AM – 06:00 PM');
  const [savingSupport, setSavingSupport] = useState(false);
  const [titleTaps, setTitleTaps] = useState(0);

  
  const handleTitleTap = () => {
    const newTaps = titleTaps + 1;
    setTitleTaps(newTaps);
    if (newTaps >= 7) {
      navigate('/developer-login');
      setTitleTaps(0);
    }
    setTimeout(() => {
      setTitleTaps(0);
    }, 3000);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'settings', 'appSettings');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTestMode(docSnap.data().testMode || false);
          setAttendanceModuleEnabled(docSnap.data().attendanceModuleEnabled ?? true);
          setAttendanceMode(docSnap.data().attendanceMode || 'gps');
          setLeaveModuleEnabled(docSnap.data().leaveModuleEnabled ?? true);
          setOdModuleEnabled(docSnap.data().odModuleEnabled ?? true);
          setSupportModuleEnabled(docSnap.data().supportModuleEnabled ?? true);
          setSalaryModuleEnabled(docSnap.data().salaryModuleEnabled || false);
          setSalaryDeductionControl(docSnap.data().salaryDeductionControl || 'skip');
          setOfficeStartTime(docSnap.data().officeStartTime || '09:30');
          setLateDeductionAmount(docSnap.data().lateDeductionAmount || '50');
          setEnableLateDeduction(docSnap.data().enableLateDeduction ?? true);
          setHalfDayDeductionAmount(docSnap.data().halfDayDeductionAmount || '250');
          setEnableHalfDayDeduction(docSnap.data().enableHalfDayDeduction ?? true);
          setHalfDayTime(docSnap.data().halfDayTime || '11:30');
          setCenterDashboardViewAllCenters(docSnap.data().centerDashboardViewAllCenters ?? false);
          setCenterDashboardViewAttendanceDashboard(docSnap.data().centerDashboardViewAttendanceDashboard ?? true);
          setCenterDashboardViewAttendanceSummary(docSnap.data().centerDashboardViewAttendanceSummary ?? true);
          setCenterDashboardViewDateFilter(docSnap.data().centerDashboardViewDateFilter ?? true);
          setCenterDashboardViewCenterFilter(docSnap.data().centerDashboardViewCenterFilter ?? true);
          setCenterDashboardViewStaffAttendanceDetails(docSnap.data().centerDashboardViewStaffAttendanceDetails ?? true);
          setCenterDashboardViewReports(docSnap.data().centerDashboardViewReports ?? true);
          setCenterDashboardViewSearchFilter(docSnap.data().centerDashboardViewSearchFilter ?? true);
        }
        
        const supportRef = doc(db, 'settings', 'support');
        const supportSnap = await getDoc(supportRef);
        if (supportSnap.exists()) {
          const data = supportSnap.data();
          if (data.whatsapp) setSupportWhatsApp(data.whatsapp);
          if (data.supportNumber) setSupportPhone(data.supportNumber);
          if (data.workingHours) setSupportHours(data.workingHours);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  
  const handleSaveSupport = async () => {
    setSavingSupport(true);
    try {
      await setDoc(doc(db, 'settings', 'support'), {
        whatsapp: supportWhatsApp,
        supportNumber: supportPhone,
        workingHours: supportHours
      }, { merge: true });
      alert("Support settings saved successfully!");
    } catch (err) {
      console.error("Error saving support settings:", err);
      alert("Failed to save support settings.");
    } finally {
      setSavingSupport(false);
    }
  };

  const handleSave = async () => {
    if (isProd && testMode) {
      alert("Test Mode cannot be enabled in Production Mode.");
      return;
    }
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'appSettings'), {
        testMode: testMode,
        attendanceModuleEnabled: attendanceModuleEnabled,
        attendanceMode: attendanceMode,
        leaveModuleEnabled: leaveModuleEnabled,
        odModuleEnabled: odModuleEnabled,
        supportModuleEnabled: supportModuleEnabled,
        salaryModuleEnabled: salaryModuleEnabled,
        salaryDeductionControl: salaryDeductionControl,
        officeStartTime: officeStartTime,
        lateDeductionAmount: lateDeductionAmount,
        enableLateDeduction: enableLateDeduction,
        halfDayDeductionAmount: halfDayDeductionAmount,
        enableHalfDayDeduction: enableHalfDayDeduction,
        halfDayTime: halfDayTime,
        centerDashboardViewAllCenters: centerDashboardViewAllCenters,
        centerDashboardViewAttendanceDashboard: centerDashboardViewAttendanceDashboard,
        centerDashboardViewAttendanceSummary: centerDashboardViewAttendanceSummary,
        centerDashboardViewDateFilter: centerDashboardViewDateFilter,
        centerDashboardViewCenterFilter: centerDashboardViewCenterFilter,
        centerDashboardViewStaffAttendanceDetails: centerDashboardViewStaffAttendanceDetails,
        centerDashboardViewReports: centerDashboardViewReports,
        centerDashboardViewSearchFilter: centerDashboardViewSearchFilter,
      }, { merge: true });
      alert("Settings saved successfully!");
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center font-sans">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden pb-20">
      <div className="bg-emerald-700 text-white h-20 flex items-center px-6 shadow-md gap-4 z-10">
        <button onClick={() => navigate('/admin-dashboard')} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase" onClick={handleTitleTap}>Settings</h1>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-6">


        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-6"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Settings size={20} className="text-emerald-600" />
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">Application Settings</h2>
          </div>

          
          <div className="flex flex-col gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Module Control</h3>
              <p className="text-xs text-slate-500 mt-1">Enable or disable modules system-wide.</p>
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-200 pt-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">Attendance Module</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={attendanceModuleEnabled} onChange={(e) => setAttendanceModuleEnabled(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-bold text-slate-700">Attendance Type</span>
                <select 
                  value={attendanceMode}
                  onChange={(e) => setAttendanceMode(e.target.value as any)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 bg-slate-50 text-slate-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="gps">GPS Attendance</option>
                  <option value="selfie">Selfie Attendance</option>
                  <option value="gps_selfie">GPS + Selfie Attendance</option>
                </select>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">Leave Module</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={leaveModuleEnabled} onChange={(e) => setLeaveModuleEnabled(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">Official Duty Module</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={odModuleEnabled} onChange={(e) => setOdModuleEnabled(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">Support & Help Module</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={supportModuleEnabled} onChange={(e) => setSupportModuleEnabled(e.target.checked)} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-bold text-slate-700">Salary Module</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={salaryModuleEnabled}
                    onChange={(e) => setSalaryModuleEnabled(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Salary Deduction Control</h3>
              <p className="text-xs text-slate-500 mt-1">
                Control automatic salary deductions.
              </p>
            </div>
            <select
              value={salaryDeductionControl}
              onChange={(e) => setSalaryDeductionControl(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium mt-2"
            >
              <option value="enable">Enable (Automatic deduction works)</option>
              <option value="disable">Disable (No deduction applied)</option>
              <option value="skip">Skip (Deduction module ignored)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">GPS Test Mode</h3>
              <p className="text-xs text-slate-500 mt-1">
                Allow attendance IN using Center's location if GPS fails.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                value="" 
                className="sr-only peer" 
                checked={testMode}
                onChange={(e) => {
                  if (isProd && e.target.checked) {
                    alert("Test Mode cannot be enabled in Production Mode.");
                    return;
                  }
                  setTestMode(e.target.checked);
                }}
                disabled={isProd}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
            </label>
          </div>
          
          
          <div className="flex flex-col gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg mt-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Center Client Portal Controls</h3>
              <p className="text-xs text-slate-500 mt-1">Enable or disable features in the Center Client Portal Advanced Dashboard.</p>
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-200 pt-3">
              {[
                { label: 'View All Centers', state: centerDashboardViewAllCenters, setter: setCenterDashboardViewAllCenters },
                { label: 'View Attendance Dashboard', state: centerDashboardViewAttendanceDashboard, setter: setCenterDashboardViewAttendanceDashboard },
                { label: 'View Attendance Summary', state: centerDashboardViewAttendanceSummary, setter: setCenterDashboardViewAttendanceSummary },
                { label: 'View Date Filter', state: centerDashboardViewDateFilter, setter: setCenterDashboardViewDateFilter },
                { label: 'View Center Filter', state: centerDashboardViewCenterFilter, setter: setCenterDashboardViewCenterFilter },
                { label: 'View Staff Attendance Details', state: centerDashboardViewStaffAttendanceDetails, setter: setCenterDashboardViewStaffAttendanceDetails },
                { label: 'View Reports', state: centerDashboardViewReports, setter: setCenterDashboardViewReports },
                { label: 'View Search & Filter', state: centerDashboardViewSearchFilter, setter: setCenterDashboardViewSearchFilter }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-4">
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={item.state} onChange={(e) => item.setter(e.target.checked)} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={saving}
            className="mt-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center text-sm gap-2 uppercase tracking-wider"
          >
            {saving ? (
               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <><Save size={18} /> Save Settings</>
            )}

          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4 mt-6"
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Settings size={20} className="text-emerald-600" />
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-800">Support Settings</h2>
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">WhatsApp Number</label>
            <input 
              type="text" 
              value={supportWhatsApp}
              onChange={(e) => setSupportWhatsApp(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
            />
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Support Phone Number</label>
            <input 
              type="text" 
              value={supportPhone}
              onChange={(e) => setSupportPhone(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 block">Working Hours</label>
            <textarea 
              value={supportHours}
              onChange={(e) => setSupportHours(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm font-medium min-h-[80px]"
            ></textarea>
          </div>

          <button 
            onClick={handleSaveSupport}
            disabled={savingSupport}
            className="mt-2 w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-lg shadow-sm transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center text-sm gap-2 uppercase tracking-wider"
          >
            {savingSupport ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <><Save size={18} /> Save Support Settings</>
            )}

          </button>
        </motion.div>
      </div>
    </div>
  );
}
