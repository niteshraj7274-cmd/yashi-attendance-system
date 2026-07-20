with open('src/App.tsx', 'r') as f:
    content = f.read()

import_statement = """const AdminErrorLogsScreen = lazy(() => import('./components/AdminErrorLogsScreen'));
const AdminAiDashboardScreen = lazy(() => import('./components/AdminAiDashboardScreen'));
const AiSupportScreen = lazy(() => import('./components/AiSupportScreen'));"""

content = content.replace("const AdminErrorLogsScreen = lazy(() => import('./components/AdminErrorLogsScreen'));", import_statement)

route_statement = """          <Route path="/admin/error-logs" element={<ProtectedRoute role="admin"><AdminErrorLogsScreen /></ProtectedRoute>} />
          <Route path="/admin/ai-dashboard" element={<ProtectedRoute role="admin"><AdminAiDashboardScreen /></ProtectedRoute>} />
          <Route path="/admin/ai-support" element={<ProtectedRoute role="admin"><AiSupportScreen /></ProtectedRoute>} />"""

content = content.replace('<Route path="/admin/error-logs" element={<ProtectedRoute role="admin"><AdminErrorLogsScreen /></ProtectedRoute>} />', route_statement)

with open('src/App.tsx', 'w') as f:
    f.write(content)

