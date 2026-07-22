const fs = require('fs');
let code = fs.readFileSync('src/components/AppUpdateManager.tsx', 'utf8');
code = code.replace("style={{ width: \\`\\${progress}%\\` }}", "style={{ width: `${progress}%` }}");
fs.writeFileSync('src/components/AppUpdateManager.tsx', code);
console.log('Fixed syntax error');
