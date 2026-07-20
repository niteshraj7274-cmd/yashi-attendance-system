const fs = require('fs');
const path = 'src/components/CentreStaffSelectionScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes("localStorage.getItem('centreSession')")) {
  console.log("No centreSession found! Fixing...");
}

content = content.replace(
  "useEffect(() => {",
  `useEffect(() => {
    const sessionStr = localStorage.getItem('centreSession');
    if (!sessionStr) {
      navigate('/centre-login');
      return;
    }
    try {
      const session = JSON.parse(sessionStr);
      if (session.centerId !== centerId) {
        navigate('/centre-login');
        return;
      }
    } catch(e) {
      navigate('/centre-login');
      return;
    }
`
);

fs.writeFileSync(path, content);
