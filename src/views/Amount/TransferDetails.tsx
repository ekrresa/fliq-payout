import styled from 'styled-components';

interface Props {
  amountToBeSent: number;
  currency: string;
  exchangeCurrency: string;
  exchangeRate?: number;
  defaultCurrency?: string;
  defaultTransferFee: number;
  transferFee: number;
}

const TRANSFER_FEE_CURRENCY = process.env.REACT_APP_TRANSFER_FEE_CURRENCY;

//TODO: Use display grid to create uniform separation
export function TransferDetails({
  amountToBeSent,
  currency,
  defaultCurrency = TRANSFER_FEE_CURRENCY,
  defaultTransferFee,
  exchangeCurrency,
  exchangeRate,
  transferFee,
}: Props) {
  return (
    <StyledParent>
      <div>
        <div className="item">
          <span className="inline-block text-main-light font-medium">
            {transferFee && currency
              ? transferFee + ' ' + currency
              : defaultTransferFee + ' ' + defaultCurrency}
          </span>
        </div>
        <div className="item">
          <span className="inline-block min-w-32 text-main-light font-medium">
            {new Intl.NumberFormat().format(amountToBeSent)} {currency}
          </span>
        </div>
        <div className="item">
          <span className="inline-block min-w-32 text-purple-gloom font-medium">
            {exchangeRate} {exchangeCurrency}
          </span>
        </div>
      </div>

      <div>
        <div className="text-main-light row-details">Transfer fee</div>
        <div className="text-main-light row-details">Amount we’ll convert</div>
        <div className="text-purple-gloom row-details">Guaranteed rate (1hr)</div>
      </div>
    </StyledParent>
  );
}

const StyledParent = styled.section`
  position: relative;
  padding-top: 0.8em;
  padding-bottom: 0.8em;
  display: grid;
  grid-template-columns: auto 1fr;

  &::after {
    content: '';
    position: absolute;
    width: 3px;
    background-color: #ededed;
    top: 0;
    bottom: 0;
    left: 18px;
  }

  .item {
    padding: 0.5rem 2rem 0.5rem 3rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      width: 25px;
      height: 25px;
      left: 7px;
      background-color: #ededed;
      border-radius: 50%;
      z-index: 1;
    }
  }

  .row-details {
    padding: 0.5rem 0rem;
    position: relative;
  }
`;
