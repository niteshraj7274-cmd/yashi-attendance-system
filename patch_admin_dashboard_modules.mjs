import fs from 'fs';
let content = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');

const stateRegex = /const \[staffStats, setStaffStats\] = useState\(\{ total: 0, active: 0, inactive: 0 \}\);/;
content = content.replace(stateRegex, `const [staffStats, setStaffStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [appSettings, setAppSettings] = useState<any>({
    attendanceModuleEnabled: true,
    leaveModuleEnabled: true,
    odModuleEnabled: true,
    supportModuleEnabled: true,
    salaryModuleEnabled: false
  });`);

const fetchRegex = /const unsubAtt = onSnapshot\(attQ, \(snapshot\) => \{/;
content = content.replace(fetchRegex, `const unsubSettings = onSnapshot(doc(db, 'settings', 'appSettings'), (docSnap) => {
      if (docSnap.exists()) {
        setAppSettings(prev => ({ ...prev, ...docSnap.data() }));
      }
    });
    
    const unsubAtt = onSnapshot(attQ, (snapshot) => {`);

const returnRegex = /return \(\) => \{ unsubscribe\(\); unsubAtt\(\); \};/;
content = content.replace(returnRegex, `return () => { unsubscribe(); unsubAtt(); unsubSettings(); };`);

const menuRegex = /const menuItems = \[[\s\S]*?\];/;
content = content.replace(menuRegex, `const menuItems = [
    { label: 'Center Management', icon: Building2, path: '/admin/centers', color: 'bg-blue-600', module: 'all' },
    { label: 'Staff Management', icon: Users, path: '/admin/staff', color: 'bg-indigo-600', module: 'all' },
    { label: 'Outside Alerts', icon: AlertTriangle, path: '/admin/outside-alerts', color: 'bg-red-600', module: 'attendanceModuleEnabled' },
    { label: 'Reports', icon: FileBarChart, path: '/admin/reports', color: 'bg-purple-600', module: 'all' },
    { label: 'Official Duty', icon: MapPin, path: '/admin/official-duty', color: 'bg-pink-600', module: 'odModuleEnabled' },
    { label: 'Leave Management', icon: Calendar, path: '/admin/leave', color: 'bg-teal-600', module: 'leaveModuleEnabled' },
    { label: 'Support Management', icon: Headset, path: '/admin/support-management', color: 'bg-orange-600', module: 'supportModuleEnabled' },
    { label: 'Settings', icon: Settings, path: '/admin/settings', color: 'bg-gray-700', module: 'all' },
  ].filter(item => item.module === 'all' || appSettings[item.module] !== false);`);

fs.writeFileSync('src/components/AdminDashboardScreen.tsx', content);
