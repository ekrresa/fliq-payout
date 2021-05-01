import * as React from 'react';
import confetti from 'canvas-confetti';
import { useHistory } from 'react-router';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Button } from '../../components/Button';
import { isObjectEmpty } from '../../helpers/utils';
import { useCheckout } from '../../shared/CheckoutContext';

export default function Payment() {
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const countdownRef = React.useRef<any>();
  const { recipient, transfer } = useCheckout();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue(v => v + 10);
    }, 400);

    countdownRef.current = interval;

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    if (value === 100) {
      clearInterval(countdownRef.current);
      let count = 0;

      const newInterval = setInterval(() => {
        count++;
        confetti({
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          particleCount: randomInRange(60, 90),
          origin: { y: 0.5 },
        });

        if (count === 10) {
          clearInterval(newInterval);
        }
      }, 250);
    }
  }, [value]);

  if (isObjectEmpty(transfer) || isObjectEmpty(recipient)) {
    history.push('/');
    return null;
  }

  return (
    <section>
      <h1 className="text-purple-dark text-2xl font-medium">
        {value === 100 ? 'Your money has been sent 👏🏽👏🏽👏🏽👏🏽' : 'Payment in progress'}
      </h1>

      <hr className="my-4" />

      <section className="w-40 h-40 mx-auto my-20">
        {value !== 100 && (
          <CircularProgressbar
            value={value}
            strokeWidth={4}
            styles={buildStyles({
              pathColor: '#4305EB',
              pathTransitionDuration: 0.2,
              strokeLinecap: 'butt',
            })}
          />
        )}
      </section>

      <Button
        className="bg-green-happy w-full mt-8 text-white text-base"
        onClick={() => {
          history.push('/');
        }}
      >
        Go home
      </Button>
    </section>
  );
}

function randomInRange(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
