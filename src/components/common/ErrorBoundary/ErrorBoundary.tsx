import * as React from "react";

interface IErrorBoundaryProps {
  onError?: () => void;
  ErrorPlaceholder?: React.ReactElement;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  static defaultProps = {
    ErrorPlaceholder: null,
  };

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    if (this.props.onError) {
      this.props.onError();
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.ErrorPlaceholder;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
