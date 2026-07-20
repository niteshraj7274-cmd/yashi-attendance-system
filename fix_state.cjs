const fs = require('fs');
let content = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');

content = content.replace(
  'const [loading, setLoading] = useState(true);',
  'const [loading, setLoading] = useState(true);\n  const [locationLoading, setLocationLoading] = useState(false);'
);

fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', content);
