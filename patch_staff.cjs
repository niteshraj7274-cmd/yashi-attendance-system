const fs = require('fs');
let content = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

const oldCheck = `    try {
      if (!formData.centerId) {
        setError('Please select a center.');
        setSaving(false);
        return;
      }`;

const newCheck = `    try {
      if (!formData.centerId) {
        setError('Please select a center.');
        setSaving(false);
        return;
      }
      
      const idQuery = query(collection(db, 'staff'), where('staffId', '==', formData.staffId));
      const idSnapshot = await getDocs(idQuery);
      const duplicate = idSnapshot.docs.find(d => d.id !== editingId);
      if (duplicate) {
        setError('Staff Code already exists. Must be unique.');
        setSaving(false);
        return;
      }`;

content = content.replace(oldCheck, newCheck);
fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', content);
