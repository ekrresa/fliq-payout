import { MemoryRouter } from 'react-router-dom';
import '@testing-library/react/dont-cleanup-after-each';
import { render, screen, cleanup } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CheckoutProvider } from './shared/CheckoutContext';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

describe('App', () => {
  beforeAll(() => {
    render(
      <MemoryRouter>
        <CheckoutProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </CheckoutProvider>
      </MemoryRouter>
    );
  });

  afterAll(cleanup);

  test('should render the amount view by default', async () => {
    const amountView = await screen.findByTestId('amount-view');

    expect(amountView).toBeInTheDocument();
  });

  test('should render the navbar', async () => {
    const navbar = await screen.findByTestId('navbar');

    expect(navbar).toBeInTheDocument();
  });
});
