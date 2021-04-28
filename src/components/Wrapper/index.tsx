import React from 'react';

interface Props extends React.PropsWithChildren<unknown> {}

export function Wrapper({ children }: Props) {
  return (
    <section className="bg-white border border-main-spark max-w-2xl mt-24 mx-auto px-8 py-12 rounded-md">
      {children}
    </section>
  );
}