import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const helperFunc = `  const calculateWorkingHours = (inTime, outTime) => {
    if (!inTime || !outTime) return 'N/A';
    try {
      const parseTime = (t) => {
        let [time, period] = t.split(' ');
        if (!period) period = '';
        const [h, m, s] = time.split(':').map(Number);
        let hour = h;
        if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
        if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
        return new Date(2000, 0, 1, hour, m || 0, s || 0);
      };
      const diff = parseTime(outTime).getTime() - parseTime(inTime).getTime();
      if (diff < 0) return 'N/A';
      const hrs = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      return \`\${hrs}h \${mins}m\`;
    } catch {
      return 'N/A';
    }
  };\n`;

if (!content.includes('const calculateWorkingHours')) {
    content = content.replace('const startAttendanceProcess', helperFunc + '\n  const startAttendanceProcess');
}

const oldOutBlock = `          } else {
            // OUT
            if (!attendanceRecord) return;
            const outRecord = {
              'OUT Time': timeStr,
              'OUT Latitude': latitude,
              'OUT Longitude': longitude,
              'Accuracy': accuracy,
              'OUT Current Address': address,
              'Device Information': deviceId || '',
              'Distance from Center': Math.round(distance),
              'Attendance Status': attendanceStatus,
              'Attendance Type': 'Selfie + Location',
              'syncStatus': 'Offline Saved'
            };
            
            await saveOfflineRecord({
              id: \`local_\${Date.now()}\`,
              type: 'OUT',
              mode: 'Selfie + Location',
              data: { ...attendanceRecord, ...outRecord, deviceId },
              photoDataUrl: photoDataUrl,
              timestamp: Date.now(),
              status: 'Offline Saved',
              attendanceDocId: attendanceRecord.id,
              isOutside
            });
            
            setAttendanceRecord({ ...attendanceRecord, ...outRecord });
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
          }`;

const newOutBlock = `          } else {
            // OUT
            if (!attendanceRecord) return;
            
            const outDateStr = today.toLocaleDateString('en-CA');
            const workingHours = calculateWorkingHours(attendanceRecord['IN Time'] || attendanceRecord.time, timeStr);

            const outRecord: any = {
              'OUT Date': outDateStr,
              'OUT Time': timeStr,
              'Working Hours': workingHours,
              'OUT GPS Location': \`\${latitude}, \${longitude}\`,
              'OUT Latitude': latitude,
              'OUT Longitude': longitude,
              'OUT Accuracy': accuracy,
              'OUT Current Address': address,
              'Device Information': deviceId || '',
              'Distance from Center': Math.round(distance),
              'OUT Status': attendanceStatus,
              'Attendance Status': attendanceStatus,
              'Attendance Type': 'Selfie + Location',
              'syncStatus': 'Synced'
            };

            if (!navigator.onLine) {
               alert("You are offline. OUT attendance must be submitted online to ensure immediate database update.");
               setLocationLoading(false);
               return;
            }

            try {
              let photoUrl = '';
              if (photoDataUrl) {
                const photoRef = ref(storage, \`attendance_selfies/\${staffData.uid}_OUT_\${Date.now()}.jpg\`);
                await uploadString(photoRef, photoDataUrl, 'data_url');
                photoUrl = await getDownloadURL(photoRef);
                outRecord['OUT Selfie URL'] = photoUrl;
              }

              let targetDocId = attendanceRecord.attendanceDocId || attendanceRecord.id;
              if (targetDocId.startsWith('local_')) {
                 targetDocId = \`\${staffData.uid}_\${attendanceRecord.Date || attendanceRecord.date}\`;
              }
              
              const docRef = doc(db, 'attendance', targetDocId);
              await updateDoc(docRef, outRecord);

              setAttendanceRecord({ ...attendanceRecord, ...outRecord, attendanceDocId: targetDocId });
              
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
            } catch (err: any) {
              console.error("Failed to save OUT attendance:", err);
              alert(\`Failed to save OUT attendance: \${err.message || "Unknown error"}\`);
              setLocationLoading(false);
              return;
            }
          }`;

if (content.includes(oldOutBlock)) {
    content = content.replace(oldOutBlock, newOutBlock);
    fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
    console.log("Successfully patched processSelfieLocationAttendance");
} else {
    console.log("Could not find old OUT block to replace");
}

