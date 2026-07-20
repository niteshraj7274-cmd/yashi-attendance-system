import re

with open('src/components/AdminBackupRestoreScreen.tsx', 'r') as f:
    content = f.read()

new_restore = """  const handleRestore = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (!e.target.files || e.target.files.length === 0) return;
     const file = e.target.files[0];
     if (!window.confirm("Are you sure you want to restore from this backup? This might overwrite existing data.")) return;
     
     setLoading(true);
     const reader = new FileReader();
     reader.onload = async (ev) => {
        try {
           const text = ev.target?.result as string;
           const backupData = JSON.parse(text);
           
           if (typeof backupData !== 'object' || Array.isArray(backupData)) {
              throw new Error("Invalid backup format");
           }
           
           // Restore collections
           for (const colName of Object.keys(backupData)) {
              const records = backupData[colName];
              if (!Array.isArray(records)) continue;
              
              const batches = [];
              let currentBatch = writeBatch(db);
              let count = 0;
              
              for (const record of records) {
                 if (!record._id) continue;
                 const id = record._id;
                 const dataToRestore = { ...record };
                 delete dataToRestore._id;
                 const docRef = doc(db, colName, id);
                 currentBatch.set(docRef, dataToRestore, { merge: true });
                 count++;
                 if (count === 499) {
                    batches.push(currentBatch);
                    currentBatch = writeBatch(db);
                    count = 0;
                 }
              }
              if (count > 0) batches.push(currentBatch);
              
              for (const b of batches) {
                 await b.commit();
              }
           }
           alert('Database Restored Successfully!');
        } catch (err: any) {
           console.error(err);
           alert(`Restore failed: ${err.message || 'Invalid format or network error.'}`);
        } finally {
           setLoading(false);
           e.target.value = '';
        }
     };
     reader.readAsText(file);
  };"""

content = re.sub(r'const handleRestore = \(e: React.ChangeEvent<HTMLInputElement>\) => \{.*?\n     reader.readAsText\(file\);\n  \};\n', new_restore + "\n", content, flags=re.DOTALL)

with open('src/components/AdminBackupRestoreScreen.tsx', 'w') as f:
    f.write(content)
