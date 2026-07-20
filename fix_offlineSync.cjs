const fs = require('fs');
let content = fs.readFileSync('src/utils/offlineSync.ts', 'utf8');

// Replace IN creation
content = content.replace(
  `          let docRef;
          if (targetDocId && !targetDocId.startsWith('local_')) {
             // If we already have a real ID but docCreated is somehow false
             await updateDoc(doc(db, 'attendance', targetDocId), finalData).catch(async () => {
                 // if update fails (doesn't exist), just use setDoc
                 await setDoc(doc(db, 'attendance', targetDocId), finalData);
             });
          } else {
             docRef = await addDoc(collection(db, 'attendance'), finalData);
             targetDocId = docRef.id;
          }`,
  `          targetDocId = \`\${finalData.staffUid}_\${finalData.Date || finalData.date}\`;
          await setDoc(doc(db, 'attendance', targetDocId), finalData, { merge: true });`
);

// We should also make sure OUT uses the same targetDocId if it doesn't have one
content = content.replace(
  `         // OUT record
         if (targetDocId && targetDocId.startsWith('local_')) {
            targetDocId = idMapping[targetDocId] || targetDocId;
            
            // Search in localStorage if not in current mapping
            if (targetDocId.startsWith('local_')) {
               const existing = await getOfflineRecords();
               const parentIn = existing.find(r => r.id === targetDocId && r.type === 'IN');
               if (parentIn && parentIn.attendanceDocId && !parentIn.attendanceDocId.startsWith('local_')) {
                  targetDocId = parentIn.attendanceDocId;
               }
            }
         }
         
         // If it's still local_, the IN record failed or hasn't synced. We must wait.
         if (targetDocId && targetDocId.startsWith('local_')) {
            throw new Error("Parent IN record not synced yet");
         }`,
  `         // OUT record
         targetDocId = \`\${record.data.staffUid}_\${record.data.Date || record.data.date}\`;
`
);

// We should change updateDoc to setDoc with merge for OUT as well, in case OUT syncs first
content = content.replace(
  `await updateDoc(doc(db, 'attendance', targetDocId), finalData);`,
  `await setDoc(doc(db, 'attendance', targetDocId), finalData, { merge: true });`
);

fs.writeFileSync('src/utils/offlineSync.ts', content);
