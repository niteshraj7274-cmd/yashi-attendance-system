import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportClientProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const sessionStr = localStorage.getItem('reportClientSession');
    if (!sessionStr) {
      navigate('/report-management/client-login');
      return;
    }
    
    try {
      const session = JSON.parse(sessionStr);
      if (session.role === 'client' && session.uid) {
        setAuthorized(true);
      } else {
        navigate('/report-management/client-login');
      }
    } catch (e) {
      navigate('/report-management/client-login');
    }
  }, [navigate]);

  if (!authorized) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
