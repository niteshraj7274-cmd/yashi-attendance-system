import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const replacement = `
          if (!navigator.onLine) {
            if (type === 'IN') {
              const newRecord = {
                staffUid: staffData.uid,
                'Staff ID': staffData.staffId,
                'Staff Name': staffData.name,
                'Center Code': centerInfo?.code || '',
                'Center Name': centerInfo?.name || '',
                'Date': dateStr,
                date: dateStr,
                'IN Time': timeStr,
                'Latitude': latitude,
                'Longitude': longitude,
                'Accuracy': accuracy,
                'Current Address': address,
                'Google Maps Link': googleMapsLink,
                'Device Information': deviceId,
                'Attendance Status': attendanceStatus,
                'Attendance Type': 'Location Only'
              };
              const localId = \`local_\${Date.now()}\`;
              saveOfflineRecord({
                id: localId,
                type: 'IN',
                mode: 'Location Only',
                data: newRecord,
                timestamp: Date.now(),
                status: 'Pending Sync',
                isOutside
              });
              setAttendanceRecord({ id: localId, ...newRecord });
            } else {
              if (attendanceRecord?.id) {
                const updateData: any = {
                  'OUT Time': timeStr,
                  'OUT Latitude': latitude,
                  'OUT Longitude': longitude,
                  'OUT Accuracy': accuracy,
                  'OUT Current Address': address,
                  'OUT Google Maps Link': googleMapsLink,
                  'OUT Attendance Type': 'Location Only'
                };
                if (isOutside) {
                  updateData['Attendance Status'] = 'Outside Center';
                }
                saveOfflineRecord({
                  id: \`local_\${Date.now()}\`,
                  type: 'OUT',
                  mode: 'Location Only',
                  data: updateData,
                  timestamp: Date.now(),
                  status: 'Pending Sync',
                  attendanceDocId: attendanceRecord.id,
                  isOutside
                });
                setAttendanceRecord({ ...attendanceRecord, ...updateData });
              }
            }
            alert("Attendance Saved Offline. It will sync automatically when internet is available.");
            setSubmitting(false);
            return;
          }

          if (type === 'IN') {
`;

content = content.replace(
  /if \(type === 'IN'\) \{\s*const newRecord = \{[\s\S]*?timestamp: serverTimestamp\(\)\s*\};[\s\S]*?const docRef = await addDoc[\s\S]*?setAttendanceRecord[\s\S]*?\} else \{\s*if \(attendanceRecord\?\.id\) \{\s*const updateData: any = \{[\s\S]*?\}[\s\S]*?alert\("Attendance Recorded Successfully"\);/,
  replacement.trim() + "\n            const newRecord = {\n              staffUid: staffData.uid,\n              'Staff ID': staffData.staffId,\n              'Staff Name': staffData.name,\n              'Center Code': centerInfo?.code || '',\n              'Center Name': centerInfo?.name || '',\n              'Date': dateStr,\n              date: dateStr,\n              'IN Time': timeStr,\n              'Latitude': latitude,\n              'Longitude': longitude,\n              'Accuracy': accuracy,\n              'Current Address': address,\n              'Google Maps Link': googleMapsLink,\n              'Device Information': deviceId,\n              'Attendance Status': attendanceStatus,\n              'Attendance Type': 'Location Only',\n              timestamp: serverTimestamp()\n            };\n            const docRef = await addDoc(collection(db, 'attendance'), newRecord);\n            setAttendanceRecord({ id: docRef.id, ...newRecord });\n          } else {\n            if (attendanceRecord?.id) {\n              const updateData: any = {\n                'OUT Time': timeStr,\n                'OUT Latitude': latitude,\n                'OUT Longitude': longitude,\n                'OUT Accuracy': accuracy,\n                'OUT Current Address': address,\n                'OUT Google Maps Link': googleMapsLink,\n                'OUT Attendance Type': 'Location Only'\n              };\n              if (isOutside) {\n                updateData['Attendance Status'] = 'Outside Center';\n              }\n              await updateDoc(doc(db, 'attendance', attendanceRecord.id), updateData);\n              setAttendanceRecord({ ...attendanceRecord, ...updateData });\n            }\n          }\n          \n          alert(\"Attendance Recorded Successfully\");"
);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
