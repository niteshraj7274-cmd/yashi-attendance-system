import fs from 'fs';
let content = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');

content = content.replace(
  "import { LogOut, Users, Building2, CalendarCheck, FileBarChart, Settings, Headset, UserCircle, MapPin, Calendar, AlertTriangle } from 'lucide-react';",
  "import { LogOut, Users, Building2, CalendarCheck, FileBarChart, Settings, Headset, UserCircle, MapPin, Calendar, AlertTriangle, RefreshCw } from 'lucide-react';\nimport { useSync } from './SyncContext';"
);

content = content.replace(
  "const navigate = useNavigate();",
  "const navigate = useNavigate();\n  const { syncData, isSyncing } = useSync();"
);

content = content.replace(
  `<button onClick={() => navigate('/support')} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600">
              <Headset size={16} />
            </button>`,
  `<button onClick={syncData} disabled={isSyncing} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600 relative group">
              <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
              <div className="absolute top-10 right-0 w-32 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Smart Sync System
              </div>
            </button>
            <button onClick={() => navigate('/support')} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-700 transition-colors border border-emerald-600">
              <Headset size={16} />
            </button>`
);

fs.writeFileSync('src/components/AdminDashboardScreen.tsx', content);
