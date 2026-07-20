import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const importRegex = /import AdminLiveMonitorScreen from '\.\/components\/AdminLiveMonitorScreen';/;
content = content.replace(importRegex, "import AdminLiveMonitorScreen from './components/AdminLiveMonitorScreen';\nimport AdminNotificationsScreen from './components/AdminNotificationsScreen';");

const routeRegex = /<Route path="\/admin\/live-monitor" element={<AdminLiveMonitorScreen \/>} \/>/;
content = content.replace(routeRegex, `<Route path="/admin/live-monitor" element={<AdminLiveMonitorScreen />} />
          <Route path="/admin/notifications" element={<AdminNotificationsScreen />} />`);

fs.writeFileSync('src/App.tsx', content);
