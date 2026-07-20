import fs from 'fs';
let content = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');

const stateRegex = /const \[todayCounts, setTodayCounts\] = useState\(\{ Present: 0, Late: 0, 'Official Duty': 0, 'Outside Center': 0, Leave: 0, 'Half Day': 0 \}\);/;
content = content.replace(stateRegex, `const [todayCounts, setTodayCounts] = useState({ Present: 0, Late: 0, 'Official Duty': 0, 'Outside Center': 0, Leave: 0, 'Half Day': 0, Absent: 0, 'IN Attendance': 0, 'OUT Attendance': 0 });
  const [centerStats, setCenterStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [staffStats, setStaffStats] = useState({ total: 0, active: 0, inactive: 0 });`);

const effectRegex = /const q = query\(collection\(db, 'outside_center_attendance'\)/;
content = content.replace(effectRegex, `// Fetch Centers & Staff for stats
    const fetchEntities = async () => {
      const cSnap = await getDocs(collection(db, 'centers'));
      let cTotal = 0, cActive = 0, cInactive = 0;
      cSnap.forEach(d => {
        cTotal++;
        if (d.data().status === 'inactive' || d.data().isDeleted) cInactive++;
        else cActive++;
      });
      setCenterStats({ total: cTotal, active: cActive, inactive: cInactive });
      
      const sSnap = await getDocs(collection(db, 'staff'));
      let sTotal = 0, sActive = 0, sInactive = 0;
      sSnap.forEach(d => {
        sTotal++;
        if (d.data().status === 'inactive' || d.data().isDeleted) sInactive++;
        else sActive++;
      });
      setStaffStats({ total: sTotal, active: sActive, inactive: sInactive });
    };
    fetchEntities();
    
    const q = query(collection(db, 'outside_center_attendance')`);

const importRegex = /import \{ doc, getDoc, collection, query, where, onSnapshot \} from 'firebase\/firestore';/;
content = content.replace(importRegex, "import { doc, getDoc, getDocs, collection, query, where, onSnapshot } from 'firebase/firestore';\nimport { MonitorPlay } from 'lucide-react';");

const countsUIRegex = /<h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Today's Live Count<\/h2>/;
content = content.replace(countsUIRegex, `<div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Master Overview</h2>
            <button onClick={() => navigate('/admin/live-monitor')} className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              <MonitorPlay size={12} /> Live Monitor
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Centers</span>
              <div className="flex justify-between items-end mt-1">
                 <div className="text-center"><span className="block text-sm font-black text-blue-700">{centerStats.total}</span><span className="text-[8px] font-bold text-blue-400">Total</span></div>
                 <div className="text-center"><span className="block text-sm font-black text-emerald-600">{centerStats.active}</span><span className="text-[8px] font-bold text-emerald-400">Active</span></div>
                 <div className="text-center"><span className="block text-sm font-black text-red-500">{centerStats.inactive}</span><span className="text-[8px] font-bold text-red-300">Inactive</span></div>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-lg flex flex-col justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">Staff</span>
              <div className="flex justify-between items-end mt-1">
                 <div className="text-center"><span className="block text-sm font-black text-indigo-700">{staffStats.total}</span><span className="text-[8px] font-bold text-indigo-400">Total</span></div>
                 <div className="text-center"><span className="block text-sm font-black text-emerald-600">{staffStats.active}</span><span className="text-[8px] font-bold text-emerald-400">Active</span></div>
                 <div className="text-center"><span className="block text-sm font-black text-red-500">{staffStats.inactive}</span><span className="text-[8px] font-bold text-red-300">Inactive</span></div>
              </div>
            </div>
          </div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Today's Live Count</h2>`);

fs.writeFileSync('src/components/AdminDashboardScreen.tsx', content);
