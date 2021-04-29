import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import CurrencyInput from 'react-currency-input-field';
import styled from 'styled-components';

import { useCountries } from './utils/countryMap';

interface Props {
  label: string;
  name: string;
  handleChange: (data: ChangeProps | null) => void;
  value?: string;
  readonly?: boolean;
}

export interface ChangeProps {
  amount?: string;
  from_currency?: string;
  to_currency?: string;
}

export function InputSelect({ label, name, handleChange, readonly, value }: Props) {
  const countries = useCountries();
  const [data, setData] = useState<ChangeProps | null>(null);

  useEffect(() => {
    handleChange(data);
  }, [handleChange, data]);

  return (
    <div className="flex focus-within:outline-solid  border border-edge justify-between rounded">
      <div className="flex-1 mr-2 px-4 py-3">
        <label className="block text-main-light text-sm" htmlFor={name}>
          {label}
        </label>

        <CurrencyInput
          className="block w-full text-xl mt-1 focus:outline-none disabled:bg-white"
          id={name}
          name={name}
          placeholder=""
          decimalsLimit={10}
          onValueChange={value => {
            setData({ ...data, amount: value });
          }}
          readOnly={readonly}
          value={value}
        />
      </div>

      <div className="bg-main-spark2 flex flex-col flex-1 max-w-9 justify-center px-4">
        <StyledSelect
          options={countries}
          isClearable={false}
          isSearchable
          onChange={(item: any) => {
            setData({ ...data, [name]: item.value });
          }}
          name={name}
        />
      </div>
    </div>
  );
}

const StyledSelect = styled(ReactSelect)`
  .css-yk16xz-control {
    border: none;
    background: inherit;
  }

  .css-1okebmr-indicatorSeparator {
    display: none;
  }
`;
