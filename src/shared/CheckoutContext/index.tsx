import { useContext, createContext, useState, PropsWithChildren } from 'react';

type CheckoutContextType = {
  recipient: Record<string, any>;
  transfer: Record<string, any>;
  saveRecipientInfo: (payload: any) => void;
  saveTransferDetails: (payload: any) => void;
};

const initialState = {
  transfer: {},
  recipient: {},
  saveRecipientInfo: () => {},
  saveTransferDetails: () => {},
};
const CheckoutContext = createContext<CheckoutContextType>(initialState);

function useCheckout() {
  const context = useContext(CheckoutContext);

  if (context === undefined) {
    throw new Error(`useCheckout must be used within CheckoutProvider`);
  }

  return context;
}

interface Props extends PropsWithChildren<unknown> {}

function CheckoutProvider({ children }: Props) {
  const [state, setState] = useState(initialState);

  const saveTransferDetails = (payload: any) => {
    setState({ ...state, transfer: { ...state.transfer, ...payload } });
  };

  const saveRecipientInfo = (payload: any) => {
    setState({ ...state, recipient: { ...state.recipient, ...payload } });
  };

  return (
    <CheckoutContext.Provider value={{ ...state, saveRecipientInfo, saveTransferDetails }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export { CheckoutProvider, useCheckout };
