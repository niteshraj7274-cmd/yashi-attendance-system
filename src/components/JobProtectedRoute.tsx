import React from 'react';
import { Navigate } from 'react-router-dom';

export default function JobProtectedRoute({ children }: { children: React.ReactNode }) {
  const sessionStr = localStorage.getItem('jobAdminSession');
  if (!sessionStr) {
    return <Navigate to="/job-admin-login" replace />;
  }
  return <>{children}</>;
}
