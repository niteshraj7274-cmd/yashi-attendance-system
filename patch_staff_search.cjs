const fs = require('fs');
let content = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

const oldSearch = `  const filteredStaff = staff.filter(s => 
    (s.name || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.staffId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.centerName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.designation || '').toLowerCase().includes(searchTerm.toLowerCase())
  );`;

const newSearch = `  const filteredStaff = staff.filter(s => {
    const term = searchTerm.toLowerCase();
    const c = centers.find(c => c.id === s.centerId) || {};
    return (
      (s.name || '').toLowerCase().includes(term) ||
      (s.staffId || '').toLowerCase().includes(term) ||
      (s.centerName || '').toLowerCase().includes(term) ||
      (s.centerCode || '').toLowerCase().includes(term) ||
      (s.designation || '').toLowerCase().includes(term) ||
      (s.status || '').toLowerCase().includes(term) ||
      (c.district || '').toLowerCase().includes(term) ||
      (c.block || '').toLowerCase().includes(term)
    );
  });`;

content = content.replace(oldSearch, newSearch);
fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', content);
