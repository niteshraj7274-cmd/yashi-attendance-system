const fs = require('fs');

let content = fs.readFileSync('src/components/AdminSalaryDashboardScreen.tsx', 'utf-8');
console.log(content.length);
