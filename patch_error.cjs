const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const oldErr = `      (error) => {
         alert("Location permission is required.");
         setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }`;

const newErr = `      (error) => {
         let errorMsg = "Location permission is required.";
         if (error.code === error.PERMISSION_DENIED) errorMsg = "Location permission denied by browser.";
         else if (error.code === error.POSITION_UNAVAILABLE) errorMsg = "Location position unavailable.";
         else if (error.code === error.TIMEOUT) errorMsg = "Location request timed out.";
         alert(errorMsg);
         setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }`;

code = code.replace(oldErr, newErr);
fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
