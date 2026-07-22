const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const regex = /const handleOutSuccess = \(timeStr: string\) => \{[\s\S]*?\}, 1500\);\s*\};/g;

code = code.replace(regex, `const handleOutSuccess = (timeStr: string) => {
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
  };`);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
