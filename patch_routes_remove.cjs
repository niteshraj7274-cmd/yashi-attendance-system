const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

const routesToRemove = [
  '<Route path="/admin/centers" element={<ProtectedRoute role="admin"><AdminCenterListScreen /></ProtectedRoute>} />',
  '<Route path="/admin/centers/new" element={<ProtectedRoute role="admin"><AdminCenterFormScreen /></ProtectedRoute>} />',
  '<Route path="/admin/centers/:id/edit" element={<ProtectedRoute role="admin"><AdminCenterFormScreen /></ProtectedRoute>} />',
  '<Route path="/admin/staff" element={<ProtectedRoute role="admin"><AdminStaffListScreen /></ProtectedRoute>} />',
  '<Route path="/admin/staff/new" element={<ProtectedRoute role="admin"><AdminStaffFormScreen /></ProtectedRoute>} />',
  '<Route path="/admin/staff/:id/edit" element={<ProtectedRoute role="admin"><AdminStaffFormScreen /></ProtectedRoute>} />'
];

routesToRemove.forEach(route => {
  content = content.replace(route, '');
});

fs.writeFileSync('src/App.tsx', content);
