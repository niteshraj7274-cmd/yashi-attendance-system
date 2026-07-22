const fs = require('fs');
let code = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

code = code.replace(
  `              if (isOutside) {
                updateData['Attendance Status'] = 'Outside Geofence';
              }
              await updateDoc(doc(db, 'attendance', attendanceRecord.id), updateData);`,
  `              if (isOutside) {
                updateData['Attendance Status'] = 'Outside Geofence';
              }
              
              let targetDocId = attendanceRecord.attendanceDocId || attendanceRecord.id;
              if (targetDocId.startsWith('local_')) {
                 targetDocId = \`\${staffData.uid}_\${attendanceRecord.Date || attendanceRecord.date}\`;
              }
              await updateDoc(doc(db, 'attendance', targetDocId), updateData);`
);

// We should also fix where it saves the outside center attendance, replacing attendanceRecord.id with targetDocId
code = code.replace(
  `                    timestamp: serverTimestamp(),
                    attendanceDocId: attendanceRecord.id
                  });
              }

              setAttendanceRecord({ ...attendanceRecord, ...updateData });`,
  `                    timestamp: serverTimestamp(),
                    attendanceDocId: targetDocId
                  });
              }

              setAttendanceRecord({ ...attendanceRecord, ...updateData, attendanceDocId: targetDocId, id: targetDocId });`
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', code);
