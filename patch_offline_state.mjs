import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

if (!content.includes('const [offlineRecords, setOfflineRecords] = useState(getOfflineRecords());')) {
  content = content.replace(
    /const \[submitting, setSubmitting\] = useState\(false\);/,
    "const [submitting, setSubmitting] = useState(false);\n  const [offlineRecords, setOfflineRecords] = useState(getOfflineRecords());\n  const [isSyncing, setIsSyncing] = useState(false);\n\n  useEffect(() => {\n    const handleOnline = () => {\n      syncData();\n    };\n    window.addEventListener('online', handleOnline);\n    // Polling to update offline records state\n    const interval = setInterval(() => setOfflineRecords(getOfflineRecords()), 2000);\n    return () => {\n      window.removeEventListener('online', handleOnline);\n      clearInterval(interval);\n    };\n  }, []);\n\n  const syncData = async () => {\n    if (!navigator.onLine) { alert('You are offline. Please connect to internet to sync.'); return; }\n    setIsSyncing(true);\n    const success = await syncOfflineRecords();\n    setOfflineRecords(getOfflineRecords());\n    setIsSyncing(false);\n    if (success) {\n      alert('Sync completed successfully!');\n    } else {\n      alert('Some records failed to sync. Please try again.');\n    }\n  };\n"
  );
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
