import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { CheckoutProvider, useContextValue } from './shared/CheckoutContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './tailwind.output.css';
import { ErrorFallback } from './shared/ErrorBoundary';

// This may be unorthodox but I set it up this way
// to be able to pass in the value from useContextValue hook to CheckoutProvider
// This makes it easy to mock checkoutContext in the tests
function Render() {
  const value = useContextValue();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <CheckoutProvider contextValue={value}>
          <App />
        </CheckoutProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Render />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
