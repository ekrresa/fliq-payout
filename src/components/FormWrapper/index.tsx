import React from "react";

interface Props extends React.PropsWithChildren<unknown> {}

export function FormWrapper({ children }: Props) {
  return (
    <section className="bg-white max-w-2xl mt-24 mx-auto px-8 py-12 rounded-md">
      {children}
    </section>
  );
}
