import fs from 'fs';

let content = fs.readFileSync('src/components/StaffDashboardScreen.tsx', 'utf8');

const oldHeader = `<div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase leading-tight">Live Attendance</h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Staff: {staffData.name || staffData.staffId}</p>
          </div>`;

const newHeader = `<div className="flex-1">
            <h1 className="text-xl font-bold tracking-tight uppercase leading-tight flex items-center gap-2">
              Live Attendance
              <div className={\`flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full border \${isOnline ? 'bg-emerald-500/20 border-emerald-400 text-emerald-100' : 'bg-red-500/20 border-red-400 text-red-100'}\`}>
                <div className={\`w-1.5 h-1.5 rounded-full \${isOnline ? 'bg-emerald-400' : 'bg-red-400'}\`}></div>
                {isOnline ? 'ONLINE' : 'OFFLINE'}
              </div>
            </h1>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Staff: {staffData.name || staffData.staffId}</p>
          </div>`;

if (content.includes(oldHeader)) {
    content = content.replace(oldHeader, newHeader);
    fs.writeFileSync('src/components/StaffDashboardScreen.tsx', content);
    console.log("Successfully patched StaffDashboardScreen header");
} else {
    console.log("Could not find old header to replace");
}
