import {ErrorInfo} from 'react';

export interface IErrorBoundaryState {
  hasError: boolean,
  errorType: null | Error,
  errorInfo: null | ErrorInfo,
}
