const fs = require('fs');
let content = fs.readFileSync('src/components/JobAdminDashboardScreen.tsx', 'utf8');

const importReplacement = "import { ArrowLeft, LogOut, Users, FileBarChart, Briefcase, List, UserCheck, Plus } from 'lucide-react';";
content = content.replace(
  "import { ArrowLeft, LogOut, Users, FileBarChart, Briefcase, List, UserCheck } from 'lucide-react';",
  importReplacement
);

const actionReplacement = `<div className="flex-1 p-6">
        <button
          onClick={() => navigate('/admin/job-requirements', { state: { openNew: true } })}
          className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mb-6"
        >
          <Plus size={20} />
          ADD NEW JOB
        </button>
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h2>`;

content = content.replace(
  `<div className="flex-1 p-6">
        <h2 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Quick Actions</h2>`,
  actionReplacement
);

fs.writeFileSync('src/components/JobAdminDashboardScreen.tsx', content);
