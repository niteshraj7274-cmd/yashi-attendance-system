const fs = require('fs');
try {
  require('@babel/parser').parse(fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf-8'), {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });
  console.log("Syntax is valid");
} catch(e) {
  console.log(e.message);
}
