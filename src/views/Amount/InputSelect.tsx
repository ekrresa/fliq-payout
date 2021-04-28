import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import styled from 'styled-components';

import { useCountries } from './utils/countryMap';

interface Props {
  label: string;
  name: string;
  handleChange: (data: ChangeProps) => void;
  value?: string;
  readonly?: boolean;
}

export interface ChangeProps {
  amount?: string;
  currency?: string;
  name: string;
}

export function InputSelect({ label, name, handleChange, readonly, value }: Props) {
  const countries = useCountries();
  const [data, setData] = useState<ChangeProps>({ name });

  useEffect(() => {
    handleChange(data);
  }, [handleChange, data]);

  return (
    <div className="flex focus-within:outline-solid  border border-edge justify-between rounded">
      <div className="flex-1 mr-2 px-4 py-4">
        <label className="block text-main-light text-sm" htmlFor={name}>
          {label}
        </label>
        <input
          className="block w-full focus:outline-none disabled:bg-white"
          id={name}
          onChange={e => {
            setData({ ...data, amount: e.target.value });
          }}
          value={value ?? ''}
          readOnly={readonly}
        />
      </div>

      <div className="bg-main-spark2 flex flex-col flex-1 max-w-9 justify-center px-4">
        <StyledSelect
          options={countries}
          isClearable={false}
          isSearchable
          onChange={(item: any) => {
            setData({ ...data, currency: item.value });
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
