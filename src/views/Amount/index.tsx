import { useLocation, useHistory } from 'react-router';
import qs from 'query-string';

import { Button } from '../../components/Button';

import { Input } from '../../components/Input';

export default function Amount() {
  const history = useHistory();

  const routeToRecipient = () => {
    history.push('/recipient');
  };

  // TODO: Add e typings
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <section>
      <h1 className="text-purple-dark text-lg font-medium">One-time Payout</h1>
      <h2 className="text-purple-light text-sm">Send money internationally</h2>

      <form className="mt-8" onSubmit={handleSubmit}>
        <Input label="You send" />
        <br />
        <Input label="Recipient gets" />

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
