import fs from 'fs';
let content = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');
content = content.replace(
"        const centerRef = doc(db, 'centers', centerId);\n        unSubCenter = onSnapshot(centerRef, (centerDoc) => {\n          if (centerDoc.exists()) {\n            setCenterName(centerDoc.data().name);\n            setCenterCode(centerDoc.data().code);\n          } else {\n            alert('Center not found');\n            navigate('/centre-login');\n          }\n        });\n        \n        const settingsRef = doc(db, 'settings', 'appSettings');\n        // Live attendance counts for today\n        const todayStr = new Date().toLocaleDateString('en-CA');\n        const attQ = query(collection(db, 'attendance'), where('Date', '==', todayStr), where('Center Code', '==', centerDoc.data()?.code || ''));\n        const unsubAtt = onSnapshot(attQ, (snap) => {\n          const counts: any = { Present: 0, Late: 0, 'Half Day': 0, 'Official Duty': 0, Leave: 0, Absent: 0 };\n          snap.forEach(doc => {\n             const st = doc.data()['Attendance Status'] || 'Present';\n             if (counts[st] !== undefined) counts[st]++;\n             else counts[st] = 1;\n          });\n          setTodayCounts(counts);\n        });",
`        const centerRef = doc(db, 'centers', centerId);
        const centerSnap = await getDoc(centerRef);
        if (!centerSnap.exists()) {
            alert('Center not found');
            navigate('/centre-login');
            return;
        }
        const initialCode = centerSnap.data().code;

        unSubCenter = onSnapshot(centerRef, (cDoc) => {
          if (cDoc.exists()) {
            setCenterName(cDoc.data().name);
            setCenterCode(cDoc.data().code);
          }
        });
        
        const settingsRef = doc(db, 'settings', 'appSettings');
        // Live attendance counts for today
        const todayStr = new Date().toLocaleDateString('en-CA');
        const attQ = query(collection(db, 'attendance'), where('Date', '==', todayStr), where('Center Code', '==', initialCode));
        const unsubAtt = onSnapshot(attQ, (snap) => {
          const counts: any = { Present: 0, Late: 0, 'Half Day': 0, 'Official Duty': 0, Leave: 0, Absent: 0 };
          snap.forEach(doc => {
             const st = doc.data()['Attendance Status'] || 'Present';
             if (counts[st] !== undefined) counts[st]++;
             else counts[st] = 1;
          });
          setTodayCounts(counts);
        });`
);
fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', content);
