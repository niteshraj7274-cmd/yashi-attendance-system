const fs = require('fs');
let code = fs.readFileSync('src/components/AdminStaffFormScreen.tsx', 'utf8');
const lines = code.split('\n');
console.log(JSON.stringify(lines.slice(75, 85), null, 2));
