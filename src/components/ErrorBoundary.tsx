import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };
  
  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-red-50 p-6 flex flex-col items-center justify-center text-center">
          <h1 className="text-xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-sm text-red-500 bg-red-100 p-4 rounded-lg overflow-auto max-w-full text-left font-mono">
            {this.state.error?.message}
            <br/><br/>
            {this.state.error?.stack}
          </p>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
