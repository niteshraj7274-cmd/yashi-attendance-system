const fs = require('fs');
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

content = content.replace(
  /const isOutside = distance > \(Number\(centerInfo\?\.geofenceRadius\) \|\| 300\);\s*if \(isOutside && !isOfficialDuty\) \{\s*alert\(`You are Outside Centre Geofence \(\$\{Math\.round\(distance\)\}m\)\. Your attendance will be marked as 'Outside Geofence' and needs admin approval\.`\);\s*\}/,
  `const isOutside = distance > (Number(centerInfo?.geofenceRadius) || 300);
        if (isOutside && !isOfficialDuty) {
          alert("You are outside the Center Geofence.");
          setLocationLoading(false);
          return;
        }`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
