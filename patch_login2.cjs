const fs = require('fs');
let content = fs.readFileSync('src/components/CentreLoginScreen.tsx', 'utf-8');

// If device is registered and has centerId, we could pre-select it or just hide the selector
const replaceCenter = `  useEffect(() => {
    if (deviceData?.centerId) {
      setSelectedCenter(deviceData.centerId);
    }
  }, [deviceData]);`;
  
content = content.replace(/  const \{ syncData, isSyncing \} = useSync\(\);/, '  const { syncData, isSyncing } = useSync();\n' + replaceCenter);

fs.writeFileSync('src/components/CentreLoginScreen.tsx', content);
