import os
import re

# Fix AdminDashboardScreen
with open('src/components/AdminDashboardScreen.tsx', 'r') as f:
    content = f.read()

if "import { Shield" not in content and "import {Shield" not in content:
    content = content.replace("import { ", "import { Shield, ")

with open('src/components/AdminDashboardScreen.tsx', 'w') as f:
    f.write(content)


# Fix ErrorBoundary
for filename in ['src/components/ErrorBoundary.tsx', 'src/components/GlobalErrorBoundary.tsx']:
    if not os.path.exists(filename): continue
    with open(filename, 'r') as f:
        content = f.read()
    
    # We can cast this as any inside the arrow functions just to silence the error if it's acting up
    content = content.replace('this.setState({', '(this as any).setState({')
    content = content.replace('this.props.children', '(this as any).props.children')
    
    with open(filename, 'w') as f:
        f.write(content)

# Fix timestamp in history screens
def fix_timestamp(filename):
    if not os.path.exists(filename): return
    with open(filename, 'r') as f:
        content = f.read()
    content = content.replace("(a as any).timestamp?.toMillis", "((a as any).timestamp?.toMillis ? (a as any).timestamp.toMillis() : 0)")
    content = content.replace("(b as any).timestamp?.toMillis", "((b as any).timestamp?.toMillis ? (b as any).timestamp.toMillis() : 0)")
    with open(filename, 'w') as f:
        f.write(content)

fix_timestamp('src/components/AdminErrorLogsScreen.tsx')
fix_timestamp('src/components/AdminLoginHistoryScreen.tsx')

