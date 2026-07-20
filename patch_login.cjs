const fs = require('fs');
let content = fs.readFileSync('src/components/JobAdminLoginScreen.tsx', 'utf8');

content = content.replace(
  "await setDoc(doc(db, 'settings', 'jobAdminProfile'), { pin: '1234' }, { merge: true });",
  "// await setDoc(doc(db, 'settings', 'jobAdminProfile'), { pin: '1234' }, { merge: true });"
);

fs.writeFileSync('src/components/JobAdminLoginScreen.tsx', content);
