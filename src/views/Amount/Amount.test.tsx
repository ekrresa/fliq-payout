import { MemoryRouter } from 'react-router-dom';
import '@testing-library/react/dont-cleanup-after-each';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

import AmountView from './index';
import { CheckoutProvider, CheckoutContextType } from '../../shared/CheckoutContext';

const mockContextValue: CheckoutContextType = {
  transfer: {},
  recipient: {},
  saveRecipientInfo: () => {},
  saveTransferDetails: () => {},
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

describe('Amount view', () => {
  beforeAll(() => {
    render(
      <MemoryRouter>
        <CheckoutProvider contextValue={mockContextValue}>
          <QueryClientProvider client={queryClient}>
            <AmountView />
          </QueryClientProvider>
        </CheckoutProvider>
      </MemoryRouter>
    );
  });

  afterAll(() => {
    cleanup();
  });

  test('should render the amount view by default', async () => {
    const amountView = await screen.findByTestId('amount-view');

    expect(amountView).toBeInTheDocument();
  });

  test('should not submit an empty form', async () => {
    const continueBtn = await screen.findByText(/continue/i);
    userEvent.click(continueBtn);
    const fromAmountError = await screen.findByText(
      /Please ensure you have entered a valid amount/i
    );

    const toCurrencyError = await screen.findByText(
      /Please select the currency to convert to/i
    );

    expect(fromAmountError).toBeDefined();
    expect(toCurrencyError).toBeDefined();
  });
});
