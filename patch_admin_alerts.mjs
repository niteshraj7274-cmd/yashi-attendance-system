import fs from 'fs';
let content = fs.readFileSync('src/components/AdminOutsideAlertsScreen.tsx', 'utf8');

const actionRegex = /await updateDoc\(doc\(db, 'attendance', selectedAlert.attendanceDocId\), \{[\s\S]*?'Outside Alert Remarks': remarks\s*\}\);/;
content = content.replace(actionRegex, `const attendanceUpdate: any = {
          'Outside Alert Status': status,
          'Outside Alert Remarks': remarks
        };
        if (status === 'Official Duty') {
          attendanceUpdate['Attendance Status'] = 'Official Duty';
        }
        await updateDoc(doc(db, 'attendance', selectedAlert.attendanceDocId), attendanceUpdate);`);

const btnRegex = /<button \s*onClick=\{\(\) => handleAction\('Rejected'\)\}/;
content = content.replace(btnRegex, `<button 
                         onClick={() => handleAction('Explanation Requested')}
                         disabled={actionLoading}
                         className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-lg text-sm uppercase tracking-wider transition-colors shadow-sm disabled:opacity-50"
                       >
                         Request Explanation
                       </button>
                       <button 
                         onClick={() => handleAction('Rejected')}`);
                         
fs.writeFileSync('src/components/AdminOutsideAlertsScreen.tsx', content);
