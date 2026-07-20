import fs from 'fs';

let content = fs.readFileSync('src/components/AdminAttendanceDashboardScreen.tsx', 'utf8');

content = content.replace(
  /'Out Date': r\['OUT Time'\] \? \(r\.Date \|\| r\.date \|\| 'N\/A'\) : 'N\/A',/,
  "'Out Date': r['OUT Date'] || (r['OUT Time'] ? (r.Date || r.date || 'N/A') : 'N/A'),"
);

fs.writeFileSync('src/components/AdminAttendanceDashboardScreen.tsx', content);
