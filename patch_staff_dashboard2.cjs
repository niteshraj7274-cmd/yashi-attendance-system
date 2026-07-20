const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// Inject at the end of processSelfieLocationAttendance inside success blocks
const successInBlock = `            alert('GPS Attendance marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');`;
const newSuccessInBlock = `            alert('GPS Attendance Successfully Marked in Yashi Skill Project Pvt Ltd, Patna.');
            sendCenterNotification(
              centerInfo?.id || '',
              centerInfo?.code || '',
              'Staff Attendance Marked Successfully',
              staffData.name || '',
              staffData.staffId || '',
              staffData.designation || 'Staff',
              attendanceStatus,
              '',
              Math.round(distance)
            );
            if (attendanceStatus === 'Late') {
               sendCenterNotification(
                 centerInfo?.id || '',
                 centerInfo?.code || '',
                 'Staff Marked Late',
                 staffData.name || '',
                 staffData.staffId || '',
                 staffData.designation || 'Staff',
                 attendanceStatus,
                 'Arrived after grace period',
                 Math.round(distance)
               );
            }`;
if (!code.includes('sendCenterNotification(') && code.includes(successInBlock)) {
  code = code.replace(successInBlock, newSuccessInBlock);
}

const successOutBlock = `            alert('Attendance OUT marked successfully in Yashi Skill Project Pvt. Ltd., Patna.');`;
const newSuccessOutBlock = `            alert('Attendance Out Successfully Marked in Yashi Skill Project Pvt Ltd, Patna.');
            sendCenterNotification(
              centerInfo?.id || '',
              centerInfo?.code || '',
              'Staff Attendance Marked Successfully',
              staffData.name || '',
              staffData.staffId || '',
              staffData.designation || 'Staff',
              'OUT',
              '',
              Math.round(distance)
            );`;
if (code.includes(successOutBlock)) {
  code = code.replace(successOutBlock, newSuccessOutBlock);
}


const outsideBlock = `          if (isOutside && !isOfficialDuty) {
            alert("You are outside the Center Geofence.");
            setLocationLoading(false);
            return;
          }`;
const newOutsideBlock = `          if (isOutside && !isOfficialDuty) {
            alert("You are outside the Center Geofence.");
            sendCenterNotification(
              centerInfo?.id || '',
              centerInfo?.code || '',
              'Outside Geofence Attendance Attempt',
              staffData.name || '',
              staffData.staffId || '',
              staffData.designation || 'Staff',
              'Outside Geofence',
              \`Attempted from \${Math.round(distance)}m away\`,
              Math.round(distance)
            );
            setLocationLoading(false);
            return;
          }`;
if (!code.includes('Outside Geofence Attendance Attempt')) {
  code = code.replace(outsideBlock, newOutsideBlock);
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
