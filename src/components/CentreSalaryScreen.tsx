import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, IndianRupee } from 'lucide-react';
import { collection, query, where, getDocs, doc, getDoc, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Staff } from '../types';

export default function CentreSalaryScreen() {
  const navigate = useNavigate();
  const { centerId } = useParams();
  
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [salaries, setSalaries] = useState<Record<string, number>>({});
  const [statusCounts, setStatusCounts] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [centerName, setCenterName] = useState('');

  useEffect(() => {
    if (!centerId) return;
    
    const fetchSettings = async () => {
      const docRef = doc(db, 'settings', 'appSettings');
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || !docSnap.data().salaryModuleEnabled) {
        alert("Salary module is disabled.");
        navigate(-1);
      }
    };
    
    const fetchStaff = async () => {
      try {
        const centerRef = doc(db, 'centers', centerId);
        const centerDoc = await getDoc(centerRef);
        if (centerDoc.exists()) {
          setCenterName(centerDoc.data().name);
        }
        
        const q = query(collection(db, 'staff'), where('centerId', '==', centerId), where('isDeleted', '==', false));
        const snapshot = await getDocs(q);
        const staffData: Staff[] = [];
        snapshot.forEach(doc => {
          staffData.push({ id: doc.id, ...doc.data() } as Staff);
        });
        setStaffList(staffData);

        // Fetch attendance for this month
        const now = new Date();
        const yearMonth = now.toISOString().slice(0, 7); // YYYY-MM
        const attQ = query(collection(db, 'attendance'), where('Center Code', '==', centerDoc.data().code));
        const attSnap = await getDocs(attQ);
        
        // Settings
        const settingsSnap = await getDoc(doc(db, 'settings', 'appSettings'));
        const settingsData = settingsSnap.data() || {};
        const enableLateDeduction = settingsData.enableLateDeduction ?? true;
        const lateDeductionAmount = parseInt(settingsData.lateDeductionAmount || '50');
        const enableHalfDayDeduction = settingsData.enableHalfDayDeduction ?? true;
        const halfDayDeductionAmount = parseInt(settingsData.halfDayDeductionAmount || '250');
        
        const calcSalaries: Record<string, number> = {};
        const calcCounts: Record<string, any> = {};
        
        staffData.forEach(s => {
          calcSalaries[s.id] = s.totalMonthlySalary || 0;
          calcCounts[s.id] = { Present: 0, Late: 0, 'Half Day': 0, 'Official Duty': 0, Leave: 0, Absent: 0 };
        });

        const workingDays = 30; // Assuming 30 days in a month for calculation

        attSnap.forEach(d => {
          const data = d.data();
          if (data.date && data.date.startsWith(yearMonth)) {
            const uid = data.staffUid;
            if (uid && calcCounts[uid]) {
               const status = data['Attendance Status'] || 'Present';
               if (calcCounts[uid][status] !== undefined) {
                 calcCounts[uid][status]++;
               } else {
                 calcCounts[uid][status] = 1;
               }
            }
          }
        });

        staffData.forEach(s => {
           const dailySalary = (s.totalMonthlySalary || 0) / workingDays;
           const c = calcCounts[s.id];
           const presentDays = c['Present'] || 0;
           const odDays = c['Official Duty'] || 0;
           const leaveDays = c['Leave'] || 0;
           const lateDays = c['Late'] || 0;
           const halfDays = c['Half Day'] || 0;
           
           const activeDays = presentDays + odDays + leaveDays + lateDays + halfDays;
           let baseEarned = activeDays * dailySalary;
           
           let lateDeductions = 0;
           if (enableLateDeduction) {
              lateDeductions = lateDays * lateDeductionAmount;
           }
           
           let halfDayDeductions = 0;
           if (enableHalfDayDeduction) {
              halfDayDeductions = halfDays * halfDayDeductionAmount;
           }
           
           let finalSalary = Math.round(baseEarned - lateDeductions - halfDayDeductions);
           if (finalSalary < 0) finalSalary = 0;
           
           calcSalaries[s.id] = finalSalary;
        });

        setSalaries(calcSalaries);
        setStatusCounts(calcCounts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings().then(() => fetchStaff());
  }, [centerId, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 items-center justify-center font-sans">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <div className="bg-blue-900 text-white h-20 flex items-center px-6 shadow-md gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase truncate">Salary Module</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">{centerName}</p>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <div className="flex flex-col gap-4">
          {staffList.length === 0 ? (
            <div className="text-center py-10 text-slate-500 font-medium">No staff found.</div>
          ) : (
            staffList.map(staff => (
              <div key={staff.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-bold text-slate-800">{staff.name}</h3>
                <p className="text-xs text-slate-500">{staff.designation}</p>
                <div className="mt-3 flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-500 uppercase">Calculated Salary</span>
                    <span className="text-[10px] text-slate-400 mt-1">P:{statusCounts[staff.id]?.Present || 0} L:{statusCounts[staff.id]?.Late || 0} HD:{statusCounts[staff.id]?.['Half Day'] || 0} OD:{statusCounts[staff.id]?.['Official Duty'] || 0}</span>
                  </div>
                  <span className="font-bold text-blue-700 flex items-center text-lg">
                    <IndianRupee size={16} className="mr-0.5" /> 
                    {(salaries[staff.id] || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
