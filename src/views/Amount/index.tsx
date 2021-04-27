import React from "react";
import { Button } from "../../components/Button";

import { Input } from "../../components/Input";

export function Amount() {
  return (
    <section>
      <div className="header">
        <h1 className="text-purple-dark text-lg">One-time Payout</h1>
        <h2 className="text-purple-light text-sm">
          Send money internationally
        </h2>

        <form className="mt-8">
          <Input label="You send" />
          <br />
          <Input label="Recipient gets" />

          <div className="grid grid-cols-2 gap-4 mt-8">
            <Button className="border border-purple-normal text-purple-normal">
              Compare Rates
            </Button>
            <Button className="bg-purple-accent text-white">Continue</Button>
          </div>
        </form>
      </div>
    </section>
  );
}
