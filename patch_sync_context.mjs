import fs from 'fs';
let content = fs.readFileSync('src/components/SyncContext.tsx', 'utf8');

content = content.replace(
  "const [lastSync, setLastSync] = useState<Date | null>(null);",
  "const [lastSync, setLastSync] = useState<Date | null>(null);\n  const [syncStatus, setSyncStatus] = useState<{status: 'idle' | 'success' | 'failed', message: string, records: number}>({status: 'idle', message: '', records: 0});"
);

content = content.replace(
  `for (const collName of collectionsToSync) {
        await getDocs(collection(db, collName));
      }`,
  `let totalRecords = 0;
      for (const collName of collectionsToSync) {
        const snap = await getDocs(collection(db, collName));
        totalRecords += snap.size;
      }
      setSyncStatus({status: 'success', message: 'Sync completed successfully', records: totalRecords});
      setTimeout(() => setSyncStatus(prev => ({...prev, status: 'idle'})), 5000);`
);

content = content.replace(
  `console.error("Sync error:", error);`,
  `console.error("Sync error:", error);\n      setSyncStatus({status: 'failed', message: 'Sync failed: ' + (error as Error).message, records: 0});\n      setTimeout(() => setSyncStatus(prev => ({...prev, status: 'idle'})), 5000);`
);

content = content.replace(
  `{isSyncing && (
        <div className="fixed top-0 left-0 w-full h-1 z-50 overflow-hidden bg-blue-100">
          <div className="h-full bg-blue-600 animate-[sync-progress_2s_ease-in-out_infinite] w-1/3 rounded"></div>
        </div>
      )}`,
  `{isSyncing && (
        <div className="fixed top-0 left-0 w-full h-1 z-50 overflow-hidden bg-blue-100">
          <div className="h-full bg-blue-600 animate-sync-progress w-1/3 rounded"></div>
        </div>
      )}
      {syncStatus.status !== 'idle' && (
        <div className={\`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full shadow-lg text-xs font-bold uppercase tracking-wider text-white transition-all \${syncStatus.status === 'success' ? 'bg-emerald-600' : 'bg-red-600'}\`}>
          {syncStatus.status === 'success' ? \`Synced \${syncStatus.records} records (\${new Date().toLocaleTimeString()})\` : syncStatus.message}
        </div>
      )}`
);

fs.writeFileSync('src/components/SyncContext.tsx', content);
