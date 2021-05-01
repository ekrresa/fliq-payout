import { MemoryRouter } from 'react-router-dom';
import '@testing-library/react/dont-cleanup-after-each';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CheckoutProvider, CheckoutContextType } from '../../shared/CheckoutContext';
import Recipient from './index';

const mockContextValue: CheckoutContextType = {
  transfer: { fromCurrency: 'USD' },
  recipient: {},
  saveRecipientInfo: () => {},
  saveTransferDetails: () => {},
};

const mockEmptyContextValue: CheckoutContextType = {
  transfer: {},
  recipient: {},
  saveRecipientInfo: () => {},
  saveTransferDetails: () => {},
};

describe('Recipient View: Valid Context', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <CheckoutProvider contextValue={mockContextValue}>
          <Recipient />
        </CheckoutProvider>
      </MemoryRouter>
    );
  });

  afterEach(cleanup);

  test('should render the Amount view when the transfer property of Checkout context has data', () => {
    expect(screen.getByTestId('recipient-view')).toBeInTheDocument();
  });

  test('should not submit recipient form when empty', async () => {
    userEvent.click(screen.getByText(/continue/i));

    expect(await screen.findByText(/name/i)).toBeInTheDocument();
  });
});

describe('Recipient View: Empty Context', () => {
  beforeAll(() => {
    render(
      <MemoryRouter>
        <CheckoutProvider contextValue={mockEmptyContextValue}>
          <Recipient />
        </CheckoutProvider>
      </MemoryRouter>
    );
  });

  afterAll(cleanup);

  test('Should not render Recipient view when context transfer payload is empty', () => {
    expect(() => {
      screen.getByTestId('recipient-view');
    }).toThrowError();
  });
});
