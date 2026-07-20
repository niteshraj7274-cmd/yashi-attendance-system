import re

with open('src/components/AutoOutDaemon.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    "'OUT Time': timeStr,",
    "'OUT Time': timeStr,\n          'OUT Date': dateStr,\n          'OUT Attendance': 'Success',\n          'OUT Status': 'Auto Generated',"
)
content = content.replace(
    "data['Center Code'] || centerId",
    "data['Center Code'] || center.code"
)

with open('src/components/AutoOutDaemon.tsx', 'w') as f:
    f.write(content)
