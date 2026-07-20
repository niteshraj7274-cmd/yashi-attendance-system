import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

const importRegex = /import AdminSettingsScreen from '\.\/components\/AdminSettingsScreen';/;
content = content.replace(importRegex, "import AdminSettingsScreen from './components/AdminSettingsScreen';\nimport AdminLiveMonitorScreen from './components/AdminLiveMonitorScreen';");

const routeRegex = /<Route path="\/admin\/settings" element={<AdminSettingsScreen \/>} \/>/;
content = content.replace(routeRegex, `<Route path="/admin/settings" element={<AdminSettingsScreen />} />
          <Route path="/admin/live-monitor" element={<AdminLiveMonitorScreen />} />`);

fs.writeFileSync('src/App.tsx', content);
