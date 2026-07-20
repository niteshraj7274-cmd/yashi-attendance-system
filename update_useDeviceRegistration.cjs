const fs = require('fs');
const path = 'src/hooks/useDeviceRegistration.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
`      if (docSnap.exists() && docSnap.data().status === 'Active') {
        setIsRegistered(true);
        setDeviceData(docSnap.data());
      } else {
        setIsRegistered(false);
        setDeviceData(null);
      }`,
`      if (docSnap.exists()) {
        const data = docSnap.data();
        setIsRegistered(data.status === 'Active');
        setDeviceData(data);
      } else {
        setIsRegistered(false);
        setDeviceData(null);
      }`
);

fs.writeFileSync(path, content);
