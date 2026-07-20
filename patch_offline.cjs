const fs = require('fs');
let content = fs.readFileSync('src/utils/offlineSync.ts', 'utf-8');

content = content.replace(/finalData\['Selfie URL'\] = photoUrl;/g, "finalData['Selfie Image URL'] = photoUrl;");
content = content.replace(/finalData\['OUT Selfie URL'\] = photoUrl;/g, "finalData['OUT Selfie Image URL'] = photoUrl;");

fs.writeFileSync('src/utils/offlineSync.ts', content);
