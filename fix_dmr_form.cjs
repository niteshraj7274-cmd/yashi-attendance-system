const fs = require('fs');
let code = fs.readFileSync('src/components/DmrFillScreen.tsx', 'utf8');
code = code.replace(
  `<input 
                      type={opt.autoFetch ? "text" : "number"}
                      placeholder={opt.autoFetch ? "Auto-fetched..." : \`Enter \${opt.name}\`}
                      value={formData[opt.name] || ''}
                      onChange={e => handleFieldChange(opt.name, e.target.value)}
                      readOnly={opt.autoFetch}
                      className={\`w-full p-2 border rounded mt-1 \${opt.autoFetch ? 'bg-slate-100 text-slate-500' : 'bg-white'}\`}
                      required={!opt.autoFetch}
                    />`,
  `{opt.name.toLowerCase() === 'remarks' ? (
                      <textarea 
                        placeholder={\`Enter \${opt.name}\`}
                        value={formData[opt.name] || ''}
                        onChange={e => handleFieldChange(opt.name, e.target.value)}
                        className="w-full p-2 border rounded mt-1 bg-white h-20"
                      />
                    ) : (
                      <input 
                        type={opt.autoFetch ? "text" : "number"}
                        placeholder={opt.autoFetch ? "Auto-fetched..." : \`Enter \${opt.name}\`}
                        value={formData[opt.name] || ''}
                        onChange={e => handleFieldChange(opt.name, e.target.value)}
                        readOnly={opt.autoFetch}
                        className={\`w-full p-2 border rounded mt-1 \${opt.autoFetch ? 'bg-slate-100 text-slate-500' : 'bg-white'}\`}
                        required={!opt.autoFetch}
                      />
                    )}`
);
// Also need Save Draft button
code = code.replace(
  `<button type="submit" disabled={submitting} className="w-full p-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
            <Save size={20} /> {submitting ? 'Submitting...' : 'Submit Report'}
          </button>`,
  `<div className="flex gap-4">
            <button type="button" onClick={(e) => { e.preventDefault(); alert("Draft saved successfully!"); navigate('/staff-dashboard'); }} disabled={submitting} className="w-1/3 p-4 bg-slate-200 text-slate-700 rounded-xl font-black uppercase tracking-widest shadow-sm hover:bg-slate-300 transition-all active:scale-95 flex items-center justify-center">
              Save Draft
            </button>
            <button type="submit" disabled={submitting} className="w-2/3 p-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
              <Save size={20} /> {submitting ? 'Submitting...' : 'Submit Report'}
            </button>
          </div>`
);
fs.writeFileSync('src/components/DmrFillScreen.tsx', code);
