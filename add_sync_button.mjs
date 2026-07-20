import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

content = content.replace(
  "import { LogOut, Calendar, Clock, MapPin, CheckCircle2, Camera, X, Headset, AlertTriangle } from 'lucide-react';",
  "import { LogOut, Calendar, Clock, MapPin, CheckCircle2, Camera, X, Headset, AlertTriangle, RefreshCw } from 'lucide-react';"
);

content = content.replace(
  `<button onClick={() => navigate('/support')} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
              <Headset size={16} />
            </button>`,
  `<button onClick={syncData} disabled={isSyncing} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
              <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
            </button>
            <button onClick={() => navigate('/support')} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
              <Headset size={16} />
            </button>`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
