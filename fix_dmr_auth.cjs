const fs = require('fs');
let code = fs.readFileSync('src/components/DmrFillScreen.tsx', 'utf8');

code = code.replace(
  `        const reportDate = new Date().toISOString().split('T')[0];
        const q = query(`,
  `        // Check Assignment
        const assignQ = query(collection(db, 'report_assignments'), where('staffEmpId', '==', staffData.staffId));
        const assignSnap = await getDocs(assignQ);
        const assignedReports = assignSnap.docs.map(doc => doc.data().reportName || doc.data().reportId);
        const isAssignedDMR = assignedReports.some(r => r.toLowerCase().includes('dmr') || r.toLowerCase().includes('mobilization'));
        if (!isAssignedDMR) {
          alert("You are not authorized to fill this report.");
          navigate('/staff-dashboard');
          return;
        }

        const reportDate = new Date().toISOString().split('T')[0];
        const q = query(`
);

fs.writeFileSync('src/components/DmrFillScreen.tsx', code);
