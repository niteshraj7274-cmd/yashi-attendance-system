const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `      (error) => {
         console.warn("Geolocation Error, trying IP fallback...", error);
         fetch('https://ipapi.co/json/')
           .then(res => res.json())
           .then(data => {
             if (data.latitude && data.longitude) {
               alert("Location detected via fallback. Please ensure GPS is enabled for accuracy.");
               // Recursive call or simply fake the position object and call the success block
               // But success block is inline, we cannot easily call it. 
               // For simplicity, we just alert the fallback message and we'll implement it inline.
               // Let's reload or something? No, we need to pass data to success.
             } else {
               throw new Error("Fallback failed");
             }
           })
           .catch(() => {
             console.error("Location error:", error);
             alert("Location Error: " + error.message);
           })
           .finally(() => {
             setSubmitting(false);
             setLocationLoading(false);
           });
      },`,
  `      (error) => {
         console.error("Location error:", error);
         alert("Location Error: " + error.message);
         setSubmitting(false);
         setLocationLoading(false);
      },`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
