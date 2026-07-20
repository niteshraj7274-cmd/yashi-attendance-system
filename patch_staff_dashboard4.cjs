const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const geoCheck1 = `    if (!navigator.geolocation) {
       alert("Location permission is required.");
       setLocationLoading(false);
       return;
    }`;
const newGeoCheck1 = `    if (!navigator.geolocation) {
       sendCenterNotification(centerInfo?.id || '', centerInfo?.code || '', 'GPS Disabled', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', type, 'Geolocation not supported', 0);
       alert("Location permission is required.");
       setLocationLoading(false);
       return;
    }`;
if (!code.includes("Geolocation not supported")) {
    code = code.replace(geoCheck1, newGeoCheck1);
}

const geoCheck2 = `      if (!navigator.geolocation) {
        alert("Location permission is required.");
        setLocationLoading(false);
        return;
      }`;
const newGeoCheck2 = `      if (!navigator.geolocation) {
        sendCenterNotification(centerInfo?.id || '', centerInfo?.code || '', 'GPS Disabled', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', type, 'Geolocation not supported', 0);
        alert("Location permission is required.");
        setLocationLoading(false);
        return;
      }`;
if (code.includes(geoCheck2)) {
    code = code.replace(geoCheck2, newGeoCheck2);
}

const geoError = `        (error) => {
          alert("Location permission is required.");
          setLocationLoading(false);
        }`;
const newGeoError = `        (error) => {
          sendCenterNotification(centerInfo?.id || '', centerInfo?.code || '', 'GPS Disabled', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', type, error.message || 'Permission denied', 0);
          alert("Location permission is required.");
          setLocationLoading(false);
        }`;
if (!code.includes("error.message || 'Permission denied'")) {
    code = code.replace(geoError, newGeoError);
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
