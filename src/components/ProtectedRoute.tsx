import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role }: { children: React.ReactNode, role: string }) {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (role === 'admin') {
      const sessionStr = localStorage.getItem('userSession');
      if (!sessionStr) {
        navigate('/admin-login');
        return;
      }
      try {
        const session = JSON.parse(sessionStr);
        if (session.role === 'admin') {
          setAuthorized(true);
        } else {
          navigate('/admin-login');
        }
      } catch(e) {
        navigate('/admin-login');
      }
    } else if (role === 'developer') {
      const sessionStr = localStorage.getItem('userSession');
      if (!sessionStr) {
        navigate('/developer-login');
        return;
      }
      try {
        const session = JSON.parse(atob(sessionStr));
        if (session.role === 'developer') {
          setAuthorized(true);
        } else {
          navigate('/developer-login');
        }
      } catch(e) {
        navigate('/developer-login');
      }
    } else if (role === 'staff') {
      const sessionStr = localStorage.getItem('userSession');
      if (!sessionStr) {
        navigate('/centre-login');
        return;
      }
      try {
        const session = JSON.parse(sessionStr);
        if (session.role === 'staff') {
          setAuthorized(true);
        } else {
          navigate('/centre-login');
        }
      } catch(e) {
        navigate('/centre-login');
      }
    }
  }, [navigate, role]);

  if (!authorized) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <>{children}</>;
}
