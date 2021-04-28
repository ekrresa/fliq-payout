import styled from 'styled-components';

export function TransferDetails() {
  return (
    <StyledParent>
      <div className="item">
        <span className="inline-block min-w-32 text-main-light font-medium">3.56 USD</span>
        <span className="text-main-light">Transfer fee</span>
      </div>
      <div className="item">
        <span className="inline-block min-w-32 text-main-light font-medium">996.31 EUR</span>
        <span className="text-main-light">Amount we’ll convert</span>
      </div>
      <div className="item">
        <span className="inline-block min-w-32 text-purple-gloom font-medium">1.65 EUR</span>
        <span className="text-purple-gloom">Guaranteed rate (1hr)</span>
      </div>
    </StyledParent>
  );
}

const StyledParent = styled.section`
  position: relative;
  padding-top: 0.5em;
  padding-bottom: 0.5em;

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
