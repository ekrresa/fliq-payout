import { ChangeEvent } from 'react';

interface Props {
  label: string;
  id: string;
  name: string;
  errorMessage?: string;
  placeholder?: string;
  onChange: (val: ChangeEvent<any>) => void;
  onBlur: (e: any) => void;
  type?: string;
  value: string;
}

export function FormControl({
  id,
  label,
  name,
  errorMessage,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  value,
}: Props) {
  const errorClass = errorMessage ? 'border-red-500' : 'border-edge';

  return (
    <div className="mb-4">
      <label className="block text-main-light text-base mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className={`block w-full overflow-hidden px-2 py-3 border rounded ${errorClass}`}
        id={id}
        name={name}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        type={type}
        value={value}
      />
      {errorMessage ? (
        <small className="block mb-0.5 text-red-500">{errorMessage}</small>
      ) : null}
    </div>
  );
}
