import fs from 'fs';
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  /const session = JSON.parse(sessionStr);/g,
  `let session;
    try {
      session = JSON.parse(sessionStr);
    } catch(e) {
      localStorage.removeItem('userSession');
      navigate('/centre-login');
      return;
    }`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
