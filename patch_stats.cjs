const fs = require('fs');
let content = fs.readFileSync('src/components/AdminDashboardScreen.tsx', 'utf8');

const regexBroken = /<div className="grid grid-cols-2 gap-2 mb-4">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const fix = `          <div className="grid grid-cols-2 gap-2 mb-4">
          </div>`;

content = content.replace(regexBroken, fix);
fs.writeFileSync('src/components/AdminDashboardScreen.tsx', content);
