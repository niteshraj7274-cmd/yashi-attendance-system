const fs = require('fs');
let content = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');

const oldSearch = `  const filteredCenters = centers.filter(c => 
    (c.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (c.code || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.district || '').toLowerCase().includes(searchTerm.toLowerCase())
  );`;

const newSearch = `  const filteredCenters = centers.filter(c => {
    const term = searchTerm.toLowerCase();
    return (
      (c.name || '').toLowerCase().includes(term) ||
      (c.code || '').toLowerCase().includes(term) ||
      (c.district || '').toLowerCase().includes(term) ||
      (c.block || '').toLowerCase().includes(term) ||
      (c.status || '').toLowerCase().includes(term)
    );
  });`;

content = content.replace(oldSearch, newSearch);
fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', content);
