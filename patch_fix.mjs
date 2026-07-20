import fs from 'fs';
let content = fs.readFileSync('src/utils/offlineSync.ts', 'utf8');
content = content.replace(/\\`/g, "`").replace(/\\\$/g, "$");
fs.writeFileSync('src/utils/offlineSync.ts', content);
