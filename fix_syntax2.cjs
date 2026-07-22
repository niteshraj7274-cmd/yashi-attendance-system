const fs = require('fs');

let file = '/app/applet/src/components/AdminPinManagement.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  `} else {
      setProfPinInput(randomPin);
      setProfPinConfirm(randomPin);
    } else if (type === 'report') {`,
  `} else if (type === 'prof') {
      setProfPinInput(randomPin);
      setProfPinConfirm(randomPin);
    } else if (type === 'report') {`
);

fs.writeFileSync(file, code);
