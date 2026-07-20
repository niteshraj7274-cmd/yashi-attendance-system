const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');
if (!code.includes('BookOpen')) {
  code = code.replace("import { MonitorPlay, Bell } from 'lucide-react';", "import { MonitorPlay, Bell, BookOpen } from 'lucide-react';");
  
  code = code.replace(
    "{ label: 'Settings', icon: Settings, path: '/admin/settings', color: 'bg-gray-700', module: 'all' },",
    "{ label: 'Settings', icon: Settings, path: '/admin/settings', color: 'bg-gray-700', module: 'all' },\n    { label: 'Attendance Guide', icon: BookOpen, path: '/admin/attendance-guide', color: 'bg-teal-700', module: 'all' },"
  );
}
fs.writeFileSync('src/components/AdminDashboardScreen.tsx', code);
