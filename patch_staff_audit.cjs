const fs = require('fs');

let content = '';
try {
  content = fs.readFileSync('src/utils/auditHelpers.ts', 'utf8');
} catch(e) {
  content = `import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export const logAuditActivity = async (adminName, entityType, entityName, action, details) => {
  try {
    await addDoc(collection(db, 'audit_logs'), {
      adminName,
      entityType,
      staffName: entityName,
      action,
      details,
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.error('Audit Log Error:', err);
  }
};
`;
  fs.writeFileSync('src/utils/auditHelpers.ts', content);
}

let staffContent = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

const importMatch = `import { uploadWithRetry } from '../utils/uploadHelpers';`;
const newImport = `import { uploadWithRetry } from '../utils/uploadHelpers';
import { logAuditActivity } from '../utils/auditHelpers';`;

if (!staffContent.includes('logAuditActivity')) {
  staffContent = staffContent.replace(importMatch, newImport);
}

const updateMatch = `if (editingId) {
        await updateDoc(doc(db, 'staff', editingId), dataToSave);
      }`;

const newUpdateMatch = `if (editingId) {
        const oldStaff = staff.find(s => s.id === editingId);
        await updateDoc(doc(db, 'staff', editingId), dataToSave);
        
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
        if (oldStaff?.name !== dataToSave.name) diffs.push(\`Name: \${oldStaff?.name || ''} -> \${dataToSave.name}\`);
        if (oldStaff?.designation !== dataToSave.designation) diffs.push(\`Role: \${oldStaff?.designation || ''} -> \${dataToSave.designation}\`);
        if (oldStaff?.status !== dataToSave.status) diffs.push(\`Status: \${oldStaff?.status || ''} -> \${dataToSave.status}\`);
        if (oldStaff?.basicSalary !== dataToSave.basicSalary) diffs.push(\`Salary: \${oldStaff?.basicSalary || ''} -> \${dataToSave.basicSalary}\`);
        if (oldStaff?.salaryProcessing !== dataToSave.salaryProcessing) diffs.push(\`Salary Proc: \${oldStaff?.salaryProcessing} -> \${dataToSave.salaryProcessing}\`);
        if (oldStaff?.lateDeductionEnabled !== dataToSave.lateDeductionEnabled) diffs.push(\`Late Ded: \${oldStaff?.lateDeductionEnabled} -> \${dataToSave.lateDeductionEnabled}\`);
        
        if (diffs.length > 0) {
          logAuditActivity(adminName, 'Staff', dataToSave.name, 'Updated Staff', diffs.join(', '));
        }
      }`;

staffContent = staffContent.replace(updateMatch, newUpdateMatch);

fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', staffContent);
