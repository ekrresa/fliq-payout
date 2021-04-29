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
      <div className="item">
        <span className="inline-block min-w-32 text-main-light font-medium">
          {transferFee && currency
            ? transferFee + ' ' + currency
            : defaultTransferFee + ' ' + defaultCurrency}
        </span>
        <span className="text-main-light">Transfer fee</span>
      </div>
      <div className="item">
        <span className="inline-block min-w-32 text-main-light font-medium">
          {amountToBeSent} {currency}
        </span>
        <span className="text-main-light">Amount we’ll convert</span>
      </div>
      <div className="item">
        <span className="inline-block min-w-32 text-purple-gloom font-medium">
          {exchangeRate} {exchangeCurrency}
        </span>
        <span className="text-purple-gloom">Guaranteed rate (1hr)</span>
      </div>
    </StyledParent>
  );
}

const StyledParent = styled.section`
  position: relative;
  padding-top: 0.8em;
  padding-bottom: 0.8em;

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
    padding: 0.5rem 3rem;
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
`;
