const fs = require('fs');
let code = fs.readFileSync('src/components/AttendanceSuccessModal.tsx', 'utf8');

code = code.replace(
  '<h2 className="text-lg font-bold text-slate-800 mb-2">✅ Attendance Marked Successfully</h2>',
  '<h2 className="text-lg font-bold text-slate-800 mb-2 whitespace-pre-line">✅ {title}</h2>'
);
code = code.replace(
  '<p className="text-sm font-medium text-emerald-600 mb-4">{title}</p>',
  ''
);
code = code.replace(
  '{message && <p className="text-sm text-slate-600 mb-6">{message}</p>}',
  '{message && <p className="text-sm text-slate-600 mb-6 whitespace-pre-line">{message}</p>}'
);

fs.writeFileSync('src/components/AttendanceSuccessModal.tsx', code);
