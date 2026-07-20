import re

with open('src/components/AdminDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Add autoOutStats state
state_addition = """  const [autoOutStats, setAutoOutStats] = useState({ totalAutoOut: 0, manualOut: 0, pendingOut: 0, failedOut: 0, centerWise: {} as Record<string, number> });
"""
content = content.replace(
    "  const [staffStats, setStaffStats] = useState({ total: 0, active: 0, inactive: 0 });",
    "  const [staffStats, setStaffStats] = useState({ total: 0, active: 0, inactive: 0 });\n" + state_addition
)

# Modify getDocs(attQ) iteration
new_iteration = """        const snapshot = await getDocs(attQ);
        const counts: any = { Present: 0, Late: 0, 'Official Duty': 0, 'Outside Center': 0, Leave: 0, 'Half Day': 0 };
        let autoOut = 0;
        let manOut = 0;
        let pendOut = 0;
        const cWise: Record<string, number> = {};

        snapshot.forEach(doc => {
          const d = doc.data();
          const s = d['Attendance Status'] || 'Present';
          if (counts[s] !== undefined) counts[s]++;
          else counts[s] = 1;

          if (d['IN Time'] && !d['OUT Time']) {
             pendOut++;
          } else if (d['OUT Time']) {
             if (d['OUT Type'] === 'System Auto OUT' || d['Attendance Status'] === 'Auto Generated') {
                autoOut++;
                const cc = d['Center Code'] || d['Center Name'] || 'Unknown';
                cWise[cc] = (cWise[cc] || 0) + 1;
             } else {
                manOut++;
             }
          }
        });
        
        let failed = 0;
        try {
          const logSnap = await getDocs(collection(db, 'system_logs'));
          logSnap.forEach(d => {
            if (d.id.startsWith(`autoOut_${todayStr}`) && d.data().status === 'Failed') {
               failed++;
            }
          });
        } catch(e) {}

        setAutoOutStats({ totalAutoOut: autoOut, manualOut: manOut, pendingOut: pendOut, failedOut: failed, centerWise: cWise });
        setTodayCounts(counts as any);"""

content = re.sub(
    r'        const snapshot = await getDocs\(attQ\);.*?setTodayCounts\(counts as any\);',
    new_iteration,
    content,
    flags=re.DOTALL
)

# Add UI for Auto OUT summary
ui_addition = """
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-3 flex items-center gap-2">
             <Clock size={16} className="text-rose-500" /> Auto OUT Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
             <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg flex flex-col">
                <span className="text-xl font-bold text-rose-700">{autoOutStats.totalAutoOut}</span>
                <span className="text-[9px] font-bold text-rose-600 uppercase tracking-wider">Auto OUT Today</span>
             </div>
             <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg flex flex-col">
                <span className="text-xl font-bold text-indigo-700">{autoOutStats.manualOut}</span>
                <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-wider">Manual OUT</span>
             </div>
             <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg flex flex-col">
                <span className="text-xl font-bold text-amber-700">{autoOutStats.pendingOut}</span>
                <span className="text-[9px] font-bold text-amber-600 uppercase tracking-wider">Pending OUT</span>
             </div>
             <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex flex-col">
                <span className="text-xl font-bold text-red-700">{autoOutStats.failedOut}</span>
                <span className="text-[9px] font-bold text-red-600 uppercase tracking-wider">Failed Auto OUT</span>
             </div>
          </div>
          {Object.keys(autoOutStats.centerWise).length > 0 && (
             <div className="mt-2 text-xs flex flex-wrap gap-2">
               {Object.entries(autoOutStats.centerWise).map(([cc, count]) => (
                  <span key={cc} className="px-2 py-1 bg-slate-100 text-slate-600 font-bold rounded">
                    {cc}: {count as number} Auto OUT
                  </span>
               ))}
             </div>
          )}
"""

content = content.replace(
    '          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-3">Quick Actions</h2>',
    ui_addition + '\n          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-6 mb-3">Quick Actions</h2>'
)

with open('src/components/AdminDashboardScreen.tsx', 'w') as f:
    f.write(content)
