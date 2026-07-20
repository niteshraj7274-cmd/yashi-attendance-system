import re

with open('src/components/AdminAttendanceDashboardScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "let fetched = snap.docs.map(d => ({ id: d.id, ...d.data() }));",
    "let fetched = snap.docs.map(d => ({ id: d.id, ...d.data() } as any));"
)

with open('src/components/AdminAttendanceDashboardScreen.tsx', 'w') as f:
    f.write(content)
