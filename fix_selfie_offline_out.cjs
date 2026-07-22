const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `            if (!navigator.onLine) {
               alert("You are offline. OUT attendance must be submitted online to ensure immediate database update.");
               setLocationLoading(false);
               return;
            }`,
  `            if (!navigator.onLine) {
               outRecord.syncStatus = 'Offline Saved';
               let targetDocId = attendanceRecord.attendanceDocId || attendanceRecord.id;
               if (targetDocId.startsWith('local_')) {
                  targetDocId = \`\${staffData.uid}_\${attendanceRecord.Date || attendanceRecord.date}\`;
               }
               const localId = \`local_\${Date.now()}\`;
               await saveOfflineRecord({
                  id: localId,
                  type: 'OUT',
                  mode: 'Selfie Attendance',
                  data: outRecord,
                  photoDataUrl: photoDataUrl,
                  timestamp: Date.now(),
                  status: 'Offline Saved',
                  attendanceDocId: targetDocId,
                  isOutside
               });
               setAttendanceRecord({ ...attendanceRecord, ...outRecord, attendanceDocId: targetDocId, id: targetDocId });
               handleOutSuccess(timeStr);
               setLocationLoading(false);
               syncData(true);
               return;
            }`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
