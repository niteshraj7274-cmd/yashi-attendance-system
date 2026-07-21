import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportAdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const sessionStr = localStorage.getItem('reportAdminSession');
    if (!sessionStr) {
      navigate('/report-management/admin-login');
      return;
    }
    
    try {
      const session = JSON.parse(sessionStr);
      if (session.role === 'admin' && session.uid) {
        setAuthorized(true);
      } else {
        navigate('/report-management/admin-login');
      }
    } catch (e) {
      navigate('/report-management/admin-login');
    }
  }, [navigate]);

  if (!authorized) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
