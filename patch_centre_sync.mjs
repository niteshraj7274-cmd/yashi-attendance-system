import fs from 'fs';
let content = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

content = content.replace(
  "import {  ArrowLeft, MapPin, Users, UserCircle, Lock, X , Headset, Calendar } from 'lucide-react';",
  "import {  ArrowLeft, MapPin, Users, UserCircle, Lock, X , Headset, Calendar, RefreshCw } from 'lucide-react';\nimport { useSync } from './SyncContext';"
);

content = content.replace(
  "const { centerId } = useParams();",
  "const { centerId } = useParams();\n  const { syncData, isSyncing } = useSync();"
);

content = content.replace(
  `{appSettings.supportModuleEnabled !== false && (<button onClick={() => navigate('/support')} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
          <Headset size={20} />
        </button>)}`,
  `<button onClick={syncData} disabled={isSyncing} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600 relative group">
          <RefreshCw size={20} className={isSyncing ? 'animate-spin' : ''} />
          <div className="absolute top-12 right-0 w-32 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            Smart Sync System
          </div>
        </button>
        {appSettings.supportModuleEnabled !== false && (<button onClick={() => navigate('/support')} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600">
          <Headset size={20} />
        </button>)}`
);

fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', content);
