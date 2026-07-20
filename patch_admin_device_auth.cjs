const fs = require('fs');
const path = 'src/components/AdminDeviceManagementScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "useEffect(() => {",
  `useEffect(() => {
    const sessionStr = localStorage.getItem('userSession');
    if (!sessionStr) {
      navigate('/admin-login');
      return;
    }
    try {
      const session = JSON.parse(sessionStr);
      if (session.role !== 'admin') {
        navigate('/admin-login');
        return;
      }
    } catch(e) {
      navigate('/admin-login');
      return;
    }
`
);

fs.writeFileSync(path, content);
