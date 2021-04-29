import { useHistory } from 'react-router';

import { useCheckout } from '../../shared/CheckoutContext';
import { Button } from '../../components/Button';
import { ReviewRow } from './ReviewRow';

function getFirstName(name: string) {
  return name.split(' ')[0];
}

export default function Review() {
  const history = useHistory();
  const checkout = useCheckout();

  const routeToPayment = () => {
    history.push('/?stage=payment');
  };

  return (
    <section>
      <h1 className="text-purple-dark text-2xl font-medium">
        Review details of your transfer
      </h1>

      <hr className="my-4" />

      <section>
        <ReviewRow
          eastText="You send"
          westText={checkout?.originalAmount + ' ' + checkout?.fromCurrency}
          highlight
        />
        <ReviewRow
          eastText="Total fees (included)"
          westText={checkout.transferFee + ' ' + checkout.fromCurrency}
        />
        <ReviewRow
          eastText="Amount we’ll convert"
          westText={checkout.fromAmount + ' ' + checkout.fromCurrency}
        />
        <ReviewRow eastText="Guaranteed rate" westText={checkout.exchangeRate} />
        <ReviewRow
          eastText={getFirstName(checkout.name) + ' gets'}
          westText={checkout.toAmount + ' ' + checkout.fromCurrency}
          highlight
        />
      </section>

      <hr className="my-6" />

      <ReviewRow eastText="Name" westText={checkout.name} />
      <ReviewRow eastText="Email Address" westText={checkout.email} />
      <ReviewRow eastText="IBAN / Account number" westText={checkout.accountNumber} />

      <Button
        className="bg-green-happy w-full mt-8 text-white text-base"
        handleClick={routeToPayment}
      >
        Confirm and continue
      </Button>
    </section>
  );
}
