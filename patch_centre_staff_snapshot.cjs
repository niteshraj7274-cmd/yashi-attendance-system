const fs = require('fs');
const path = 'src/components/CentreStaffSelectionScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  `let unSubStaff: any;
    let unSubSettings: any;`,
  `let unSubStaff: any;
    let unSubSettings: any;
    let unSubAtt: any;`
);

content = content.replace(
  `const unsubAtt = onSnapshot(attQ, (snap) => {`,
  `unSubAtt = onSnapshot(attQ, (snap) => {`
);

content = content.replace(
  `// unsubAtt is handled implicitly or we can store it, let's just ignore for now to avoid refactoring let scope... wait, I'll fix it if needed.`,
  `if (unSubAtt) unSubAtt();`
);

fs.writeFileSync(path, content);
