const fs = require('fs');
let content = fs.readFileSync('src/components/AdminJobRequirementsScreen.tsx', 'utf-8');

// replace categories initial state
content = content.replace(/const \[categories, setCategories\] = useState<string\[\]>\(\[[\s\S]*?\]\);/, 'const [categories, setCategories] = useState<string[]>([]);');

// remove newCategory state
content = content.replace(/const \[newCategory, setNewCategory\] = useState\(''\);\n/, '');
// remove showAddCategory state
content = content.replace(/const \[showAddCategory, setShowAddCategory\] = useState\(false\);\n/, '');

// replace fetchCategories
const newFetchCategories = `  const fetchCategories = async () => {
    try {
      const q = query(collection(db, 'job_categories'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      const activeCategories = snap.docs.map(d => d.data()).filter(c => c.status !== 'Inactive').map(c => c.name);
      setCategories(activeCategories);
    } catch (err) {
      console.error(err);
    }
  };`;
content = content.replace(/const fetchCategories = async \(\) => \{[\s\S]*?\};\n\n  const fetchJobs/m, newFetchCategories + '\n\n  const fetchJobs');

// remove handleAddCategory
content = content.replace(/const handleAddCategory = async \(\) => \{[\s\S]*?\};\n\n  const handleSaveJob/m, 'const handleSaveJob');

// update Job Category UI
const newJobCategoryUI = `                  <select required value={formData.jobCategory} onChange={e => setFormData({...formData, jobCategory: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white">
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>`;
content = content.replace(/\{!showAddCategory \? \([\s\S]*?\}\)/m, newJobCategoryUI);

fs.writeFileSync('src/components/AdminJobRequirementsScreen.tsx', content);
console.log("AdminJobRequirementsScreen.tsx patched");
