const fs = require('fs');
let content = fs.readFileSync('src/components/AdminReportsScreen.tsx', 'utf8');

if (!content.includes('import { doc, updateDoc } from \'firebase/firestore\';')) {
  content = content.replace(
    /import { collection, onSnapshot, query, orderBy, limit } from 'firebase\/firestore';/,
    "import { collection, onSnapshot, query, orderBy, limit, doc, updateDoc } from 'firebase/firestore';"
  );
}

if (!content.includes('import { getStorage, ref, deleteObject } from \'firebase/storage\';')) {
  content = content.replace(
    /import { db } from '\.\.\/firebase';/,
    "import { db, storage } from '../firebase';\nimport { ref, deleteObject } from 'firebase/storage';"
  );
}

if (!content.includes('const handleDeleteSelfie')) {
  content = content.replace(
    /const exportPDF = \(\) => \{/,
    `const handleDeleteSelfie = async (recordId: string, type: 'IN' | 'OUT', url: string) => {
    if (!window.confirm('Are you sure you want to delete this selfie? The attendance record will remain intact.')) return;
    try {
      if (url) {
        try {
          const imageRef = ref(storage, url);
          await deleteObject(imageRef);
        } catch(e) {
          console.warn("Could not delete from storage, might already be deleted", e);
        }
      }
      const fieldToUpdate = type === 'IN' ? 'Selfie Image URL' : 'OUT Selfie Image URL';
      await updateDoc(doc(db, 'attendance', recordId), {
        [fieldToUpdate]: null
      });
      alert('Selfie deleted successfully.');
    } catch (err) {
      console.error("Error deleting selfie:", err);
      alert('Failed to delete selfie.');
    }
  };

  const exportPDF = () => {`
  );
}

// Replace Selfie (IN) block
content = content.replace(
  /\{record\['Selfie Image URL'\] && \([\s\S]*?Selfie \(IN\)[\s\S]*?<\/a>\s*<\/div>\s*\)\}/,
  `{record['Selfie Image URL'] && (
                  <div className="mt-2 flex flex-col gap-2">
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Selfie (IN)</p>
                     <div className="flex items-center gap-4">
                       <a href={record['Selfie Image URL']} target="_blank" rel="noopener noreferrer" className="shrink-0"><img loading="lazy" src={record['Selfie Image URL']} alt="Selfie IN" className="w-20 h-20 object-cover rounded-lg border border-slate-200 hover:opacity-80 transition-opacity cursor-pointer" /></a>
                       <div className="flex flex-col gap-2">
                         <a href={record['Selfie Image URL']} target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded text-xs font-bold uppercase hover:bg-blue-100 text-center">View Selfie</a>
                         <button onClick={() => handleDeleteSelfie(record.id, 'IN', record['Selfie Image URL'])} className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded text-xs font-bold uppercase hover:bg-red-100">Delete Selfie</button>
                       </div>
                     </div>
                  </div>
                )}`
);

// Replace Selfie (OUT) block
content = content.replace(
  /\{record\['OUT Selfie Image URL'\] && \([\s\S]*?Selfie \(OUT\)[\s\S]*?<\/a>\s*<\/div>\s*\)\}/,
  `{record['OUT Selfie Image URL'] && (
                  <div className="mt-2 flex flex-col gap-2">
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Selfie (OUT)</p>
                     <div className="flex items-center gap-4">
                       <a href={record['OUT Selfie Image URL']} target="_blank" rel="noopener noreferrer" className="shrink-0"><img loading="lazy" src={record['OUT Selfie Image URL']} alt="Selfie OUT" className="w-20 h-20 object-cover rounded-lg border border-slate-200 hover:opacity-80 transition-opacity cursor-pointer" /></a>
                       <div className="flex flex-col gap-2">
                         <a href={record['OUT Selfie Image URL']} target="_blank" rel="noopener noreferrer" className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1.5 rounded text-xs font-bold uppercase hover:bg-blue-100 text-center">View Selfie</a>
                         <button onClick={() => handleDeleteSelfie(record.id, 'OUT', record['OUT Selfie Image URL'])} className="bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded text-xs font-bold uppercase hover:bg-red-100">Delete Selfie</button>
                       </div>
                     </div>
                  </div>
                )}`
);

fs.writeFileSync('src/components/AdminReportsScreen.tsx', content);
