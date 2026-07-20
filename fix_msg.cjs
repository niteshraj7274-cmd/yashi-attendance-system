const fs = require('fs');
let code = fs.readFileSync('src/utils/validationHelpers.ts', 'utf8');

code = code.replace(
  /return \{ valid: false, message: \`Attendance has already been marked for this date\. Leave cannot be approved\.\` \};/,
  `if (requestType === 'Leave') {
          return { valid: false, message: 'Attendance has already been marked for this date. Leave cannot be approved.' };
        } else {
          return { valid: false, message: 'Attendance has already been marked for this date. Official Duty cannot be approved.' };
        }`
);

fs.writeFileSync('src/utils/validationHelpers.ts', code);
