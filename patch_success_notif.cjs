const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// For IN attendance success
const targetIn = `const docRef = await addDoc(collection(db, 'attendance'), newRecord);`;
const insertIn = `const docRef = await addDoc(collection(db, 'attendance'), newRecord);
            
            // Notification logic
            if (!isOutside) {
              const notifType = attendanceStatus === 'Late' ? 'Staff Marked Late' : 'Staff Attendance Marked Successfully';
              sendCenterNotification(
                centerInfo?.id || '', centerInfo?.code || '', notifType, staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', attendanceStatus, \`Marked \${type} at \${timeStr}\`, Math.round(distance)
              );
            }`;

if (code.includes(targetIn) && !code.includes("const notifType = attendanceStatus === 'Late' ? 'Staff Marked Late'")) {
  code = code.replace(targetIn, insertIn);
}

// For OUT attendance success
const targetOut = `await updateDoc(doc(db, 'attendance', attendanceRecord.id), updateData);`;
const insertOut = `await updateDoc(doc(db, 'attendance', attendanceRecord.id), updateData);
              
              if (!isOutside) {
                sendCenterNotification(
                  centerInfo?.id || '', centerInfo?.code || '', 'Staff Attendance Marked Successfully', staffData.name || '', staffData.staffId || '', staffData.designation || 'Staff', 'Present', \`Marked OUT at \${timeStr}\`, Math.round(distance)
                );
              }`;

if (code.includes(targetOut) && !code.includes("Marked OUT at ${timeStr}")) {
  code = code.replace(targetOut, insertOut);
}

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
