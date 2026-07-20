import re

with open('src/components/AdminAttendanceDashboardScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "'Out Time': r['OUT Time'] || 'N/A',",
    "'Out Time': r['OUT Time'] || 'N/A',\n      'OUT Type': r['OUT Type'] || (r['OUT Time'] ? 'Manual OUT' : 'N/A'),"
)

content = content.replace(
    'const tableColumn = ["Staff Name", "Staff Code", "Center", "Type", "Lat/Lng", "In Time", "Out Time", "Work Hrs", "Status"];',
    'const tableColumn = ["Staff Name", "Staff Code", "Center", "Type", "Lat/Lng", "In Time", "Out Time", "Out Type", "Work Hrs", "Status"];'
)

content = content.replace(
    '      `${r[\'Out Date\']} \\n${r[\'Out Time\']}`,\n      r[\'Working Hours\'],',
    '      `${r[\'Out Date\']} \\n${r[\'Out Time\']}`,\n      r[\'OUT Type\'],\n      r[\'Working Hours\'],'
)

with open('src/components/AdminAttendanceDashboardScreen.tsx', 'w') as f:
    f.write(content)
