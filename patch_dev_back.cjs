const fs = require('fs');
const path = 'src/components/DeveloperSettingsScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  "onClick={() => navigate('/admin-dashboard')}",
  "onClick={() => navigate('/home')}"
);

fs.writeFileSync(path, content);
