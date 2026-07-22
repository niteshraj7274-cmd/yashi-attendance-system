const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

// First replace for selfie
code = code.replace(
  `              setAttendanceRecord({ id: localId, ...newRecord });
            } else {
              if (attendanceRecord?.id) {
                const updateData: any = {
                  'OUT Time': timeStr,`,
  `              setAttendanceRecord({ id: localId, ...newRecord });
            } else {
              if (attendanceRecord?.id) {
                let targetDocId = attendanceRecord.attendanceDocId || attendanceRecord.id;
                if (targetDocId.startsWith('local_')) {
                   targetDocId = \`\${staffData.uid}_\${attendanceRecord.Date || attendanceRecord.date || today.toLocaleDateString('en-CA')}\`;
                }
                const updateData: any = {
                  'OUT Time': timeStr,`
);

// Then replace attendanceDocId
code = code.replace(
  `                await saveOfflineRecord({
                  id: \`local_\${Date.now()}\`,
                  type: 'OUT',
                  mode: 'GPS Attendance',
                  data: updateData,
                  timestamp: Date.now(),
                  status: 'Offline Saved',
                  attendanceDocId: attendanceRecord.id,
                  isOutside
                });`,
  `                await saveOfflineRecord({
                  id: \`local_\${Date.now()}\`,
                  type: 'OUT',
                  mode: 'GPS Attendance',
                  data: updateData,
                  timestamp: Date.now(),
                  status: 'Offline Saved',
                  attendanceDocId: targetDocId,
                  isOutside
                });`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
