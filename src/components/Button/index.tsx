import React from 'react';

interface Props extends React.PropsWithChildren<unknown> {
  className: string;
  handleClick?: () => void;
  type?: 'button' | 'submit';
}

export function Button({
  children,
  className,
  handleClick = () => {},
  type = 'button',
}: Props) {
  return (
    <button
      className={'font-semibold rounded px-4 py-4 text-sm ' + className}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
}
