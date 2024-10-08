import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>오류가 발생했습니다.</h1>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;