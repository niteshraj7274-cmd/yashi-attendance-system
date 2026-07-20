const fs = require('fs');
let content = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');

const importMatch = `import { db } from '../firebase';`;
const newImport = `import { db } from '../firebase';
import { logAuditActivity } from '../utils/auditHelpers';`;

if (!content.includes('logAuditActivity')) {
  content = content.replace(importMatch, newImport);
}

const updateMatch = `if (editingId) {
        await updateDoc(doc(db, 'centers', editingId), dataToSave);
        setShowForm(false);
        setEditingId(null);
        fetchCenters();
      }`;

const newUpdateMatch = `if (editingId) {
        const oldCenter = centers.find(c => c.id === editingId);
        await updateDoc(doc(db, 'centers', editingId), dataToSave);
        
        // Log changes
        const adminStr = localStorage.getItem('userSession');
        let adminName = 'Admin';
        if (adminStr) {
          try {
            const adminData = JSON.parse(atob(adminStr));
            adminName = adminData.name || 'Admin';
          } catch(e) {}
        }
        
        let diffs = [];
        if (oldCenter?.name !== dataToSave.name) diffs.push(\`Name: \${oldCenter?.name || ''} -> \${dataToSave.name}\`);
        if (oldCenter?.status !== dataToSave.status) diffs.push(\`Status: \${oldCenter?.status || ''} -> \${dataToSave.status}\`);
        if (oldCenter?.geofenceRadius !== dataToSave.geofenceRadius) diffs.push(\`Radius: \${oldCenter?.geofenceRadius || ''} -> \${dataToSave.geofenceRadius}\`);
        if (oldCenter?.latitude !== dataToSave.latitude || oldCenter?.longitude !== dataToSave.longitude) diffs.push(\`GPS updated\`);
        
        if (diffs.length > 0) {
          logAuditActivity(adminName, 'Center', dataToSave.name, 'Updated Center', diffs.join(', '));
        }

        setShowForm(false);
        setEditingId(null);
        fetchCenters();
      }`;

content = content.replace(updateMatch, newUpdateMatch);

fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', content);
