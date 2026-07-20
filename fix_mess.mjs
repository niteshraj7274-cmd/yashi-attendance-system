import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// I will look for the part starting from the new replacement till the Dashboard Status.
const startIndex = content.indexOf('<div className="w-full bg-white border border-slate-200 rounded-xl p-4 flex flex-col shadow-sm">');
const endIndex = content.indexOf('{/* Dashboard Status */}');

if (startIndex !== -1 && endIndex !== -1) {
  const goodReplacement = `        <div className="w-full bg-white border border-slate-200 rounded-xl p-4 flex flex-col shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {offlineRecords.length === 0 ? (
                <>
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <h3 className="font-bold text-sm text-emerald-700 uppercase">Synced</h3>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} className={offlineRecords.some(r => r.status === 'Sync Failed') ? 'text-red-500' : 'text-amber-500'} />
                  <h3 className={\`font-bold text-sm uppercase \${offlineRecords.some(r => r.status === 'Sync Failed') ? 'text-red-700' : 'text-amber-700'}\`}>
                    {offlineRecords.some(r => r.status === 'Sync Failed') ? 'Sync Failed' : 'Pending Sync'} ({offlineRecords.length})
                  </h3>
                </>
              )}
            </div>
            
            <button 
              onClick={syncData}
              disabled={isSyncing || !navigator.onLine || offlineRecords.length === 0}
              className={\`px-3 py-1.5 font-bold rounded-lg text-xs uppercase tracking-wider transition-all shadow-sm \${
                offlineRecords.length === 0 ? 'bg-slate-100 text-slate-400' : 
                'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'
              }\`}
            >
              {isSyncing ? 'Syncing...' : 'Sync Now'}
            </button>
          </div>
          
          {offlineRecords.length > 0 && (
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-slate-100">
              {offlineRecords.map(r => (
                <div key={r.id} className="text-xs bg-slate-50 p-2 rounded border border-slate-200 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-700">{r.type}</span> - {new Date(r.timestamp).toLocaleTimeString()}
                  </div>
                  <span className={\`font-bold \${r.status === 'Sync Failed' ? 'text-red-500' : 'text-amber-500'}\`}>
                    {r.status === 'Sync Failed' ? '❌ Failed' : '⏳ Pending'}
                  </span>
                </div>
              ))}
              {!navigator.onLine && (
                <p className="text-[10px] text-amber-600 font-medium text-center mt-1">Internet connection required to sync.</p>
              )}
            </div>
          )}
        </div>
`;
  content = content.substring(0, startIndex) + goodReplacement + content.substring(endIndex);
  fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
}
