import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportAdminProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const sessionStr = localStorage.getItem('reportAdminSession');
    if (!sessionStr) {
      navigate('/report-management');
      return;
    }
    
    try {
      const session = JSON.parse(sessionStr);
      if (session.role === 'admin') {
        setAuthorized(true);
      } else {
        navigate('/report-management');
      }
    } catch (e) {
      navigate('/report-management');
    }
  }, [navigate]);

  if (!authorized) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
