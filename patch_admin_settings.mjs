import fs from 'fs';
let content = fs.readFileSync('src/components/AdminSettingsScreen.tsx', 'utf8');

const stateRegex = /const \[salaryDeductionControl, setSalaryDeductionControl\] = useState\('skip'\);/;
content = content.replace(stateRegex, `const [salaryDeductionControl, setSalaryDeductionControl] = useState('skip');
  const [officeStartTime, setOfficeStartTime] = useState('09:30');
  const [halfDayTime, setHalfDayTime] = useState('11:30');`);

const fetchRegex = /setSalaryDeductionControl\(docSnap\.data\(\)\.salaryDeductionControl \|\| 'skip'\);/;
content = content.replace(fetchRegex, `setSalaryDeductionControl(docSnap.data().salaryDeductionControl || 'skip');
          setOfficeStartTime(docSnap.data().officeStartTime || '09:30');
          setHalfDayTime(docSnap.data().halfDayTime || '11:30');`);

const saveRegex = /salaryDeductionControl: salaryDeductionControl/;
content = content.replace(saveRegex, `salaryDeductionControl: salaryDeductionControl,
        officeStartTime: officeStartTime,
        halfDayTime: halfDayTime`);
        
const uiRegex = /<h3 className="font-bold text-slate-800 text-sm mb-2">Salary Deduction Rules<\/h3>/;
content = content.replace(uiRegex, `<h3 className="font-bold text-slate-800 text-sm mb-2">Attendance Time Rules</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Office Start Time</label>
                  <input type="time" value={officeStartTime} onChange={e => setOfficeStartTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Half Day Cutoff Time</label>
                  <input type="time" value={halfDayTime} onChange={e => setHalfDayTime(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded p-2 text-sm" />
                </div>
              </div>
              <h3 className="font-bold text-slate-800 text-sm mb-2">Salary Deduction Rules</h3>`);

fs.writeFileSync('src/components/AdminSettingsScreen.tsx', content);
