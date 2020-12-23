import React, {ErrorInfo} from 'react';
import {Link} from 'react-router-dom';
import {IErrorBoundaryState} from "../../../interfaces/IErrorBoundaryState";
import {IErrorBoundaryProps} from "./IErrorBoundaryProps";
import {BASE_URL} from "../../../constants/pathNames";

export class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state: IErrorBoundaryState = {
    hasError: false,
    errorType: null,
    errorInfo: null,
  };


  static getDerivedStateFromError(_: Error): IErrorBoundaryState {
    return {
      hasError: true,
      errorType: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      errorType: error,
      errorInfo,
    });
  }

  render() {
    const {children} = this.props;
    const {hasError} = this.state;

    if (hasError) {

      return (
        <div className="error-boundary">
          <h1 className="title">We apologize for temporary problems</h1>
          <p className="error-text">
            <span>You can return to </span>
            <Link to={BASE_URL} className="link">
              Home
            </Link>
            <span> page.</span>
          </p>
        </div>
      );
    }

    return children;
  }
}