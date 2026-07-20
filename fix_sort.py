import os

def fix_sort(filename):
    if not os.path.exists(filename): return
    with open(filename, 'r') as f:
        content = f.read()
    
    import re
    # Replace the data.sort block
    content = re.sub(
        r"data\.sort\(\(a, b\) => \{.*?return tB - tA;.*?\}\);",
        r"data.sort((a, b) => {\n         const tA = (a as any).timestamp?.toMillis ? (a as any).timestamp.toMillis() : 0;\n         const tB = (b as any).timestamp?.toMillis ? (b as any).timestamp.toMillis() : 0;\n         return tB - tA;\n      });",
        content,
        flags=re.DOTALL
    )
    with open(filename, 'w') as f:
        f.write(content)

fix_sort('src/components/AdminErrorLogsScreen.tsx')
fix_sort('src/components/AdminLoginHistoryScreen.tsx')
