const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `  const handleOutSuccess = (timeStr: string) => {
    // Wait exactly 1 second
    setTimeout(async () => {
      const isAssignedDMR = assignedReports.some(r => r.toLowerCase().includes('dmr') || r.toLowerCase().includes('mobilization'));
      if (isAssignedDMR) {
        try {
          const reportDate = new Date().toISOString().split('T')[0];
          const { query, collection, where, getDocs } = await import('firebase/firestore');
          const { db } = await import('../firebase');
          const q = query(
            collection(db, 'dmr_reports'),
            where('staffEmpId', '==', staffData.staffId),
            where('reportDate', '==', reportDate)
          );
          const exists = await getDocs(q);
          if (exists.empty) {
            setReportReminderPopup(true);
            return;
          }
        } catch (err) {
          console.error("Error checking DMR status", err);
        }
      }
      
      // Fallback or already submitted
      setSuccessPopup({
        type: 'OUT',
        title: 'Attendance Marked Successfully.',
        subtitle: "Thank you for completing today's duty. 🎉",
        details: {
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          time: timeStr,
          center: centerInfo?.name || '',
          staffName: staffData?.name || ''
        }
      });
    }, 1000);
  };`,
  `  const handleOutSuccess = (timeStr: string) => {
      setSuccessPopup({
        type: 'OUT',
        title: 'Attendance Marked Successfully.',
        subtitle: "Thank you for completing today's duty. 🎉",
        details: {
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          time: timeStr,
          center: centerInfo?.name || '',
          staffName: staffData?.name || ''
        }
      });
      
    // Wait exactly 1 second and check DMR
    setTimeout(async () => {
      const isAssignedDMR = assignedReports.some(r => r.toLowerCase().includes('dmr') || r.toLowerCase().includes('mobilization'));
      if (isAssignedDMR) {
        try {
          const reportDate = new Date().toISOString().split('T')[0];
          const { query, collection, where, getDocs } = await import('firebase/firestore');
          const { db } = await import('../firebase');
          const q = query(
            collection(db, 'dmr_reports'),
            where('staffEmpId', '==', staffData.staffId),
            where('reportDate', '==', reportDate)
          );
          const exists = await getDocs(q);
          if (exists.empty) {
            setSuccessPopup(null);
            setReportReminderPopup(true);
          }
        } catch (err) {
          console.error("Error checking DMR status", err);
        }
      }
    }, 1500);
  };`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
