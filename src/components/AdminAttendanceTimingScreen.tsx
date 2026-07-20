import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Save, RefreshCw, CheckCircle2, AlertCircle, Building2, Calendar, LayoutDashboard } from 'lucide-react';
import { collection, query, getDocs, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { useActiveCenters } from '../hooks/useActiveCenters';

const DEFAULT_TIMINGS = {
  centerOpenTime: '09:00',
  centerCloseTime: '18:00',
  workingHoursPerDay: 8,
  breakStartTime: '13:00',
  breakEndTime: '14:00',
  
  attendanceStartTime: '09:00',
  graceTimeMinutes: 15,
  lateAttendanceStartTime: '09:16',
  halfDayStartTime: '13:00',
  markInLastTime: '14:00',
  
  markOutStartTime: '17:00',
  markOutLastTime: '20:00',

  weeklyHoliday: 'Sunday',
  governmentHolidayEnabled: true,
  emergencyHolidayEnabled: false,
  officialDutyEnabled: true,
  workFromFieldEnabled: true,

  attendanceEnabled: true,
  autoOutEnabled: false,
  autoOutTime: "18:00",
  autoOutReason: "Auto Attendance OUT by Admin Settings",
};

export default function AdminAttendanceTimingScreen() {
  const navigate = useNavigate();
  const { centers } = useActiveCenters();
  const [selectedCenterId, setSelectedCenterId] = useState('default');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const [timings, setTimings] = useState<any>({ ...DEFAULT_TIMINGS });

  useEffect(() => {
    fetchTimings(selectedCenterId);
  }, [selectedCenterId]);

  const fetchTimings = async (cid: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, 'center_timings', cid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTimings({ ...DEFAULT_TIMINGS, ...docSnap.data() });
      } else {
        // Fallback to default if viewing a specific center that has no custom timing yet
        if (cid !== 'default') {
           const defRef = doc(db, 'center_timings', 'default');
           const defSnap = await getDoc(defRef);
           if (defSnap.exists()) {
              setTimings({ ...DEFAULT_TIMINGS, ...defSnap.data() });
           } else {
              setTimings({ ...DEFAULT_TIMINGS });
           }
        } else {
           setTimings({ ...DEFAULT_TIMINGS });
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'center_timings', selectedCenterId), timings);
      alert('Settings saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if(window.confirm('Reset to default timings?')) {
       setTimings({ ...DEFAULT_TIMINGS });
    }
  };

  const toggleAttendance = async (enabled: boolean) => {
     setTimings(prev => ({...prev, attendanceEnabled: enabled}));
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-cyan-700 text-white h-20 flex items-center px-6 shadow-md gap-4 z-10 shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Time Management</h1>
          <p className="text-[10px] text-cyan-200 uppercase tracking-widest mt-0.5">Attendance Rules</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Select Center Configuration</label>
          <select 
            value={selectedCenterId}
            onChange={(e) => setSelectedCenterId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-bold text-slate-700 outline-none focus:border-cyan-500"
          >
            <option value="default">Global Default Settings</option>
            {centers.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">

            {/* Dashboard View */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 shadow-sm text-white">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-3">
                <LayoutDashboard size={18} className="text-cyan-400" />
                <h2 className="text-sm font-bold uppercase tracking-widest">Today's Timing Dashboard</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-medium">
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400">Center Open</span>
                  <span className="text-lg font-bold text-cyan-300">{timings.centerOpenTime}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400">Attendance Start</span>
                  <span className="text-lg font-bold text-emerald-400">{timings.attendanceStartTime}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400">Late Time</span>
                  <span className="text-lg font-bold text-amber-400">{timings.lateAttendanceStartTime}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400">Half Day Time</span>
                  <span className="text-lg font-bold text-orange-400">{timings.halfDayStartTime}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400">Mark In Close</span>
                  <span className="text-lg font-bold text-red-400">{timings.markInLastTime}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-slate-400">Mark Out Window</span>
                  <span className="text-lg font-bold text-blue-300">{timings.markOutStartTime} - {timings.markOutLastTime}</span>
                </div>
              </div>
            </div>

            {/* Admin Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
               <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Admin Controls</h2>
               <div className="grid grid-cols-2 gap-3">
                  <button 
                     onClick={handleSave}
                     disabled={saving}
                     className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wide flex items-center justify-center gap-1"
                  >
                     {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><Save size={14} /> Save</>}
                  </button>
                  <button 
                     onClick={handleReset}
                     className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-2.5 rounded-lg text-xs uppercase tracking-wide flex items-center justify-center gap-1"
                  >
                     <RefreshCw size={14} /> Reset
                  </button>
                  
                  {timings.attendanceEnabled ? (
                     <button 
                        onClick={() => toggleAttendance(false)}
                        className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-bold py-2.5 rounded-lg text-xs uppercase tracking-wide col-span-2"
                     >
                        Disable Attendance
                     </button>
                  ) : (
                     <button 
                        onClick={() => toggleAttendance(true)}
                        className="bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-100 font-bold py-2.5 rounded-lg text-xs uppercase tracking-wide col-span-2"
                     >
                        Enable Attendance
                     </button>
                  )}
               </div>
            </div>

            {/* Section 1: Center Timing */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                 <Building2 size={16} /> Section 1: Center Timing
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Center Open</label>
                  <input type="time" value={timings.centerOpenTime} onChange={e => setTimings({...timings, centerOpenTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Center Close</label>
                  <input type="time" value={timings.centerCloseTime} onChange={e => setTimings({...timings, centerCloseTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Working Hrs/Day</label>
                  <input type="number" value={timings.workingHoursPerDay} onChange={e => setTimings({...timings, workingHoursPerDay: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
                <div></div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Break Start</label>
                  <input type="time" value={timings.breakStartTime} onChange={e => setTimings({...timings, breakStartTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Break End</label>
                  <input type="time" value={timings.breakEndTime} onChange={e => setTimings({...timings, breakEndTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
              </div>
            </div>

            {/* Section 2: Mark In Rules */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                 <Clock size={16} /> Section 2: Mark In Rules
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Attend. Start</label>
                  <input type="time" value={timings.attendanceStartTime} onChange={e => setTimings({...timings, attendanceStartTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Grace Time (Min)</label>
                  <input type="number" value={timings.graceTimeMinutes} onChange={e => setTimings({...timings, graceTimeMinutes: Number(e.target.value)})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Late Start</label>
                  <input type="time" value={timings.lateAttendanceStartTime} onChange={e => setTimings({...timings, lateAttendanceStartTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Half Day Start</label>
                  <input type="time" value={timings.halfDayStartTime} onChange={e => setTimings({...timings, halfDayStartTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Mark In Last Time (Absent after this)</label>
                  <input type="time" value={timings.markInLastTime} onChange={e => setTimings({...timings, markInLastTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
              </div>
              <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-2">System Logic Preview</p>
                 <ul className="text-xs space-y-1 text-slate-600">
                    <li>Before {timings.attendanceStartTime}: <span className="font-bold">Not Started</span></li>
                    <li>{timings.attendanceStartTime} - {timings.lateAttendanceStartTime}: <span className="font-bold text-emerald-600">Present</span></li>
                    <li>{timings.lateAttendanceStartTime} - {timings.halfDayStartTime}: <span className="font-bold text-amber-600">Late</span></li>
                    <li>{timings.halfDayStartTime} - {timings.markInLastTime}: <span className="font-bold text-orange-600">Half Day</span></li>
                    <li>After {timings.markInLastTime}: <span className="font-bold text-red-600">Absent / Disabled</span></li>
                 </ul>
              </div>
            </div>

            {/* Section 3: Mark Out Rules */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                 <Clock size={16} /> Section 3: Mark Out Rules
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Mark Out Start</label>
                  <input type="time" value={timings.markOutStartTime} onChange={e => setTimings({...timings, markOutStartTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Mark Out Last</label>
                  <input type="time" value={timings.markOutLastTime} onChange={e => setTimings({...timings, markOutLastTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                </div>
              </div>
            </div>

            {/* Section 4: Leave & Holiday */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                 <Calendar size={16} /> Section 4: Leave & Holiday
              </h2>
              <div className="flex flex-col gap-3">
                 <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Weekly Holiday</label>
                  <select 
                     value={timings.weeklyHoliday} 
                     onChange={e => setTimings({...timings, weeklyHoliday: e.target.value})} 
                     className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium"
                  >
                     <option value="Sunday">Sunday</option>
                     <option value="Monday">Monday</option>
                     <option value="Tuesday">Tuesday</option>
                     <option value="Wednesday">Wednesday</option>
                     <option value="Thursday">Thursday</option>
                     <option value="Friday">Friday</option>
                     <option value="Saturday">Saturday</option>
                     <option value="None">None</option>
                  </select>
                </div>
                <label className="flex items-center gap-3">
                   <input type="checkbox" checked={timings.governmentHolidayEnabled} onChange={e => setTimings({...timings, governmentHolidayEnabled: e.target.checked})} className="w-4 h-4 text-cyan-600 rounded" />
                   <span className="text-sm font-bold text-slate-700">Govt. Holidays Enabled</span>
                </label>
                <label className="flex items-center gap-3">
                   <input type="checkbox" checked={timings.emergencyHolidayEnabled} onChange={e => setTimings({...timings, emergencyHolidayEnabled: e.target.checked})} className="w-4 h-4 text-cyan-600 rounded" />
                   <span className="text-sm font-bold text-slate-700">Emergency Holiday Enabled</span>
                </label>
                <label className="flex items-center gap-3">
                   <input type="checkbox" checked={timings.officialDutyEnabled} onChange={e => setTimings({...timings, officialDutyEnabled: e.target.checked})} className="w-4 h-4 text-cyan-600 rounded" />
                   <span className="text-sm font-bold text-slate-700">Official Duty Allowed</span>
                </label>
                <label className="flex items-center gap-3">
                   <input type="checkbox" checked={timings.workFromFieldEnabled} onChange={e => setTimings({...timings, workFromFieldEnabled: e.target.checked})} className="w-4 h-4 text-cyan-600 rounded" />
                   <span className="text-sm font-bold text-slate-700">Work From Field Allowed</span>
                </label>
              </div>
            </div>
            

            {/* Section 5: Auto Attendance OUT */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                 <Clock size={16} /> Section 5: Auto Attendance OUT
              </h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3">
                   <input type="checkbox" checked={timings.autoOutEnabled} onChange={e => setTimings({...timings, autoOutEnabled: e.target.checked})} className="w-4 h-4 text-cyan-600 rounded" />
                   <span className="text-sm font-bold text-slate-700">Enable Auto Attendance OUT</span>
                </label>
                
                {timings.autoOutEnabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Auto OUT Time</label>
                      <input type="time" value={timings.autoOutTime} onChange={e => setTimings({...timings, autoOutTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
