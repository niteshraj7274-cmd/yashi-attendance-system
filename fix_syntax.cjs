const fs = require('fs');

let file = '/app/applet/src/components/AdminPinManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  `} else {
        updateData.profPinEnabled = profPinEnabled;
        if (input) updateData.profPinHash = await hashPin(input);
      } else if (type === 'report') {`,
  `} else if (type === 'prof') {
        updateData.profPinEnabled = profPinEnabled;
        if (input) updateData.profPinHash = await hashPin(input);
      } else if (type === 'report') {`
);

fs.writeFileSync(file, code);
