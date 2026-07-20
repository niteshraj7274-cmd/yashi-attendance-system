import os

def fix_screen(filename):
    if not os.path.exists(filename): return
    with open(filename, 'r') as f:
        content = f.read()
    content = content.replace("a.timestamp?.toMillis", "(a as any).timestamp?.toMillis")
    content = content.replace("b.timestamp?.toMillis", "(b as any).timestamp?.toMillis")
    content = content.replace("b.timestamp?.toDate", "(b as any).timestamp?.toDate")
    content = content.replace("b.timestamp.toDate", "(b as any).timestamp.toDate")
    with open(filename, 'w') as f:
        f.write(content)

fix_screen('src/components/AdminBackupRestoreScreen.tsx')
fix_screen('src/components/AdminErrorLogsScreen.tsx')
fix_screen('src/components/AdminLoginHistoryScreen.tsx')

def fix_error_boundary(filename):
    if not os.path.exists(filename): return
    with open(filename, 'r') as f:
        content = f.read()
    content = content.replace("extends Component<Props, State>", "extends React.Component<Props, State>")
    with open(filename, 'w') as f:
        f.write(content)

fix_error_boundary('src/components/ErrorBoundary.tsx')
fix_error_boundary('src/components/GlobalErrorBoundary.tsx')

