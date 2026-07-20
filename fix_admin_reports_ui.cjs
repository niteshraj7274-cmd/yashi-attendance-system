const fs = require('fs');
let content = fs.readFileSync('src/components/AdminReportsScreen.tsx', 'utf8');

const replacement = `                <div className="mt-3 flex flex-col gap-2">
                  <span className={\`text-[10px] self-start uppercase tracking-wider font-bold px-2 py-1 rounded border \${record.syncStatus === "Sync Failed" ? "bg-red-50 text-red-600 border-red-200" : record.syncStatus === "Offline Saved" ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"}\`}>
                    Sync Status: {record.syncStatus || "Synced"}
                  </span>
                  
                  <div className="flex gap-4 text-xs mt-1 border-t border-slate-100 pt-2">
                    <div><span className="font-bold text-slate-500">LAT:</span> {record['Current Latitude'] ?? record['Latitude'] ?? record['GPS Latitude'] ?? 'N/A'}</div>
                    <div><span className="font-bold text-slate-500">LNG:</span> {record['Current Longitude'] ?? record['Longitude'] ?? record['GPS Longitude'] ?? 'N/A'}</div>
                  </div>
                </div>`;

content = content.replace(
  `                <div className="mt-3 flex items-center gap-2">\n                  <span className={\`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border \${record.syncStatus === "Sync Failed" ? "bg-red-50 text-red-600 border-red-200" : record.syncStatus === "Offline Saved" ? "bg-amber-50 text-amber-600 border-amber-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"}\`}>\n                    Sync Status: {record.syncStatus || "Synced"}\n                  </span>\n                </div>`,
  replacement
);

fs.writeFileSync('src/components/AdminReportsScreen.tsx', content);
