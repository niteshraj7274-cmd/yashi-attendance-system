const fs = require('fs');

let file = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// Remove the standalone attendanceMode state
file = file.replace(/const \[attendanceMode, setAttendanceMode\] = useState<'gps' \| 'selfie' \| 'gps_selfie'>\('gps_selfie'\);\n?/, '');

// Remove the onSnapshot for settings/system that I added earlier
const systemSettingsBlock = `useEffect(() => {
    const unsubSettings = onSnapshot(doc(db, 'settings', 'system'), (docSnap) => {
      if (docSnap.exists()) {
        const mode = docSnap.data().attendanceMode;
        if (mode) setAttendanceMode(mode);
      }
    });
    return () => unsubSettings();
  }, []);`;
file = file.replace(systemSettingsBlock, '');

// Replace standalone attendanceMode with appSettings.attendanceMode OR appSettings.attendanceType just in case
file = file.replace(/attendanceMode ===/g, "(appSettings.attendanceMode || appSettings.attendanceType || 'gps_selfie') ===");

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', file);
