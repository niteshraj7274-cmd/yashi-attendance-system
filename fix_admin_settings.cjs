const fs = require('fs');
let code = fs.readFileSync('src/components/AdminSettingsScreen.tsx', 'utf8');

code = code.replace("mandatoryFingerprint: centerDashboardViewSearchFilter,", "mandatoryFingerprint,");

fs.writeFileSync('src/components/AdminSettingsScreen.tsx', code);
