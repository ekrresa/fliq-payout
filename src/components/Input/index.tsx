import { Select } from '../Select';

interface Props {
  label: string;
}

export function Input({ label }: Props) {
  return (
    <div className="flex focus-within:outline-solid px-4 py-2 border border-edge justify-between rounded">
      <div className="flex-1 mr-2">
        <label className="block text-main-light text-xs" htmlFor="amount">
          {label}
        </label>
        <input className="block w-full focus:outline-none" id="amount" />
      </div>

      <Select />
    </div>
  );
}
