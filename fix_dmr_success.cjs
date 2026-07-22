const fs = require('fs');
let code = fs.readFileSync('src/components/DmrFillScreen.tsx', 'utf8');

code = code.replace(
  `alert('Report submitted successfully!');`,
  `alert('Daily Mobilization Report submitted successfully.');`
);

fs.writeFileSync('src/components/DmrFillScreen.tsx', code);
