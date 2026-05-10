/**
 * Error Boundary Component
 * 
 * Catches unhandled errors in React component trees and displays
 * a user-friendly error message with a retry option.
 * 
 * Reports errors to Sentry for monitoring.
 * 
 * Usage:
 *   <ErrorBoundary fallback={<CustomErrorUI />}>
 *     <ChildComponents />
 *   </ErrorBoundary>
 */

"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { captureException } from "@/lib/sentry";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optional custom fallback UI */
  fallback?: ReactNode;
  /** Optional error handler callback */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Report to Sentry
    captureException(error, {
      componentStack: errorInfo.componentStack ?? "unknown",
    });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);

    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary] Caught error:", error, errorInfo);
    }
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] px-6 py-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-6">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Something went wrong
          </h2>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            An unexpected error occurred. Please try again, or contact support
            if the problem persists.
          </p>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <pre className="mb-6 p-4 rounded-lg bg-muted text-xs text-muted-foreground overflow-auto max-w-lg max-h-32">
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={this.handleRetry}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
