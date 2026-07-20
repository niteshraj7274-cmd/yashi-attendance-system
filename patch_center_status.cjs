const fs = require('fs');
let code = fs.readFileSync('src/components/AdminCenterManagementScreen.tsx', 'utf8');

const oldListStatus = `<div className={\`absolute left-0 top-0 bottom-0 w-1 \${center.status === 'Inactive' ? 'bg-slate-300' : 'bg-blue-500'}\`}></div>
                    <div className="flex justify-between items-start mb-2 pl-2">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg leading-tight">{center.name}</h3>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{center.code}</p>
                      </div>`;

const newListStatus = `<div className={\`absolute left-0 top-0 bottom-0 w-1 \${center.status === 'Inactive' ? 'bg-slate-300' : 'bg-blue-500'}\`}></div>
                    <div className="flex justify-between items-start mb-2 pl-2">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg leading-tight">{center.name}</h3>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{center.code}</p>
                      </div>
                      <select 
                        value={center.status}
                        onChange={async (e) => {
                          const newStatus = e.target.value;
                          try {
                            await updateDoc(doc(db, 'centers', center.id), { status: newStatus });
                            alert(\`Center status updated to \${newStatus}\`);
                          } catch (err) {
                            alert('Failed to update status');
                          }
                        }}
                        className={\`text-[10px] font-bold uppercase rounded px-2 py-1 outline-none \${center.status === 'Inactive' ? 'bg-slate-200 text-slate-600' : 'bg-blue-100 text-blue-700'}\`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>`;

code = code.replace(oldListStatus, newListStatus);
fs.writeFileSync('src/components/AdminCenterManagementScreen.tsx', code);
