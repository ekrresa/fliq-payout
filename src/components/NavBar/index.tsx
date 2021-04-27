import Logo from '../../assets/images/logo.svg';
import Close from '../../assets/images/close.svg';
import styled from 'styled-components';

export function NavBar() {
  return (
    <header className="bg-white p-6">
      <div className="mx-auto max-w-6xl flex justify-between items-center">
        <img className="w-20" src={Logo} alt="site logo" />

        <ul className="max-w-3xl flex justify-between list-none w-full">
          <CheckoutStep>Amount</CheckoutStep>
          <CheckoutStep>Recipient</CheckoutStep>
          <CheckoutStep>Review</CheckoutStep>
          <CheckoutStep>Pay</CheckoutStep>
        </ul>

        <img className="w-4" src={Close} alt="close icon" />
      </div>
    </header>
  );
}

const CheckoutStep = styled.li`
  position: relative;
`;
