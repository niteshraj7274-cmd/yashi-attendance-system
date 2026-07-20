import fs from 'fs';
let content = fs.readFileSync('src/components/AdminLoginScreen.tsx', 'utf8');

content = content.replace(
  "import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';",
  "import { ArrowLeft, ShieldCheck, Lock, RefreshCw } from 'lucide-react';\nimport { useSync } from './SyncContext';"
);

content = content.replace(
  "const [error, setError] = useState('');",
  "const [error, setError] = useState('');\n  const { syncData, isSyncing } = useSync();"
);

content = content.replace(
  `        <div>
          <h1 className="text-xl font-bold tracking-tight">Admin Login</h1>
          <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Secure Management Portal</p>
        </div>
      </div>`,
  `        <div className="flex-1">
          <h1 className="text-xl font-bold tracking-tight">Admin Login</h1>
          <p className="text-[10px] text-emerald-200 uppercase tracking-widest mt-0.5">Secure Management Portal</p>
        </div>
        <button onClick={syncData} disabled={isSyncing} className="p-2 bg-emerald-800 rounded-lg hover:bg-emerald-600 transition-colors border border-emerald-500 relative group">
          <RefreshCw size={20} className={isSyncing ? 'animate-spin' : ''} />
          <div className="absolute top-12 right-0 w-32 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            Smart Sync System
          </div>
        </button>
      </div>`
);

fs.writeFileSync('src/components/AdminLoginScreen.tsx', content);
