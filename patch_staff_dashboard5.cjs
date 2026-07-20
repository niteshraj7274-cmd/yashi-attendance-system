const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const offlineCheck = `  const processSelfieLocationAttendance = async (type: 'IN' | 'OUT', photoDataUrl: string) => {
    setLocationLoading(true);
    setAttendanceType(type);
    
    if (!navigator.geolocation) {`;
const newOfflineCheck = `  const processSelfieLocationAttendance = async (type: 'IN' | 'OUT', photoDataUrl: string) => {
    if (!navigator.onLine) {
        sendCenterNotification(centerInfo?.id || '', centerInfo?.code || '', 'Internet Disconnected During Attendance', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', type, 'User is offline', 0);
    }
    setLocationLoading(true);
    setAttendanceType(type);
    
    if (!navigator.geolocation) {`;
if (!code.includes("Internet Disconnected During Attendance")) {
    code = code.replace(offlineCheck, newOfflineCheck);
}

const geoErrorProcessSelfie = `      (error) => {
         let errorMsg = "Location permission is required.";
         if (error.code === error.PERMISSION_DENIED) errorMsg = "Location permission denied by browser.";
         else if (error.code === error.POSITION_UNAVAILABLE) errorMsg = "Location position unavailable.";
         else if (error.code === error.TIMEOUT) errorMsg = "Location request timed out.";
         alert(errorMsg);
         setLocationLoading(false);
      },`;
const newGeoErrorProcessSelfie = `      (error) => {
         sendCenterNotification(centerInfo?.id || '', centerInfo?.code || '', 'GPS Disabled', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', type, error.message || 'Permission denied', 0);
         let errorMsg = "Location permission is required.";
         if (error.code === error.PERMISSION_DENIED) errorMsg = "Location permission denied by browser.";
         else if (error.code === error.POSITION_UNAVAILABLE) errorMsg = "Location position unavailable.";
         else if (error.code === error.TIMEOUT) errorMsg = "Location request timed out.";
         alert(errorMsg);
         setLocationLoading(false);
      },`;
if (!code.includes("sendCenterNotification(centerInfo?.id || '', centerInfo?.code || '', 'GPS Disabled', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', type, error.message || 'Permission denied', 0);") && code.includes(geoErrorProcessSelfie)) {
    code = code.replace(geoErrorProcessSelfie, newGeoErrorProcessSelfie);
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
