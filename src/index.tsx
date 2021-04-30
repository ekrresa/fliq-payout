import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { CheckoutProvider } from './shared/CheckoutContext';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './tailwind.output.css';
import { ErrorFallback } from './shared/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <BrowserRouter>
        <CheckoutProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </CheckoutProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
