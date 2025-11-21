import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  // Update state when an error is thrown
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  // Log the error (optional)
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div style={{ padding: "10px", border: "1px solid red", borderRadius: "5px", backgroundColor: "#ffe6e6" }}>
          <p>Oops! Something went wrong while loading this component.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
