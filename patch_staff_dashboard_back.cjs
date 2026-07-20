const fs = require('fs');
const path = 'src/components/StaffDashboardScreen.tsx';
let content = fs.readFileSync(path, 'utf8');

const target = `<div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase">Live Attendance</h1>`;

const replacement = `<div className="flex justify-between items-start gap-3">
          <button onClick={() => navigate(\`/centre/\${staffData.centerId}/staff\`)} className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors mt-0.5 shrink-0">
            <ArrowLeft size={20} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase leading-tight">Live Attendance</h1>`;

content = content.replace(target, replacement);

if(!content.includes("ArrowLeft")) {
  content = content.replace("import { LogOut", "import { ArrowLeft, LogOut");
}

fs.writeFileSync(path, content);
