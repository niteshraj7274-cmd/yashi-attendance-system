import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const syncUI = `
        {offlineRecords.length > 0 && (
          <div className="w-full bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center gap-2 text-amber-700">
              <AlertTriangle size={18} />
              <h3 className="font-bold text-sm uppercase">Offline Records Pending ({offlineRecords.length})</h3>
            </div>
            <div className="flex flex-col gap-2">
              {offlineRecords.map(r => (
                <div key={r.id} className="text-xs bg-white p-2 rounded border border-amber-100 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-700">{r.type}</span> - {new Date(r.timestamp).toLocaleTimeString()}
                  </div>
                  <span className={\`font-bold \${r.status === 'Sync Failed' ? 'text-red-500' : 'text-amber-500'}\`}>
                    {r.status === 'Sync Failed' ? '❌ Failed' : '⏳ Pending'}
                  </span>
                </div>
              ))}
            </div>
            <button 
              onClick={syncData}
              disabled={isSyncing || !navigator.onLine}
              className="w-full py-2 bg-amber-600 text-white font-bold rounded-lg text-sm uppercase tracking-wider hover:bg-amber-700 disabled:opacity-50 transition-all"
            >
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </button>
            {!navigator.onLine && (
              <p className="text-[10px] text-amber-600 text-center font-medium">Internet required to sync.</p>
            )}
          </div>
        )}
`;

content = content.replace(
  /<div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto pb-20">\s*/,
  `<div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto pb-20">\n${syncUI}`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
