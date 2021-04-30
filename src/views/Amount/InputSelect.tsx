import ReactSelect from 'react-select';
import CurrencyInput from 'react-currency-input-field';
import styled from 'styled-components';

import { useCountries } from './utils/countryMap';

interface Props {
  errorMessage?: string;
  label: string;
  inputName: string;
  selectName: string;
  onInputChange: (data: InputChangeProps) => void;
  onSelectChange: (data: SelectChangeProps) => void;
  value?: string;
  readonly?: boolean;
}

export interface InputChangeProps {
  name: string;
  amount: string | undefined;
}

export interface SelectChangeProps {
  name: string;
  currency: string | undefined;
}

export function InputSelect({
  errorMessage,
  label,
  inputName,
  selectName,
  onInputChange,
  onSelectChange,
  readonly,
  value,
}: Props) {
  const countries = useCountries();

  const errorClass = errorMessage ? 'border-red-500' : 'border-edge';

  return (
    <>
      <div
        className={`flex focus-within:outline-solid border justify-between rounded ${errorClass}`}
      >
        <div className="flex-1 mr-2 px-4 py-3">
          <label className="block text-main-light text-sm" htmlFor={inputName}>
            {label}
          </label>

          <CurrencyInput
            allowNegativeValue={false}
            className="block w-full text-xl mt-1 focus:outline-none disabled:bg-white"
            id={inputName}
            name={inputName}
            placeholder=""
            decimalsLimit={10}
            onValueChange={value => {
              onInputChange({ name: inputName, amount: value });
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
              onSelectChange({ name: selectName, currency: item.value });
            }}
            name={selectName}
          />
        </div>
      </div>
      {errorMessage ? (
        <small className="block mb-0.5 text-red-500">{errorMessage}</small>
      ) : null}
    </>
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
