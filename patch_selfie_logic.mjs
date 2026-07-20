import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const regex = /\/\/ Step 4: Save permanently in Firestore\s*\/\/ Upload to Storage with retry/;

const replacement = `// Step 4: Save permanently in Firestore

          const today = new Date();
          const dateStr = today.toLocaleDateString('en-CA');
          const timeStr = today.toLocaleTimeString('en-US', { hour12: false });

          if (!navigator.onLine) {
            if (attendanceType === 'IN') {
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
                'Attendance Type': 'Selfie + Location'
              };
              const localId = \`local_\${Date.now()}\`;
              saveOfflineRecord({
                id: localId,
                type: 'IN',
                mode: 'Selfie + Location',
                data: newRecord,
                photoDataUrl: dataUrl,
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
                  'OUT Attendance Type': 'Selfie + Location'
                };
                if (isOutside) {
                  updateData['Attendance Status'] = 'Outside Center';
                }
                saveOfflineRecord({
                  id: \`local_\${Date.now()}\`,
                  type: 'OUT',
                  mode: 'Selfie + Location',
                  data: updateData,
                  photoDataUrl: dataUrl,
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

          // Upload to Storage with retry`;

content = content.replace(regex, replacement);

fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
