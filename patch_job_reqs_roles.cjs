const fs = require('fs');
let content = fs.readFileSync('src/components/AdminJobRequirementsScreen.tsx', 'utf8');

const defaultCategories = [
  'KYP (Kushal Yuva Program)',
  'Learner Facilitator (L.F.)',
  'Mobilization Executive',
  'Center Coordinator',
  'Night Guard',
  'Safai Karmchari',
  'Commission Based Worker',
  'Block Manager'
];

// Update fetchCategories to include default categories uniquely
const newFetchCategories = `  const fetchCategories = async () => {
    try {
      const q = query(collection(db, 'job_categories'), orderBy('timestamp', 'desc'));
      const snap = await getDocs(q);
      const activeCategories = snap.docs.map(d => d.data()).filter(c => c.status !== 'Inactive').map(c => c.name);
      
      const defaultCats = [
        'KYP (Kushal Yuva Program)',
        'Learner Facilitator (L.F.)',
        'Mobilization Executive',
        'Center Coordinator',
        'Night Guard',
        'Safai Karmchari',
        'Commission Based Worker',
        'Block Manager'
      ];
      
      const allCats = Array.from(new Set([...defaultCats, ...activeCategories]));
      setCategories(allCats);
    } catch (err) {
      console.error(err);
    }
  };`;

content = content.replace(/const fetchCategories = async \(\) => \{[\s\S]*?catch \(err\) \{\n\s*console.error\(err\);\n\s*\}\n\s*\};/m, newFetchCategories);

const oldJobTypeDropdown = `<select value={formData.jobType} onChange={e => setFormData({...formData, jobType: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white">
                    <option value="">Select</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                  </select>`;

const newJobTypeDropdown = `<select value={formData.jobType} onChange={e => setFormData({...formData, jobType: e.target.value})} className="w-full p-2 border rounded-lg text-sm bg-slate-50 focus:bg-white">
                    <option value="">Select</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Internship">Internship</option>
                    <option value="Commission Based">Commission Based</option>
                  </select>`;

content = content.replace(oldJobTypeDropdown, newJobTypeDropdown);

fs.writeFileSync('src/components/AdminJobRequirementsScreen.tsx', content);
