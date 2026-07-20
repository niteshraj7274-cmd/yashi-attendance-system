import re

with open('src/components/AdminAttendanceDashboardScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    '<span className="text-xs text-rose-600 font-bold">{r[\'OUT Time\']}</span>',
    '<span className="text-xs text-rose-600 font-bold">{r[\'OUT Time\']}</span> {r[\'OUT Type\'] === \'System Auto OUT\' && <span className="ml-1 text-[8px] bg-red-100 text-red-600 px-1 py-0.5 rounded font-bold uppercase" title="Auto Generated OUT">Auto OUT</span>}'
)

with open('src/components/AdminAttendanceDashboardScreen.tsx', 'w') as f:
    f.write(content)
