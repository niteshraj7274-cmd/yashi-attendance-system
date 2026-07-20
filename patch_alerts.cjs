const fs = require('fs');
let content = fs.readFileSync('src/components/AdminOutsideAlertsScreen.tsx', 'utf-8');

content = content.replace(
  /<img loading="lazy" src=\{selectedAlert\['Selfie URL'\]\} alt="Selfie" className="w-full h-full object-cover" \/>/,
  '<a href={selectedAlert[\'Selfie URL\']} target="_blank" rel="noopener noreferrer"><img loading="lazy" src={selectedAlert[\'Selfie URL\']} alt="Selfie" className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer" /></a>'
);

fs.writeFileSync('src/components/AdminOutsideAlertsScreen.tsx', content);
console.log("AdminOutsideAlertsScreen patched");
