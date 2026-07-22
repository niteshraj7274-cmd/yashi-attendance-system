const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `      if (snapshot) {
        snapshot.forEach((doc: any) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      });
      }`,
  `      if (snapshot) {
        snapshot.forEach((doc: any) => {
          requests.push({ id: doc.id, ...doc.data() });
        });
      }`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
