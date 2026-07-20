const fs = require('fs');
const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  '<Route path="/admin-login" element={<ProtectedRoute role="admin"><AdminLoginScreen /></ProtectedRoute>} />',
  '<Route path="/admin-login" element={<AdminLoginScreen />} />'
);

// wait, did it import ProtectedRoute correctly? I didn't verify the import replacement.
if (!content.includes('import ProtectedRoute')) {
  // Try adding it to the top.
  content = "import ProtectedRoute from './components/ProtectedRoute';\n" + content;
}

fs.writeFileSync(path, content);
