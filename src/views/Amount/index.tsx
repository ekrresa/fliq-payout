import { useCallback, useState } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from 'react-query';
import MoonLoader from 'react-spinners/MoonLoader';

import { Button } from '../../components/Button';
import { ChangeProps, InputSelect } from './InputSelect';
import { TransferDetails } from './TransferDetails';
import { queryFixerAPI } from '../../helpers/axios';
import { useCheckout } from '../../shared/CheckoutContext';

const TRANSFER_FEE_IN_USD = 3.56;
const FIXER_APIKEY = process.env.REACT_APP_FIXER_APIKEY;
const ONE_HOUR_IN_MILLISECONDS = 3600000;

export default function Amount() {
  const history = useHistory();
  const { saveData } = useCheckout();

  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');
  const [fromAmount, setFromAmount] = useState(0);
  const [originalAmount, setOriginalAmount] = useState(0);

  // Does conversion of amount between currencies chosen.
  // Rate is cached for 1 hour
  const { isLoading: fetchingExchangeData, data: exchangeData } = useQuery(
    [
      'exchange',
      {
        url: `/convert?access_key=${FIXER_APIKEY}&from=${fromCurrency}&to=${toCurrency}&amount=${fromAmount}`,
      },
    ],
    queryFixerAPI,
    {
      enabled: !!(fromCurrency && fromAmount && toCurrency),
      staleTime: ONE_HOUR_IN_MILLISECONDS,
    }
  );

  // Syncs transfer fee with fromCurrency using TRANSFER_FEE_IN_USD as base
  const { data: transferFeeData } = useQuery(
    [
      'transferFee',
      {
        url: `/convert?access_key=${FIXER_APIKEY}&from=USD&to=${fromCurrency}&amount=${TRANSFER_FEE_IN_USD}`,
      },
    ],
    queryFixerAPI,
    { enabled: !!fromCurrency, staleTime: ONE_HOUR_IN_MILLISECONDS }
  );

  // TODO: Add e typings
  const handleSubmit = (e: any) => {
    e.preventDefault();

    saveData({
      fromAmount,
      fromCurrency,
      toAmount: exchangeData?.result,
      toCurrency,
      originalAmount,
      exchangeRate: exchangeData?.info?.rate,
      transferFee: transferFeeData?.result,
    });

    // route to recipient view
    history.push('/?stage=recipient');
  };

  const handleInputSelect = useCallback(
    (data: ChangeProps | null) => {
      if (!data) return;

      const { amount, from_currency, to_currency } = data;

      if (from_currency) {
        setFromCurrency(from_currency);
      }

      if (amount) {
        setOriginalAmount(Number(amount));
      }

      if (amount && transferFeeData) {
        const parsedAmount = Number(amount);
        const amountToConvert = parsedAmount - transferFeeData.result;
        setFromAmount(amountToConvert);
      }

      if (to_currency) {
        setToCurrency(to_currency);
      }
    },
    [transferFeeData]
  );

  return (
    <section>
      <h1 className="text-purple-dark text-lg font-medium">One-time Payout</h1>
      <h2 className="text-purple-light text-sm">Send money internationally</h2>

      <form className="mt-8" onSubmit={handleSubmit}>
        <InputSelect label="You send" name="from_currency" handleChange={handleInputSelect} />

        {fetchingExchangeData ? (
          <div className="my-4 ml-4">
            <MoonLoader
              color="#4305EB"
              css={`
                display: block;
              `}
              size={25}
            />
          </div>
        ) : exchangeData ? (
          <TransferDetails
            currency={fromCurrency}
            defaultTransferFee={TRANSFER_FEE_IN_USD}
            transferFee={transferFeeData?.result}
            amountToBeSent={fromAmount}
            exchangeCurrency={toCurrency}
            exchangeRate={exchangeData?.info?.rate}
          />
        ) : (
          <br />
        )}

        <InputSelect
          label="Recipient gets"
          name="to_currency"
          handleChange={handleInputSelect}
          value={exchangeData?.result}
          readonly
        />

        <div className="grid grid-cols-2 gap-4 mt-8">
          <Button className="border border-purple-normal text-purple-normal">
            Compare Rates
          </Button>
          <Button className="bg-purple-normal text-white" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </section>
  );
}
