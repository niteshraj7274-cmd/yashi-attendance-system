const fs = require('fs');
let content = fs.readFileSync('src/components/AdminStaffManagementScreen.tsx', 'utf8');

const buttonMatch = `<button onClick={() => handleEdit(s)} className="w-full py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs uppercase rounded hover:bg-indigo-100 flex justify-center items-center gap-1">
                        <Edit size={14} /> Edit Staff
                      </button>`;
                      
const newButtonMatch = `<div className="flex gap-2">
                        <button onClick={() => handleEdit(s)} className="flex-1 py-1.5 bg-indigo-50 text-indigo-700 font-bold text-xs uppercase rounded hover:bg-indigo-100 flex justify-center items-center gap-1">
                          <Edit size={14} /> Edit
                        </button>
                        <button onClick={() => handleDelete(s.id, s.name)} className="flex-1 py-1.5 bg-red-50 text-red-600 font-bold text-xs uppercase rounded hover:bg-red-100 flex justify-center items-center gap-1">
                          <Trash2 size={14} /> Del
                        </button>
                      </div>`;

content = content.replace(buttonMatch, newButtonMatch);
fs.writeFileSync('src/components/AdminStaffManagementScreen.tsx', content);
