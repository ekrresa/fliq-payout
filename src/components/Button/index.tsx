import React from "react";

interface Props extends React.PropsWithChildren<unknown> {
  className: string;
}

export function Button({ children, className }: Props) {
  return (
    <button className={"rounded px-4 py-3 text-sm " + className}>
      {children}
    </button>
  );
}
