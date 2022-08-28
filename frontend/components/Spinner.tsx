import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

type SpinnerProps = {
  className?: string;
};

const animation = keyframes`
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
`;

const Spinner = styled(({ className }: SpinnerProps) => {
  return (
    <div className={className}>
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  );
})`
  display: flex;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 12px;
  width: 60px;
  height: 50px;
  text-align: center;
  font-size: 10px;

  div {
    background-color: white;
    height: 100%;
    width: 6px;
    display: inline-block;
    margin-right: 4px;

    animation: ${animation} 1.2s infinite ease-in-out;
  }

  .rect2 {
    animation-delay: -1.1s;
  }

  .rect3 {
    animation-delay: -1s;
  }

  .rect4 {
    animation-delay: -0.9s;
  }

  .rect5 {
    animation-delay: -0.8s;
  }
`;

export default Spinner;

export const AbsoluteCenteredSpinner = ({ children, ...restProps }) => {
  return (
    <div
      css={css`
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        height: 100%;
        align-items: center;
        justify-content: center;
        display: flex;
        flex-direction: column;
        padding: 0;
      `}
    >
      <Spinner {...restProps} />

      {children}
    </div>
  );
};
