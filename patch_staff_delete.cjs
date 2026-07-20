const fs = require('fs');
let content = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

const lucideMatch = `import { ArrowLeft, Building2, Plus, Search, Users, UserCircle, MapPin, Edit, Camera } from 'lucide-react';`;
const newLucideMatch = `import { ArrowLeft, Building2, Plus, Search, Users, UserCircle, MapPin, Edit, Camera, Trash2 } from 'lucide-react';`;
content = content.replace(lucideMatch, newLucideMatch);

const firestoreMatch = `import { collection, query, getDocs, updateDoc, doc, addDoc, serverTimestamp, where } from 'firebase/firestore';`;
const newFirestoreMatch = `import { collection, query, getDocs, updateDoc, doc, addDoc, serverTimestamp, where, deleteDoc } from 'firebase/firestore';`;
if (!content.includes('deleteDoc')) {
  content = content.replace(firestoreMatch, newFirestoreMatch);
}

const editFuncMatch = `  const handleEdit = (s: any) => {`;
const deleteFuncMatch = `
  const handleDelete = async (staffId: string, staffName: string) => {
    if (!window.confirm(\`Are you sure you want to delete \${staffName}?\`)) return;
    
    try {
      await deleteDoc(doc(db, 'staff', staffId));
      
      // Log audit
      const adminStr = localStorage.getItem('userSession');
      let adminName = 'Admin';
      if (adminStr) {
        try {
          const adminData = JSON.parse(atob(adminStr));
          adminName = adminData.name || 'Admin';
        } catch(e) {}
      }
      logAuditActivity(adminName, 'Staff', staffName, 'Deleted Staff', \`Deleted staff \${staffName}\`);
      
      fetchData();
    } catch (err) {
      console.error("Error deleting staff", err);
      alert("Failed to delete staff.");
    }
  };

  const handleEdit = (s: any) => {`;

if (!content.includes('handleDelete')) {
  content = content.replace(editFuncMatch, deleteFuncMatch);
}

const buttonMatch = `<button onClick={() => handleEdit(s)} className="flex-1 py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs uppercase rounded hover:bg-indigo-100 flex justify-center items-center gap-1">
                          <Edit size={14} /> Edit
                        </button>
                      </div>`;
const newButtonMatch = `<button onClick={() => handleEdit(s)} className="flex-1 py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs uppercase rounded hover:bg-indigo-100 flex justify-center items-center gap-1">
                          <Edit size={14} /> Edit
                        </button>
                        <button onClick={() => handleDelete(s.id, s.name)} className="flex-1 py-1.5 bg-red-50 text-red-600 font-bold text-xs uppercase rounded hover:bg-red-100 flex justify-center items-center gap-1">
                          <Trash2 size={14} /> Del
                        </button>
                      </div>`;

content = content.replace(buttonMatch, newButtonMatch);

fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', content);
