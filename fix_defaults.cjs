const fs = require('fs');
let code = fs.readFileSync('src/components/AdminDmrSettingsScreen.tsx', 'utf8');
code = code.replace(
  `{ id: uuidv4(), name: "Allotment", visible: true, order: 1, autoFetch: false },
              { id: uuidv4(), name: "Re-Admission", visible: true, order: 2, autoFetch: false },
              { id: uuidv4(), name: "DRCC Verification", visible: true, order: 3, autoFetch: false },
              { id: uuidv4(), name: "Line-up", visible: true, order: 4, autoFetch: false }`,
  `{ id: uuidv4(), name: "Allotment", visible: true, order: 1, autoFetch: false },
              { id: uuidv4(), name: "DRCC Verification", visible: true, order: 2, autoFetch: false },
              { id: uuidv4(), name: "Line-up", visible: true, order: 3, autoFetch: false },
              { id: uuidv4(), name: "Remarks", visible: true, order: 4, autoFetch: false }`
);
fs.writeFileSync('src/components/AdminDmrSettingsScreen.tsx', code);
