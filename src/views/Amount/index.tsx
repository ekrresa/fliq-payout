import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useQuery } from 'react-query';
import ReactModal from 'react-modal';
import MoonLoader from 'react-spinners/MoonLoader';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import debounce from 'lodash.debounce';

import { Button } from '../../components/Button';
import { Loader } from '../../components/Loader';
import { InputChangeProps, InputSelect, SelectChangeProps } from './InputSelect';
import { TransferDetails } from './TransferDetails';
import { queryFixerAPI } from '../../helpers/axios';
import { useCheckout } from '../../shared/CheckoutContext';

const CompareRates = lazy(() => import('./CompareRates'));

const TRANSFER_FEE = Number(process.env.REACT_APP_TRANSFER_FEE);
const FIXER_APIKEY = process.env.REACT_APP_FIXER_APIKEY;
const ONE_HOUR_IN_MILLISECONDS = 3600000;

export default function Amount() {
  const history = useHistory();
  const { saveTransferDetails } = useCheckout();

  const [modal, setModal] = useState(false);

  const { handleSubmit, errors, setFieldError, setFieldValue, values } = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      exchangeRate: 0,
      fromAmount: 0,
      originalAmount: 0,
      fromCurrency: '',
      toCurrency: '',
      toAmount: 0,
      transferFee: 0,
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      saveTransferDetails(values);
      history.push('/?stage=recipient');
    },
  });

  // Does conversion of amount between currencies chosen.
  // Rate is cached for 1 hour
  const { isLoading: fetchingExchangeData, data: exchangeData } = useQuery(
    [
      'exchange',
      {
        url: `/convert?access_key=${FIXER_APIKEY}&from=${values.fromCurrency}&to=${values.toCurrency}&amount=${values.fromAmount}`,
      },
    ],
    queryFixerAPI,
    {
      enabled: !!(
        values.fromCurrency &&
        values.fromAmount &&
        values.fromAmount > 0 &&
        values.toCurrency
      ),
      staleTime: ONE_HOUR_IN_MILLISECONDS,
    }
  );

  // Syncs transfer fee with fromCurrency using TRANSFER_FEE as base
  const { data: transferFeeData } = useQuery(
    [
      'transferFee',
      {
        url: `/convert?access_key=${FIXER_APIKEY}&from=USD&to=${values.fromCurrency}&amount=${TRANSFER_FEE}`,
      },
    ],
    queryFixerAPI,
    { enabled: !!values.fromCurrency, staleTime: ONE_HOUR_IN_MILLISECONDS }
  );

  useEffect(() => {
    if (exchangeData?.success === true) {
      setFieldValue('toAmount', Math.floor((exchangeData.result * 100) / 100));
      setFieldValue('exchangeRate', exchangeData.info.rate);
    }
  }, [exchangeData, setFieldValue]);

  useEffect(() => {
    if (transferFeeData?.success === true) {
      setFieldValue('transferFee', transferFeeData.result);
    }
  }, [transferFeeData?.success, transferFeeData?.result, setFieldValue]);

  useEffect(() => {
    if (values.originalAmount && transferFeeData?.success === true) {
      const amountToConvert = values.originalAmount - transferFeeData.result;
      setFieldValue('fromAmount', Math.floor(amountToConvert * 100) / 100, false);
    }
  }, [
    setFieldValue,
    transferFeeData?.success,
    transferFeeData?.result,
    values.originalAmount,
  ]);

  useEffect(() => {
    if (values.fromAmount && values.fromAmount <= 0) {
      setFieldError(
        'fromAmount',
        `Invalid Amount: Minimum amount is ${Math.floor((values.transferFee + 1) * 100) / 100}`
      );
    } else {
      setFieldError('fromAmount', '');
    }
  }, [setFieldError, values.fromAmount, values.transferFee]);

  useEffect(() => {
    if (values.toAmount) {
      setFieldError('toAmount', '');
    }
  }, [setFieldError, values.toAmount]);

  // Call the API 500 milliseconds after user stops typing
  const inputHandler = debounce((data: InputChangeProps) => {
    const { amount, name } = data;
    setFieldValue(name, Number(amount));
  }, 500);

  const handleInput = useCallback(inputHandler, [inputHandler]);

  const handleSelect = useCallback(
    (data: SelectChangeProps) => {
      const { currency, name } = data;
      setFieldValue(name, currency);
    },
    [setFieldValue]
  );

  return (
    <section data-testid="amount-view">
      <h1 className="text-purple-dark text-xl font-medium">One-time Payout</h1>
      <h2 className="font-normal mt-1 text-purple-light text-base">
        Send money internationally
      </h2>

      {transferFeeData?.error && (
        <div className="font-medium mt-4 text-red-500">{transferFeeData?.error?.info}</div>
      )}

      {exchangeData?.error && (
        <div className="font-medium mt-4 text-red-500">{exchangeData?.error?.info}</div>
      )}

      <form className="mt-8" onSubmit={handleSubmit} data-testid="amount-form">
        <InputSelect
          label="You send"
          inputName="originalAmount"
          selectName="fromCurrency"
          onInputChange={handleInput}
          onSelectChange={handleSelect}
          errorMessage={errors.fromAmount}
        />

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
        ) : !errors.fromAmount && exchangeData?.result ? (
          <TransferDetails
            currency={values.fromCurrency}
            defaultTransferFee={TRANSFER_FEE}
            transferFee={transferFeeData?.result}
            amountToBeSent={values.fromAmount}
            exchangeCurrency={values.toCurrency}
            exchangeRate={exchangeData?.info?.rate}
          />
        ) : (
          <br />
        )}

        <InputSelect
          label="Recipient gets"
          onInputChange={handleInput}
          onSelectChange={handleSelect}
          inputName="toAmount"
          selectName="toCurrency"
          value={
            exchangeData?.result ? String(Math.floor(exchangeData?.result * 100) / 100) : ''
          }
          errorMessage={errors.toCurrency}
          readonly
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <Button
            className="border border-purple-normal text-purple-normal"
            onClick={() => setModal(true)}
          >
            Compare Rates
          </Button>
          <Button
            className="bg-purple-normal text-white"
            type="submit"
            data-testid="amount-continue-btn"
          >
            Continue
          </Button>
        </div>
      </form>
      <ReactModal
        closeTimeoutMS={200}
        contentLabel="Search Form"
        isOpen={modal}
        onRequestClose={() => {
          setModal(false);
        }}
        className="modal"
        overlayClassName="overlay"
        ariaHideApp={false}
      >
        <Suspense fallback={<Loader />}>
          <CompareRates />
        </Suspense>
      </ReactModal>
    </section>
  );
}

const validationSchema = Yup.object().shape({
  fromAmount: Yup.number()
    .positive('Please ensure you have entered a valid amount, and selected the currencies')
    .required('Please enter a valid amount'),
  toAmount: Yup.number()
    .positive('Please ensure you have entered a valid amount, and selected the currencies')
    .required('Please ensure you have entered a valid amount, and selected the currencies'),
  originalAmount: Yup.number()
    .integer('Amount is not valid')
    .positive('Amount is not valid')
    .required('Please enter a valid amount'),
  fromCurrency: Yup.string().required('Please select the currency to convert from'),
  toCurrency: Yup.string().required('Please select the currency to convert to'),
  exchangeRate: Yup.number()
    .positive()
    .required('Please ensure you have entered a valid amount, and selected the currencies'),
  transferFee: Yup.number()
    .positive()
    .required('Please ensure you have entered a valid amount, and selected the currencies'),
});
