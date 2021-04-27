import { Button } from '../../components/Button';
import { ReviewRow } from '../../components/ReviewRow';

export function Review() {
  return (
    <section>
      <h1 className="text-purple-dark text-2xl font-medium">
        Review details of your transfer
      </h1>

      <hr className="my-4" />

      <section>
        <ReviewRow eastText="You send" westText="1,000 USD" highlight />
        <ReviewRow eastText="Total fees (included)" westText="3.69 USD" />
        <ReviewRow eastText="Amount we’ll convert" westText="996.31 USD" />
        <ReviewRow eastText="Guaranteed rate" westText="1.10289" />
        <ReviewRow eastText="Johnny gets" westText="1,248.63 EUR" highlight />
      </section>

      <hr className="my-6" />

      <ReviewRow eastText="Name" westText="Johnny Gbadamosi" />
      <ReviewRow eastText="Email Address" westText="johnny.gbadamosi@gmail.com" />
      <ReviewRow eastText="IBAN / Account number" westText="DE898919013902102" />

      <Button className="bg-green-happy w-full mt-8 text-white text-base">
        Confirm and continue
      </Button>
    </section>
  );
}
