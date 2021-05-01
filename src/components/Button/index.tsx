import React from 'react';

interface Props extends React.PropsWithChildren<unknown> {
  className: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export function Button({ children, className, onClick = () => {}, type = 'button' }: Props) {
  return (
    <button
      className={'font-medium rounded-md px-4 py-4 text-base ' + className}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
