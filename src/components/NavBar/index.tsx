import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import qs from 'query-string';

import Logo from '../../assets/images/logo.svg';
import Close from '../../assets/images/close.svg';

const viewMap = ['amount', 'recipient', 'review', 'payment'];

export function NavBar() {
  const location = useLocation();
  const currentView = qs.parse(location.search)?.stage as string | undefined;
  const currentViewIndex = currentView ? viewMap.indexOf(currentView) : 0;

  return (
    <header className="bg-white px-4 sm:px-6 py-6" data-testid="navbar">
      <div className="mx-auto max-w-6xl flex justify-between items-center">
        <img className="w-16 sm:w-20" src={Logo} alt="site logo" />

        <ul className="max-w-3xl mx-8 flex justify-between list-none w-full">
          <CheckoutStep
            completed={currentViewIndex > 0}
            isActive={!currentView || currentView === 'amount'}
          >
            <Link
              to="/"
              className={`font-semibold ${
                currentViewIndex > 0 ? 'text-purple-bright' : 'text-main-lightgrey'
              }`}
            >
              Amount
            </Link>
          </CheckoutStep>
          <CheckoutStep
            completed={currentViewIndex > 1}
            isActive={currentView === 'recipient'}
          >
            <Link
              to="/?stage=recipient"
              className={`font-semibold ${
                currentViewIndex > 1 ? 'text-purple-bright' : 'text-main-lightgrey'
              }`}
            >
              Recipient
            </Link>
          </CheckoutStep>
          <CheckoutStep completed={currentViewIndex > 2} isActive={currentView === 'review'}>
            <Link
              to="/?stage=review"
              className={`font-semibold ${
                currentViewIndex > 2 ? 'text-purple-bright' : 'text-main-lightgrey'
              }`}
            >
              Review
            </Link>
          </CheckoutStep>
          <CheckoutStep completed={currentViewIndex > 3} isActive={currentView === 'payment'}>
            <Link
              to="/?stage=payment"
              className={`font-semibold ${
                currentViewIndex > 3 ? 'text-purple-bright' : 'text-main-lightgrey'
              }`}
            >
              Pay
            </Link>
          </CheckoutStep>
        </ul>

        <img className="w-4" src={Close} alt="close icon" />
      </div>
    </header>
  );
}

const CheckoutStep = styled.li<{ isActive: boolean; completed: boolean }>`
  position: relative;
  flex: 1;
  text-align: center;

  &::before {
    ${props =>
      props.isActive
        ? css`
            content: '';
          `
        : null}
    height: 11px;
    width: 11px;
    line-height: 30px;
    border: 2px solid #4305eb;
    display: block;
    text-align: center;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    background-color: #4305eb;
    z-index: 6;
    position: absolute;
    left: 48%;
    top: -14px;
  }

  &::after {
    content: '';
    width: 100%;
    height: 3px;
    ${props =>
      props.completed
        ? css`
            background: linear-gradient(90deg, #4305eb 64.83%, #4305eb 99.42%);
          `
        : css`
            background: #ededed;
          `}

    top: -10px;
    left: 51%;
    z-index: 1;
    position: absolute;
  }

  &:last-child::after {
    content: none;
  }
`;
