import re

with open('src/components/AdminAttendanceTimingScreen.tsx', 'r') as f:
    content = f.read()

new_section = """
            {/* Section 5: Auto Attendance OUT */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                 <Clock size={16} /> Section 5: Auto Attendance OUT
              </h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3">
                   <input type="checkbox" checked={timings.autoOutEnabled} onChange={e => setTimings({...timings, autoOutEnabled: e.target.checked})} className="w-4 h-4 text-cyan-600 rounded" />
                   <span className="text-sm font-bold text-slate-700">Enable Auto Attendance OUT</span>
                </label>
                
                {timings.autoOutEnabled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Auto OUT Time</label>
                      <input type="time" value={timings.autoOutTime} onChange={e => setTimings({...timings, autoOutTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-medium" />
                    </div>
                  </div>
                )}
              </div>
            </div>
"""

# Find the end of Section 4
content = content.replace(
    '              </div>\n            </div>\n            \n          </div>',
    '              </div>\n            </div>\n            \n' + new_section + '\n          </div>'
)

with open('src/components/AdminAttendanceTimingScreen.tsx', 'w') as f:
    f.write(content)
