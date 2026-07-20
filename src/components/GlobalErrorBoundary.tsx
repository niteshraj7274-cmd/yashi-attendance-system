import React, { Component, ErrorInfo, ReactNode } from 'react';
import { collection, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { AlertOctagon, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // Log to Firebase
    this.logErrorToFirebase(error, errorInfo);
  }
  
  private async logErrorToFirebase(error: Error, errorInfo: ErrorInfo) {
    try {
      await setDoc(doc(collection(db, 'error_logs')), {
        name: error.name || 'UnknownError',
        message: error.message || 'An unexpected error occurred',
        stack: error.stack || errorInfo.componentStack || '',
        date: new Date().toLocaleDateString('en-CA'),
        time: new Date().toLocaleTimeString('en-IN'),
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent
      });
    } catch (e) {
      console.error("Failed to log error to Firebase", e);
    }
  }

  private handleGoBack = () => {
    // Attempt crash recovery by going back or home
    (this as any).setState({ hasError: false, error: null });
    window.history.back();
  };

  private handleGoHome = () => {
    (this as any).setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-rose-200">
            <AlertOctagon size={40} className="text-rose-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-3 tracking-tight">Something went wrong</h1>
          <p className="text-slate-500 mb-8 max-w-md">
            The application encountered an unexpected error. This issue has been logged securely for administrators to review.
          </p>
          
          <div className="flex gap-4 w-full max-w-xs flex-col sm:flex-row">
             <button 
                onClick={this.handleGoBack}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl shadow-sm hover:bg-indigo-700 transition-colors uppercase tracking-wider text-xs"
             >
               <RefreshCw size={16} />
               Restore Screen
             </button>
             <button 
                onClick={this.handleGoHome}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-colors uppercase tracking-wider text-xs"
             >
               <Home size={16} />
               Go to Home
             </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
