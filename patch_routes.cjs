const fs = require('fs');
const path = 'src/App.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes('import ProtectedRoute')) {
  content = content.replace(
    "import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';",
    "import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';\nimport ProtectedRoute from './components/ProtectedRoute';"
  );
  
  // A simple regex to replace element={<Admin.../>} with element={<ProtectedRoute role="admin"><Admin.../></ProtectedRoute>}
  content = content.replace(/element={<(Admin[A-Za-z0-9]+)\s*\/>}/g, 'element={<ProtectedRoute role="admin"><$1 /></ProtectedRoute>}');

  // Do the same for DeveloperSettingsScreen
  content = content.replace(/element={<(DeveloperSettingsScreen)\s*\/>}/g, 'element={<ProtectedRoute role="developer"><$1 /></ProtectedRoute>}');

  fs.writeFileSync(path, content);
}
