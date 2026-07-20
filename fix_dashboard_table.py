import re

with open('src/components/AdminAttendanceDashboardScreen.tsx', 'r') as f:
    content = f.read()

# Replace <td className="px-4 py-3"> with <td className="px-4 py-3 whitespace-nowrap"> if it's not already there.
# Wait, let's just make sure the table has 'whitespace-nowrap'.
# The user wants "ek row line me show kijey details jo hai"
# Currently in AdminAttendanceDashboardScreen:
#                       <td className="px-4 py-3">
#                         <div className="font-bold text-slate-800">{r['Staff Name']}</div>
#                         <div className="text-xs text-slate-500">{r['Staff ID'] || r.staffId}</div>
#                       </td>
# This stacks the name and ID. The user wants it in ONE line.

# Let's change those stacked divs into a single line:
content = content.replace(
    '<div className="font-bold text-slate-800">{r[\'Staff Name\']}</div>\n                          <div className="text-xs text-slate-500">{r[\'Staff ID\'] || r.staffId}</div>',
    '<div className="font-bold text-slate-800 flex items-center gap-2">{r[\'Staff Name\']} <span className="text-xs text-slate-500 font-normal">({r[\'Staff ID\'] || r.staffId})</span></div>'
)

content = content.replace(
    '<div className="font-bold text-slate-800">{r[\'Center Name\'] || \'N/A\'}</div>\n                          <div className="text-xs text-slate-500">{r[\'Center Code\'] || \'N/A\'}</div>',
    '<div className="font-bold text-slate-800 flex items-center gap-2">{r[\'Center Name\'] || \'N/A\'} <span className="text-xs text-slate-500 font-normal">({r[\'Center Code\'] || \'N/A\'})</span></div>'
)

content = content.replace(
    '<div className="font-bold text-slate-800">{r.Date || r.date || \'N/A\'}</div>\n                          <div className="text-xs text-emerald-600 font-bold">{r[\'IN Time\'] || r.time || \'N/A\'}</div>',
    '<div className="font-bold text-slate-800 flex items-center gap-2">{r.Date || r.date || \'N/A\'} <span className="text-xs text-emerald-600 font-bold">{r[\'IN Time\'] || r.time || \'N/A\'}</span></div>'
)

content = content.replace(
    '<div className="font-bold text-slate-800">{r.Date || r.date || \'N/A\'}</div>\n                              <div className="text-xs text-rose-600 font-bold">{r[\'OUT Time\']}</div>',
    '<div className="font-bold text-slate-800 flex items-center gap-2">{r.Date || r.date || \'N/A\'} <span className="text-xs text-rose-600 font-bold">{r[\'OUT Time\']}</span></div>'
)

with open('src/components/AdminAttendanceDashboardScreen.tsx', 'w') as f:
    f.write(content)
