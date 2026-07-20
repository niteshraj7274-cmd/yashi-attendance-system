const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');
if (!code.includes('attendance-guide')) {
  if (!code.includes('BookOpen')) {
    code = code.replace("import { MonitorPlay, Bell } from 'lucide-react';", "import { MonitorPlay, Bell, BookOpen } from 'lucide-react';");
  }
  
  const target = "{ label: 'Settings', icon: Settings, path: '/admin/settings', color: 'bg-gray-700', module: 'all' },";
  const insertion = "{ label: 'Settings', icon: Settings, path: '/admin/settings', color: 'bg-gray-700', module: 'all' },\n    { label: 'Attendance Guide', icon: BookOpen, path: '/admin/attendance-guide', color: 'bg-teal-700', module: 'all' },";
  
  if (code.includes(target)) {
    code = code.replace(target, insertion);
    fs.writeFileSync('src/components/AdminDashboardScreen.tsx', code);
    console.log('Successfully patched AdminDashboardScreen.tsx');
  } else {
    console.log('Target not found in AdminDashboardScreen.tsx');
  }
}
