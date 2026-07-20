const fs = require('fs');
let content = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');

const importStr = `import { collection, query, getDocs, updateDoc, doc, addDoc, serverTimestamp, where } from 'firebase/firestore';`;
const newImportStr = `import { collection, query, getDocs, updateDoc, doc, addDoc, serverTimestamp, where, deleteDoc } from 'firebase/firestore';`;

if (!content.includes('deleteDoc')) {
  content = content.replace(importStr, newImportStr);
}

const editFuncStr = `  const handleEdit = (center: any) => {`;
const deleteFuncStr = `
  const handleDelete = async (centerId: string, centerName: string) => {
    if (!window.confirm(\`Are you sure you want to delete \${centerName}?\`)) return;
    
    // Check for linked staff
    try {
      const staffQuery = query(collection(db, 'staff'), where('centerId', '==', centerId));
      const staffSnap = await getDocs(staffQuery);
      
      if (!staffSnap.empty) {
        alert("This Center contains Staff. Delete all Staff first or move them to another Center.");
        return;
      }
      
      await deleteDoc(doc(db, 'centers', centerId));
      
      // Log audit
      const adminStr = localStorage.getItem('userSession');
      let adminName = 'Admin';
      if (adminStr) {
        try {
          const adminData = JSON.parse(atob(adminStr));
          adminName = adminData.name || 'Admin';
        } catch(e) {}
      }
      logAuditActivity(adminName, 'Center', centerName, 'Deleted Center', \`Deleted center \${centerName}\`);
      
      fetchCenters();
    } catch (err) {
      console.error("Error deleting center", err);
      alert("Failed to delete center.");
    }
  };

  const handleEdit = (center: any) => {`;

if (!content.includes('handleDelete')) {
  content = content.replace(editFuncStr, deleteFuncStr);
}

const buttonsStr = `<button onClick={() => handleEdit(center)} className="flex-1 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs uppercase rounded hover:bg-blue-100 flex justify-center items-center gap-1">
                        <Edit size={14} /> Edit
                      </button>
                      <button onClick={() => navigate('/admin/staff', { state: { filterCenterId: center.id } })} className="flex-1 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs uppercase rounded hover:bg-slate-200 flex justify-center items-center gap-1">
                        View Staff
                      </button>`;

const newButtonsStr = `<button onClick={() => handleEdit(center)} className="flex-1 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs uppercase rounded hover:bg-blue-100 flex justify-center items-center gap-1">
                        <Edit size={14} /> Edit
                      </button>
                      <button onClick={() => navigate('/admin/staff', { state: { filterCenterId: center.id } })} className="flex-1 py-1.5 bg-slate-100 text-slate-700 font-bold text-xs uppercase rounded hover:bg-slate-200 flex justify-center items-center gap-1">
                        Staff
                      </button>
                      <button onClick={() => handleDelete(center.id, center.name)} className="flex-1 py-1.5 bg-red-50 text-red-600 font-bold text-xs uppercase rounded hover:bg-red-100 flex justify-center items-center gap-1">
                        <Trash2 size={14} /> Del
                      </button>`;

content = content.replace(buttonsStr, newButtonsStr);

fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', content);
