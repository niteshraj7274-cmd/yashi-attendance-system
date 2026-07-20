const fs = require('fs');
const path = 'src/components/StaffDashboardScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

const searchStr = `          try {
            const res = await fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${latitude}&lon=\${longitude}\`);
            const data = await res.json();
            if (data.display_name) address = data.display_name;
          } catch (err) {}`;

const replaceStr = `          // Fetch address in background to avoid blocking submission
          fetch(\`https://nominatim.openstreetmap.org/reverse?format=json&lat=\${latitude}&lon=\${longitude}\`)
            .then(res => res.json())
            .then(data => {
              if (data.display_name) console.log("Address fetched:", data.display_name);
            }).catch(() => {});`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync(path, content);
  console.log("Successfully replaced second Nominatim block.");
} else {
  console.log("Could not find second Nominatim block.");
}
