const fs = require('fs');
let code = fs.readFileSync('src/components/AdminStaffFormScreen.tsx', 'utf8');

code = code.replace(
  /      \}, \[id, isEdit, navigate\]\);/g,
  `    return () => {
      if (unsubscribeCenters) unsubscribeCenters();
    };
  }, [id, isEdit, navigate]);`
);
fs.writeFileSync('src/components/AdminStaffFormScreen.tsx', code);
