import fs from 'fs';
let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

content = content.replace(
  /\(\s*error\s*\)\s*=>\s*\{\s*console\.error\("Live location error:",\s*error\);\s*\}/,
  "(error) => { if (error.code !== 3) { console.warn('Location watch warning:', error.message); } }"
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
