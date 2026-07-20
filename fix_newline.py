with open('src/components/AdminBackupRestoreScreen.tsx', 'r') as f:
    content = f.read()

content = content.replace("join('\n');", r"join('\n');")

with open('src/components/AdminBackupRestoreScreen.tsx', 'w') as f:
    f.write(content)
