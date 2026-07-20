const fs = require('fs');
let content = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

const oldGrid = `<div className="grid grid-cols-5 gap-2 border-t border-slate-100 pt-3 mt-3 mb-3">`;

const newGrid = `<div className="grid grid-cols-6 gap-2 border-t border-slate-100 pt-3 mt-3 mb-3">`;

const oldPresent = `<div className="text-center">
              <span className="block text-sm font-bold text-emerald-600">{todayCounts.Present + todayCounts.Late + todayCounts['Half Day']}</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Present</span>
            </div>`;

const newPresent = `<div className="text-center">
              <span className="block text-sm font-bold text-emerald-600">{todayCounts.Present + todayCounts['Half Day']}</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Present</span>
            </div>
            <div className="text-center">
              <span className="block text-sm font-bold text-amber-600">{todayCounts.Late}</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">Late</span>
            </div>`;

content = content.replace(oldGrid, newGrid).replace(oldPresent, newPresent);
fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', content);
