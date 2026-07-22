const fs = require('fs');
let code = fs.readFileSync('src/utils/offlineSync.ts', 'utf8');

code = code.replace(
  `      } else {
         // OUT record
         targetDocId = \`\${record.data.staffUid}_\${record.data.Date || record.data.date}\`;`,
  `      } else {
         // OUT record
         targetDocId = record.attendanceDocId;
         if (!targetDocId || targetDocId.startsWith('local_')) {
            targetDocId = \`\${record.data.staffUid}_\${record.data.Date || record.data.date}\`;
         }`
);

fs.writeFileSync('src/utils/offlineSync.ts', code);
