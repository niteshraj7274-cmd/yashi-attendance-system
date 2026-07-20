import re

with open('src/components/AutoOutDaemon.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'data.centerId === centerId || data[\'Center Code\'] === centerId || data.centerId === centerId',
    'data[\'Center Code\'] === center.code || data.centerId === center.id'
)

content = content.replace(
    'processAutoOutForCenter(today, center.id, autoOutTime, timings.autoOutReason || \'Auto Attendance OUT by Admin Settings\');',
    'processAutoOutForCenter(today, center, autoOutTime, timings.autoOutReason || \'Auto Attendance OUT by Admin Settings\');'
)

content = content.replace(
    'const processAutoOutForCenter = async (dateStr: string, centerId: string, timeStr: string, reason: string) => {',
    'const processAutoOutForCenter = async (dateStr: string, center: any, timeStr: string, reason: string) => {'
)

with open('src/components/AutoOutDaemon.tsx', 'w') as f:
    f.write(content)
