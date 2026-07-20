import fs from 'fs';
let content = fs.readFileSync('src/components/CentreLoginScreen.tsx', 'utf8');

content = content.replace(
  "import { ArrowLeft, Building2, Lock, ChevronDown } from 'lucide-react';",
  "import { ArrowLeft, Building2, Lock, ChevronDown, RefreshCw } from 'lucide-react';\nimport { useSync } from './SyncContext';"
);

content = content.replace(
  "const [error, setError] = useState('');",
  "const [error, setError] = useState('');\n  const { syncData, isSyncing } = useSync();"
);

content = content.replace(
  `        <div>
          <h1 className="text-xl font-bold tracking-tight uppercase">Centre Client Login</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Access your center dashboard</p>
        </div>
      </div>`,
  `        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight uppercase">Centre Client Login</h1>
          <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Access your center dashboard</p>
        </div>
        <button onClick={syncData} disabled={isSyncing} className="p-2 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors border border-blue-600 relative group">
          <RefreshCw size={20} className={isSyncing ? 'animate-spin' : ''} />
          <div className="absolute top-12 right-0 w-32 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            Smart Sync System
          </div>
        </button>
      </div>`
);

fs.writeFileSync('src/components/CentreLoginScreen.tsx', content);
