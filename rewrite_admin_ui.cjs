const fs = require('fs');
let code = fs.readFileSync('src/components/AdminOfficialDutyScreen.tsx', 'utf8');

const regex = /<motion\.div[\s\S]*?<\/motion\.div>/g;
const newUI = `<motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={req.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">{req['Staff Name']}</h3>
                    <p className="text-xs text-slate-500 font-medium">{req['Staff ID']} • {req['Center Name']}</p>
                  </div>
                  <div className="bg-amber-50 text-amber-600 px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border border-amber-100">
                    {req['Status']}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-3 rounded-lg border border-slate-100">
                   <div className="flex flex-col gap-1">
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Date & Time</p>
                     <p className="font-medium text-slate-800">{req.Date} • {req['Time']}</p>
                   </div>
                   <div className="flex flex-col gap-1">
                     <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Duty Type</p>
                     <p className="font-medium text-slate-800">{req['Duty Type']}</p>
                   </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Reason</p>
                    <p className="text-sm text-slate-800 font-medium">{req['Reason']}</p>
                  </div>
                  {req['Remarks'] && (
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Remarks</p>
                    <p className="text-xs text-slate-500 italic">{req['Remarks']}</p>
                  </div>
                  )}
                  
                  {req['Google Maps Link'] && (
                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <MapPin size={14} className="text-blue-500 shrink-0 mt-0.5" />
                      <div>
                         <a href={req['Google Maps Link']} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-bold hover:underline inline-block">Open in Google Maps</a>
                      </div>
                    </div>
                  )}

                  {req['Photo'] && (
                    <div className="mt-2">
                       <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Supporting Photo</p>
                       <img src={req['Photo']} alt="OD Photo" className="w-20 h-20 object-cover rounded-lg border border-slate-200" />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-3 border-t border-slate-100">
                  <button 
                    onClick={() => handleAction(req, 'Rejected')}
                    className="flex-1 py-2.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 font-bold uppercase tracking-wide text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                  <button 
                    onClick={() => handleAction(req, 'Approved')}
                    className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-bold uppercase tracking-wide text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 size={16} /> Approve
                  </button>
                </div>
              </motion.div>`;
code = code.replace(regex, newUI);
fs.writeFileSync('src/components/AdminOfficialDutyScreen.tsx', code);
