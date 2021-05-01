import { useState } from 'react';
import { useQuery } from 'react-query';
import Select from 'react-select';

import { queryFixerAPI } from '../../helpers/axios';
import { useCountries } from './utils/countryMap';

interface Props {
  fromCurrencyProp: string;
  toCurrencyProp?: string;
}

const FIXER_APIKEY = process.env.REACT_APP_FIXER_APIKEY;

export default function CompareRates({ fromCurrencyProp, toCurrencyProp }: Props) {
  const countries = useCountries();
  const [fromCurrency, setFromCurrency] = useState('');
  const [toCurrency, setToCurrency] = useState('');

  const { data: exchangeRate } = useQuery(
    [
      'transferFee',
      {
        url: `/latest?access_key=${FIXER_APIKEY}&base=${
          fromCurrency || fromCurrencyProp
        }&symbols=${toCurrency || toCurrencyProp}`,
      },
    ],
    queryFixerAPI,
    {
      enabled:
        (Boolean(fromCurrency) || Boolean(fromCurrencyProp)) &&
        (Boolean(toCurrency) || Boolean(toCurrencyProp)),
    }
  );

  return (
    <section className="w-full">
      <h2 className="mb-6 text-purple-dark text-2xl font-medium">Compare exchange rates</h2>
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

      {exchangeRate ? (
        <div className="font-medium text-purple-gloom">
          1 {fromCurrency || fromCurrencyProp}{' '}
          <span className="text-main-lightgrey">&#65309;</span>{' '}
          {exchangeRate?.rates[toCurrency || toCurrencyProp!]} {toCurrency || toCurrencyProp}
        </div>
      ) : null}
    </section>
  );
}
