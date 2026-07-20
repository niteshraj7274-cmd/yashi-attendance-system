const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf8');

if (!content.includes('JobProtectedRoute')) {
  content = content.replace(
    "import ProtectedRoute from './components/ProtectedRoute';",
    "import ProtectedRoute from './components/ProtectedRoute';\nimport JobProtectedRoute from './components/JobProtectedRoute';"
  );
}

const jobRoutes = [
  '<Route path="/admin/job-requirements" element={<ProtectedRoute role="admin"><AdminJobRequirementsScreen /></ProtectedRoute>} />',
  '<Route path="/admin/job-categories" element={<ProtectedRoute role="admin"><AdminJobCategoriesScreen /></ProtectedRoute>} />',
  '<Route path="/admin/job-applications" element={<ProtectedRoute role="admin"><AdminJobApplicationsScreen /></ProtectedRoute>} />'
];

jobRoutes.forEach(r => {
  content = content.replace(r, r.replace('<ProtectedRoute role="admin">', '<JobProtectedRoute>').replace('</ProtectedRoute>', '</JobProtectedRoute>'));
});

fs.writeFileSync('src/App.tsx', content);
