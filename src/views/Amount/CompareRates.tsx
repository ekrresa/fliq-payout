import { useState } from 'react';
import { useQuery } from 'react-query';
import Select from 'react-select';

import { queryFixerAPI } from '../../helpers/axios';
import { useCountries } from './utils/countryMap';

const FIXER_APIKEY = process.env.REACT_APP_FIXER_APIKEY;

export default function CompareRates() {
  const countries = useCountries();
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');

  const { data: exchangeRate } = useQuery(
    [
      'transferFee',
      {
        url: `/latest?access_key=${FIXER_APIKEY}&base=${fromCurrency}&symbols=${toCurrency}`,
      },
    ],
    queryFixerAPI,
    {
      enabled: Boolean(fromCurrency) && Boolean(toCurrency),
    }
  );

  return (
    <section className="w-full">
      <h2 className="mb-6 text-purple-dark text-2xl font-medium">Compare exchange rates</h2>

      {exchangeRate?.error && (
        <div className="font-medium my-4 text-red-500">{exchangeRate?.error?.info}</div>
      )}

      <form>
        <div className="mb-4">
          <label
            className="font-medium text-lg text-main-lightgrey"
            htmlFor="fromCurrencyCompare"
          >
            From
          </label>
          <Select
            options={countries}
            onChange={(item: any) => {
              setFromCurrency(item.value);
            }}
            inputId="fromCurrencyCompare"
            isClearable={false}
            isSearchable
          />
        </div>

        <div className="mb-4">
          <label
            className="font-medium text-lg text-main-lightgrey"
            htmlFor="toCurrencyCompare"
          >
            To
          </label>
          <Select
            options={countries}
            onChange={(item: any) => {
              setToCurrency(item.value);
            }}
            inputId="toCurrencyCompare"
            isClearable={false}
            isSearchable
          />
        </div>
      </form>

      {exchangeRate?.success === true ? (
        <div className="font-medium text-purple-gloom">
          1 {fromCurrency} <span className="text-main-lightgrey">&#65309;</span>{' '}
          {exchangeRate?.rates[toCurrency]} {toCurrency}
        </div>
      ) : null}
    </section>
  );
}
