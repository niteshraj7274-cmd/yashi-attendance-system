import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('const AdminLiveMonitorScreen = lazy(')) {
  const exportIndex = content.indexOf('export default function App() {');
  content = content.substring(0, exportIndex) + "const AdminLiveMonitorScreen = lazy(() => import('./components/AdminLiveMonitorScreen'));\nconst AdminNotificationsScreen = lazy(() => import('./components/AdminNotificationsScreen'));\n" + content.substring(exportIndex);
  fs.writeFileSync('src/App.tsx', content);
}
