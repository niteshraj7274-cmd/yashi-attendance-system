import re

with open('src/components/CentreAttendanceDashboardScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace("let status = att ? (att.status || att['Attendance Status']) : 'Pending';", "let status = att ? (att.status || att['Attendance Status']) : 'Absent';")
content = content.replace("if (!att && dateStr !== new Date().toISOString().split('T')[0]) {", "if (!att) {")

with open('src/components/CentreAttendanceDashboardScreen.tsx', 'w') as f:
    f.write(content)
