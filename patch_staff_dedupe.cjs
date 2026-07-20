const fs = require('fs');
let content = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

const handleDeleteStr = `  const handleDelete = async (staffId: string, staffName: string) => {`;
const dedupeStr = `
  const handleRemoveDuplicates = async () => {
    if (!window.confirm("This will remove duplicate Staff with the same Staff ID. Proceed?")) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'staff'));
      const snapshot = await getDocs(q);
      const allStaff = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      
      const seenIds = new Set();
      const duplicatesToDelete = [];
      
      allStaff.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeA - timeB;
      });
      
      for (const st of allStaff) {
        if (!st.staffId) continue;
        
        if (seenIds.has(st.staffId)) {
          duplicatesToDelete.push(st.id);
        } else {
          seenIds.add(st.staffId);
        }
      }
      
      if (duplicatesToDelete.length === 0) {
        alert("No duplicates found.");
      } else {
        for (const id of duplicatesToDelete) {
          await deleteDoc(doc(db, 'staff', id));
        }
        alert(\`Successfully removed \${duplicatesToDelete.length} duplicate staff members.\`);
        fetchData();
      }
    } catch (err) {
      console.error("Error removing duplicates:", err);
      alert("Failed to remove duplicates.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (staffId: string, staffName: string) => {`;

if (!content.includes('handleRemoveDuplicates')) {
  content = content.replace(handleDeleteStr, dedupeStr);
}

const buttonsStr = `<div className="flex gap-2">
          {!showForm && (
            <button 
              onClick={() => {`;

const newButtonsStr = `<div className="flex gap-2">
          {!showForm && (
            <button onClick={handleRemoveDuplicates} className="bg-rose-600 text-white p-2 rounded-full shadow-sm text-xs font-bold px-3">
              Fix Dups
            </button>
          )}
          {!showForm && (
            <button 
              onClick={() => {`;

content = content.replace(buttonsStr, newButtonsStr);

fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', content);
