const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// 1. Update the handleOutSuccess function
code = code.replace(
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
  };`,
  `  const handleOutSuccess = (timeStr: string) => {
      setSuccessPopup({
        type: 'OUT',
        title: 'Attendance OUT Successful',
        subtitle: "Thank you for your valuable contribution to Yashi Skill Project Pvt. Ltd. 🙏\\n\\nYour OUT Attendance has been recorded successfully.\\n\\nHave a great day! 😊",
        details: {
          date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          time: timeStr,
          center: centerInfo?.name || '',
          staffName: staffData?.name || ''
        }
      });
  };`
);

// 2. Update the AttendanceSuccessModal onOk handler
code = code.replace(
  `        onOk={() => {
          const type = successPopup?.type;
          setSuccessPopup(null);
          if (type === 'OUT') {
            const isAssignedDMR = assignedReports.some(r => r.toLowerCase().includes('dmr') || r.toLowerCase().includes('mobilization'));
            if (isAssignedDMR) {
              setTimeout(() => {
                setReportReminderPopup(true);
              }, 1000);
            }
          }
        }}`,
  `        onOk={async () => {
          const type = successPopup?.type;
          setSuccessPopup(null);
          if (type === 'OUT') {
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
                     setTimeout(() => {
                        navigate('/staff/dmr-fill', { state: { staffData, centerInfo } });
                     }, 500);
                  }
                } catch (err) {
                  console.error("Error checking DMR status", err);
                }
            }
          }
        }}`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
