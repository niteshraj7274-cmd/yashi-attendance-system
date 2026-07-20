import os

def fix_any(filename):
    if not os.path.exists(filename): return
    with open(filename, 'r') as f:
        content = f.read()
    
    content = content.replace("snap.docs.map(d => ({ id: d.id, ...d.data() }));", "snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as any[];")
    content = content.replace("snap.docs.map(d => ({ id: d.id, ...d.data() }))", "snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as any[]")
    
    with open(filename, 'w') as f:
        f.write(content)

fix_any('src/components/AdminErrorLogsScreen.tsx')
fix_any('src/components/AdminLoginHistoryScreen.tsx')
fix_any('src/components/AdminBackupRestoreScreen.tsx')

