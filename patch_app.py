with open('src/App.tsx', 'r') as f:
    content = f.read()

if 'AdminProfessionalDashboardScreen' not in content:
    content = content.replace("const AdminDashboardScreen = lazy(() => import('./components/AdminDashboardScreen'));", "const AdminDashboardScreen = lazy(() => import('./components/AdminDashboardScreen'));\nconst AdminProfessionalDashboardScreen = lazy(() => import('./components/AdminProfessionalDashboardScreen'));")
    
    content = content.replace('<Route path="/admin-dashboard"', '<Route path="/admin/professional-dashboard" element={<ProtectedRoute role="admin"><AdminProfessionalDashboardScreen /></ProtectedRoute>} />\n              <Route path="/admin-dashboard"')
    
    with open('src/App.tsx', 'w') as f:
        f.write(content)
