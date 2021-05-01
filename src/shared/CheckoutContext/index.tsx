import { useContext, createContext, useState, PropsWithChildren } from 'react';

export type CheckoutContextType = {
  recipient: Record<string, any>;
  transfer: Record<string, any>;
  saveRecipientInfo: (payload: any) => void;
  saveTransferDetails: (payload: any) => void;
};

interface ProviderProps extends PropsWithChildren<unknown> {
  contextValue: CheckoutContextType;
}

function CheckoutProvider({ children, contextValue }: ProviderProps) {
  return <CheckoutContext.Provider value={contextValue}>{children}</CheckoutContext.Provider>;
}

const initialState = {
  transfer: {},
  recipient: {},
  saveRecipientInfo: () => {},
  saveTransferDetails: () => {},
};

const CheckoutContext = createContext<CheckoutContextType>(initialState);

function useContextValue() {
  const [state, setState] = useState(initialState);

  const saveTransferDetails = (payload: any) => {
    setState({ ...state, transfer: { ...state.transfer, ...payload } });
  };

  const saveRecipientInfo = (payload: any) => {
    setState({ ...state, recipient: { ...state.recipient, ...payload } });
  };

  return { ...state, saveRecipientInfo, saveTransferDetails };
}

function useCheckout() {
  const context = useContext(CheckoutContext);

  if (context === undefined) {
    throw new Error(`useCheckout must be used within CheckoutProvider`);
  }

  return context;
}

export { CheckoutProvider, useContextValue, useCheckout };
