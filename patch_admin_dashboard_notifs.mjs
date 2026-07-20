import fs from 'fs';
let content = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');

const importRegex = /import \{ LogOut, Building2, Users, AlertTriangle, FileBarChart, MapPin, Calendar, Headset, Settings, UserCircle, MonitorPlay \} from 'lucide-react';/;
content = content.replace(importRegex, "import { LogOut, Building2, Users, AlertTriangle, FileBarChart, MapPin, Calendar, Headset, Settings, UserCircle, MonitorPlay, Bell } from 'lucide-react';");

const buttonsRegex = /<button onClick=\{\(\) => navigate\('\/support'\)\} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600">/;
content = content.replace(buttonsRegex, `<button onClick={() => navigate('/admin/notifications')} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600 relative">
              <Bell size={16} />
              <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full"></span>
            </button>
            <button onClick={() => navigate('/support')} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600">`);

fs.writeFileSync('src/components/AdminDashboardScreen.tsx', content);
