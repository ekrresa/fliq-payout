interface Props {
  label: string;
  id: string;
  placeholder?: string;
  onChange: (val: string) => void;
  type?: string;
}

export function FormControl({ id, label, onChange, placeholder, type = 'text' }: Props) {
  return (
    <div className="mb-4">
      <label className="block text-main-light text-base mb-2" htmlFor={id}>
        {label}
      </label>
      <input
        className="block w-full focus:outline-solid px-2 py-3 border rounded"
        id={id}
        placeholder={placeholder}
        onChange={e => {
          onChange(e.target.value);
        }}
        type={type}
      />
    </div>
  );
}
