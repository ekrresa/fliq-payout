import React from 'react';

interface Props extends React.PropsWithChildren<unknown> {
  className: string;
  handleClick?: () => void;
}

export function Button({ children, className, handleClick = () => {} }: Props) {
  return (
    <button
      className={'font-semibold rounded px-4 py-4 text-sm ' + className}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
