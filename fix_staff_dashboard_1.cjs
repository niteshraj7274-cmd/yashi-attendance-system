const fs = require('fs');

let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

if (!code.includes('const [attendanceMode')) {
  code = code.replace(
    /const \[staffData, setStaffData\] = useState<any>\(null\);/,
    "const [staffData, setStaffData] = useState<any>(null);\n  const [attendanceMode, setAttendanceMode] = useState<'gps' | 'selfie' | 'gps_selfie'>('gps_selfie');"
  );
}

if (!code.includes("doc(db, 'settings', 'system')")) {
  code = code.replace(
    /useEffect\(\(\) => \{\s*const sessionStr = localStorage\.getItem\('userSession'\);/,
    `useEffect(() => {
    const unsubSettings = onSnapshot(doc(db, 'settings', 'system'), (docSnap) => {
      if (docSnap.exists()) {
        const mode = docSnap.data().attendanceMode;
        if (mode) setAttendanceMode(mode);
      }
    });
    return () => unsubSettings();
  }, []);

  useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');`
  );
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
