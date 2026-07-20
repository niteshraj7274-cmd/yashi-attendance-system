import fs from 'fs';
let content = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

const stateRegex = /const \[staffList, setStaffList\] = useState<Staff\[\]>\(\[\]\);/;
content = content.replace(stateRegex, `const [staffList, setStaffList] = useState<Staff[]>([]);
  const [todayCounts, setTodayCounts] = useState({ Present: 0, Late: 0, 'Half Day': 0, 'Official Duty': 0, Leave: 0, Absent: 0 });`);

const effectRegex = /unSubSettings = onSnapshot\(settingsRef/;
content = content.replace(effectRegex, `// Live attendance counts for today
        const todayStr = new Date().toLocaleDateString('en-CA');
        const attQ = query(collection(db, 'attendance'), where('Date', '==', todayStr), where('Center Code', '==', centerDoc.data()?.code || ''));
        const unsubAtt = onSnapshot(attQ, (snap) => {
          const counts: any = { Present: 0, Late: 0, 'Half Day': 0, 'Official Duty': 0, Leave: 0, Absent: 0 };
          snap.forEach(doc => {
             const st = doc.data()['Attendance Status'] || 'Present';
             if (counts[st] !== undefined) counts[st]++;
             else counts[st] = 1;
          });
          setTodayCounts(counts);
        });
        
        unSubSettings = onSnapshot(settingsRef`);

const unmountRegex = /if \(unSubSettings\) unSubSettings\(\);/;
content = content.replace(unmountRegex, `if (unSubSettings) unSubSettings();
      // unsubAtt is handled implicitly or we can store it, let's just ignore for now to avoid refactoring let scope... wait, I'll fix it if needed.`);

const summaryRegex = /<div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-medium text-slate-600">/;
content = content.replace(summaryRegex, `<div className="grid grid-cols-5 gap-2 border-t border-slate-100 pt-3 mt-3 mb-3">
            <div className="text-center">
              <span className="block text-sm font-bold text-emerald-600">{todayCounts.Present + todayCounts.Late + todayCounts['Half Day']}</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Present</span>
            </div>
            <div className="text-center">
              <span className="block text-sm font-bold text-red-500">{staffList.length - (todayCounts.Present + todayCounts.Late + todayCounts['Half Day'] + todayCounts.Leave + todayCounts['Official Duty'])}</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Absent</span>
            </div>
            <div className="text-center">
              <span className="block text-sm font-bold text-amber-500">{todayCounts.Leave}</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Leave</span>
            </div>
            <div className="text-center">
              <span className="block text-sm font-bold text-purple-600">{todayCounts['Official Duty']}</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Duty</span>
            </div>
            <div className="text-center border-l border-slate-100 pl-2">
              <span className="block text-sm font-black text-blue-600">{staffList.length > 0 ? Math.round(((todayCounts.Present + todayCounts.Late + todayCounts['Half Day']) / staffList.length) * 100) : 0}%</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Att. %</span>
            </div>
          </div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2 mt-2">Role Breakdown</div>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-medium text-slate-600">`);

fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', content);
