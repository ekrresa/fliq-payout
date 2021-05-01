import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from '../../assets/images/logo.svg';
import Close from '../../assets/images/close.svg';

export function NavBar() {
  return (
    <header className="bg-white px-4 sm:px-6 py-6" data-testid="navbar">
      <div className="mx-auto max-w-6xl flex justify-between items-center">
        <img className="w-16 sm:w-20" src={Logo} alt="site logo" />

        <ul className="max-w-3xl mx-8 flex justify-between list-none w-full">
          <CheckoutStep>
            <Link to="/">Amount</Link>
          </CheckoutStep>
          <CheckoutStep>
            <Link to="/?stage=recipient">Recipient</Link>
          </CheckoutStep>
          <CheckoutStep>
            <Link to="/?stage=review">Review</Link>
          </CheckoutStep>
          <CheckoutStep>
            <Link to="/?stage=payment">Pay</Link>
          </CheckoutStep>
        </ul>

        <img className="w-4" src={Close} alt="close icon" />
      </div>
    </header>
  );
}

const CheckoutStep = styled.li`
  position: relative;
`;
