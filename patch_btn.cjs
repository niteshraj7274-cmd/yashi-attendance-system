const fs = require('fs');
let content = fs.readFileSync('src/components/AdminJobRequirementsScreen.tsx', 'utf-8');

const appBtnStr = `<button onClick={() => navigate('/admin/job-applications')} className="flex items-center gap-2 bg-emerald-600 border border-emerald-500 px-3 py-1.5 rounded-lg text-sm font-bold shadow hover:bg-emerald-500 transition-colors">
              <Users size={16} />
              Applications
            </button>`;

const newBtnStr = `<button onClick={() => navigate('/admin/job-categories')} className="flex items-center gap-2 bg-emerald-600 border border-emerald-500 px-3 py-1.5 rounded-lg text-sm font-bold shadow hover:bg-emerald-500 transition-colors">
              <Plus size={16} />
              Categories
            </button>\n            ` + appBtnStr;

content = content.replace(appBtnStr, newBtnStr);

fs.writeFileSync('src/components/AdminJobRequirementsScreen.tsx', content);
console.log("Button patched");
