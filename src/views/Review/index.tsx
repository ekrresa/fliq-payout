import { useHistory } from 'react-router';

import { useCheckout } from '../../shared/CheckoutContext';
import { Button } from '../../components/Button';
import { ReviewRow } from './ReviewRow';
import { isObjectEmpty } from '../../helpers/utils';

function getFirstName(name: string) {
  return name.split(' ')[0];
}

export default function Review() {
  const history = useHistory();
  const { recipient, transfer } = useCheckout();

  if (isObjectEmpty(recipient) || isObjectEmpty(transfer)) {
    history.replace('/?stage=amount');
    return null;
  }

  const routeToPaymentView = () => {
    history.push('/?stage=payment');
  };

  return (
    <section>
      <h1 className="text-purple-dark text-xl font-medium">Review details of your transfer</h1>

      <hr className="my-4" />

      <section>
        <ReviewRow
          eastText="You send"
          westText={
            new Intl.NumberFormat().format(transfer.originalAmount) +
            ' ' +
            transfer.fromCurrency
          }
          highlight
        />
        <ReviewRow
          eastText="Total fees (included)"
          westText={transfer.transferFee + ' ' + transfer.fromCurrency}
        />
        <ReviewRow
          eastText="Amount we’ll convert"
          westText={
            new Intl.NumberFormat().format(transfer.fromAmount) + ' ' + transfer.fromCurrency
          }
        />
        <ReviewRow eastText="Guaranteed rate" westText={transfer.exchangeRate} />
        <ReviewRow
          eastText={getFirstName(recipient.name) + ' gets'}
          westText={
            new Intl.NumberFormat().format(transfer.toAmount) + ' ' + transfer.toCurrency
          }
          highlight
        />
      </section>

      <hr className="my-6" />

      <ReviewRow eastText="Name" westText={recipient.name} />
      <ReviewRow eastText="Email Address" westText={recipient.email} />
      <ReviewRow
        eastText="IBAN / Account number"
        westText={recipient.accountNumber || recipient.iban}
      />

      <Button
        className="bg-green-happy w-full mt-8 text-white text-base"
        handleClick={routeToPaymentView}
      >
        Confirm and continue
      </Button>
    </section>
  );
}
