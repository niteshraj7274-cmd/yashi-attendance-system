import re

with open('src/components/AdminBackupRestoreScreen.tsx', 'r') as f:
    content = f.read()

# Add addDoc to imports
content = content.replace("from 'firebase/firestore';", "addDoc, from 'firebase/firestore';").replace("addDoc, from", "addDoc from")

# Change handleBackup
new_handle_backup = """  const handleBackup = async () => {
    if (!window.confirm("Create a new full system backup?")) return;
    setLoading(true);
    let backupString = "";
    const collections = [
        'centers', 'staff', 'attendance', 'salaries', 'salary_holidays', 
        'leaves', 'official_duty_requests', 'report_assignments', 'reports', 'support_tickets', 'settings'
    ];
    let isFailed = false;
    let failReason = "";

    try {
      const backupData: any = {};
      for (const colName of collections) {
         try {
             const snap = await getDocs(collection(db, colName));
             backupData[colName] = snap.docs.map(d => ({ _id: d.id, ...d.data() }));
         } catch (err: any) {
             throw new Error(`Error reading collection ${colName}: ${err.message}`);
         }
      }
      backupString = JSON.stringify(backupData);
    } catch (e: any) {
      isFailed = true;
      failReason = e.message;
      alert(`Backup failed: ${failReason}`);
    }

    try {
      // Save backup history
      await addDoc(collection(db, 'system_backups'), {
         timestamp: serverTimestamp(),
         date: new Date().toLocaleDateString('en-CA'),
         time: new Date().toLocaleTimeString(),
         sizeBytes: isFailed ? 0 : new Blob([backupString]).size,
         collections: collections.length,
         status: isFailed ? 'Failed' : 'Success',
         error: isFailed ? failReason : null
      });
    } catch(err) {
       console.error("Failed to save backup history", err);
    }
    
    if (!isFailed) {
      try {
        // Provide download
        const blob = new Blob([backupString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_${new Date().getTime()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        alert('Backup Created Successfully!');
      } catch (e: any) {
        alert(`Failed to trigger download: ${e.message}`);
      }
    }
    
    fetchBackups();
    setLoading(false);
  };"""

# Replace handleBackup
content = re.sub(r'const handleBackup = async \(\) => \{.*?\n  \};\n', new_handle_backup + "\n", content, flags=re.DOTALL)

with open('src/components/AdminBackupRestoreScreen.tsx', 'w') as f:
    f.write(content)
