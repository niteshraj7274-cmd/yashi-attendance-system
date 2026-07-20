const fs = require('fs');
const path = 'src/components/StaffDashboardScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

// The block to replace:
//        try {
//          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
//          const data = await res.json();
//          if (data.display_name) address = data.display_name;
//        } catch (err) {}

const searchStr = `        try {
          const res = await fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${latitude}&lon=\${longitude}\`);
          const data = await res.json();
          if (data.display_name) address = data.display_name;
        } catch (err) {}`;

const replaceStr = `        // Fetch address in background to avoid blocking submission
        fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${latitude}&lon=\${longitude}\`)
          .then(res => res.json())
          .then(data => {
            if (data.display_name) {
               console.log("Address fetched in background:", data.display_name);
               // Future improvement: update the record in Firestore with the address
            }
          })
          .catch(() => {});`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log("Successfully replaced Nominatim block.");
} else {
  console.log("Could not find Nominatim block.");
}
