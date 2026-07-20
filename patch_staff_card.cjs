const fs = require('fs');
let content = fs.readFileSync('src/components/CentreStaffSelectionScreen.tsx', 'utf8');

const match = `                <div>
                  <h3 className="font-bold text-slate-800 text-sm tracking-wide line-clamp-1">{staff.name}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{staff.designation}</p>
                </div>`;

const newMatch = `                <div className="w-full flex flex-col items-center">
                  <h3 className="font-bold text-slate-800 text-sm tracking-wide line-clamp-1 w-full truncate">{staff.name}</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{staff.staffId || 'N/A'}</p>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1 bg-blue-50 px-2 py-0.5 rounded-full">{staff.designation}</p>
                  <p className={\`text-[9px] font-bold uppercase tracking-widest mt-1 px-2 py-0.5 rounded-full \${staff.status === 'Inactive' ? 'bg-slate-100 text-slate-500' : 'bg-green-100 text-green-700'}\`}>{staff.status || 'Active'}</p>
                </div>`;

content = content.replace(match, newMatch);
fs.writeFileSync('src/components/CentreStaffSelectionScreen.tsx', content);
