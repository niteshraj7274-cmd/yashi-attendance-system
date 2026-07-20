const fs = require('fs');
let content = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');

const handleDeleteStr = `  const handleDelete = async (centerId: string, centerName: string) => {`;
const dedupeStr = `
  const handleRemoveDuplicates = async () => {
    if (!window.confirm("This will remove duplicate Centers with the same Code. Proceed?")) return;
    setLoading(true);
    try {
      const q = query(collection(db, 'centers'));
      const snapshot = await getDocs(q);
      const allCenters = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
      
      const seenCodes = new Set();
      const duplicatesToDelete = [];
      
      // Sort by createdAt so we keep the oldest one
      allCenters.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeA - timeB;
      });
      
      for (const center of allCenters) {
        if (!center.code) continue; // Skip if no code
        
        if (seenCodes.has(center.code)) {
          // This is a duplicate
          duplicatesToDelete.push(center.id);
        } else {
          seenCodes.add(center.code);
        }
      }
      
      if (duplicatesToDelete.length === 0) {
        alert("No duplicates found.");
      } else {
        for (const id of duplicatesToDelete) {
          await deleteDoc(doc(db, 'centers', id));
        }
        alert(\`Successfully removed \${duplicatesToDelete.length} duplicate centers.\`);
        fetchCenters();
      }
    } catch (err) {
      console.error("Error removing duplicates:", err);
      alert("Failed to remove duplicates.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (centerId: string, centerName: string) => {`;

if (!content.includes('handleRemoveDuplicates')) {
  content = content.replace(handleDeleteStr, dedupeStr);
}

const buttonsStr = `<button onClick={() => navigate('/admin/staff', { state: { autoOpenCreate: true } })} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 shadow-sm text-sm">
            <Users size={18} />
            <span className="hidden sm:inline">Add Staff</span>
          </button>`;

const newButtonsStr = `<button onClick={handleRemoveDuplicates} className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-rose-700 shadow-sm text-sm">
            <span className="hidden sm:inline">Fix Duplicates</span>
          </button>
          <button onClick={() => navigate('/admin/staff', { state: { autoOpenCreate: true } })} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-indigo-700 shadow-sm text-sm">
            <Users size={18} />
            <span className="hidden sm:inline">Add Staff</span>
          </button>`;

content = content.replace(buttonsStr, newButtonsStr);

fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', content);
