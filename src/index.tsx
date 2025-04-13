// Agrega esto temporalmente en tu archivo de entrada principal (index.tsx)
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import './index.css';
import Clients from './Clients';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={() => {
        // go to Home when remounting the <Clients/> component tree
        // to attempt to recover from the error, in case the problem
        // happened in a child route
        window.history.pushState({}, '', '/');

        // force a full reload, not just a remount
        window.location.reload();
      }}
    >
      <Clients />
    </ErrorBoundary>
  </React.StrictMode>,
  rootElement
);
