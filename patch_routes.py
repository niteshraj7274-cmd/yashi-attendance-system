import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add imports
imports = """
const AdminSecurityDashboardScreen = lazy(() => import('./components/AdminSecurityDashboardScreen'));
const AdminBackupRestoreScreen = lazy(() => import('./components/AdminBackupRestoreScreen'));
"""
content = content.replace("const AdminAuditLogScreen = lazy(() => import('./components/AdminAuditLogScreen'));", "const AdminAuditLogScreen = lazy(() => import('./components/AdminAuditLogScreen'));" + imports)

# Add routes
routes = """          <Route path="/admin/security-dashboard" element={<ProtectedRoute role="admin"><AdminSecurityDashboardScreen /></ProtectedRoute>} />
          <Route path="/admin/backup-restore" element={<ProtectedRoute role="admin"><AdminBackupRestoreScreen /></ProtectedRoute>} />
"""
content = content.replace('<Route path="/admin/audit-logs" element={<ProtectedRoute role="admin"><AdminAuditLogScreen /></ProtectedRoute>} />', '<Route path="/admin/audit-logs" element={<ProtectedRoute role="admin"><AdminAuditLogScreen /></ProtectedRoute>} />\n' + routes)

with open('src/App.tsx', 'w') as f:
    f.write(content)

