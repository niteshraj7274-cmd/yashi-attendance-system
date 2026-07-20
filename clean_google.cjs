const fs = require('fs');
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

content = content.replace(/'OUT Google Maps Link': googleMapsLink,/g, "");
content = content.replace(/let googleMapsLink = '';/g, "");
content = content.replace(/googleMapsLink = '';/g, "");
content = content.replace(/, googleMapsLink: string/g, "");
content = content.replace(/, googleMapsLink/g, "");
content = content.replace(/googleMapsLink: '',/g, "");

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
