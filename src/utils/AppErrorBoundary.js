import { Component } from 'react';
// import { appInsights } from '../analytics';

export class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // appInsights.trackException({
    //   exception: error,
    //   properties: { info },
    // });
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
