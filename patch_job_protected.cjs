const fs = require('fs');
let content = fs.readFileSync('src/components/JobProtectedRoute.tsx', 'utf8');
content = `import React from 'react';
import { Navigate } from 'react-router-dom';

export default function JobProtectedRoute({ children }: { children: React.ReactNode }) {
  const sessionStr = localStorage.getItem('jobAdminSession');
  if (!sessionStr) {
    return <Navigate to="/job-admin-login" replace />;
  }
  return <>{children}</>;
}
`;
fs.writeFileSync('src/components/JobProtectedRoute.tsx', content);
