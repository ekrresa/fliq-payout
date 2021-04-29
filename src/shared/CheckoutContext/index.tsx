import { useContext, createContext, useState, PropsWithChildren } from 'react';

const initialState: Record<string, any> = {};
const CheckoutContext = createContext(initialState);

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

  const saveData = (data: any) => {
    setState({ ...state, data });
  };

  return (
    <CheckoutContext.Provider value={{ ...state, saveData }}>
      {children}
    </CheckoutContext.Provider>
  );
}

export { CheckoutProvider, useCheckout };
