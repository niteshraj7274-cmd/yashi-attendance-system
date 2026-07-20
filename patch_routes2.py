import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

imports = """
const AdminLoginHistoryScreen = lazy(() => import('./components/AdminLoginHistoryScreen'));
const AdminErrorLogsScreen = lazy(() => import('./components/AdminErrorLogsScreen'));
"""
content = content.replace("const AdminBackupRestoreScreen = lazy(() => import('./components/AdminBackupRestoreScreen'));", "const AdminBackupRestoreScreen = lazy(() => import('./components/AdminBackupRestoreScreen'));\n" + imports)

routes = """          <Route path="/admin/login-history" element={<ProtectedRoute role="admin"><AdminLoginHistoryScreen /></ProtectedRoute>} />
          <Route path="/admin/error-logs" element={<ProtectedRoute role="admin"><AdminErrorLogsScreen /></ProtectedRoute>} />
"""
content = content.replace('<Route path="/admin/backup-restore" element={<ProtectedRoute role="admin"><AdminBackupRestoreScreen /></ProtectedRoute>} />', '<Route path="/admin/backup-restore" element={<ProtectedRoute role="admin"><AdminBackupRestoreScreen /></ProtectedRoute>} />\n' + routes)

with open('src/App.tsx', 'w') as f:
    f.write(content)

