import { useCallback } from 'react';
import { useHistory } from 'react-router';

import { Button } from '../../components/Button';
import { ChangeProps, InputSelect } from './InputSelect';
import { TransferDetails } from './TransferDetails';

const TRANSFER_FEE_IN_DOLLARS = 3.56;

export default function Amount() {
  const history = useHistory();

  const routeToRecipient = () => {
    history.push('/?stage=recipient');
  };

  // TODO: Add e typings
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleInputSelect = useCallback(({ ...data }: ChangeProps) => {
    console.log({ data });
  }, []);

  return (
    <section>
      <h1 className="text-purple-dark text-lg font-medium">One-time Payout</h1>
      <h2 className="text-purple-light text-sm">Send money internationally</h2>

      <form className="mt-8" onSubmit={handleSubmit}>
        <InputSelect label="You send" name="from_currency" handleChange={handleInputSelect} />
        {/* <br /> */}
        <TransferDetails transferFee={TRANSFER_FEE_IN_DOLLARS} />
        <InputSelect
          label="Recipient gets"
          name="to_currency"
          handleChange={handleInputSelect}
          value="12345"
          readonly
        />

        <div className="grid grid-cols-2 gap-4 mt-8">
          <Button className="border border-purple-normal text-purple-normal">
            Compare Rates
          </Button>
          <Button className="bg-purple-normal text-white" handleClick={routeToRecipient}>
            Continue
          </Button>
        </div>
      </form>
    </section>
  );
}
