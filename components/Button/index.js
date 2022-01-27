import styled, { css } from "styled-components";

const Wrapper = styled.button`
  ${({ small }) =>
    small
      ? css`
          font-size: 12px;
          padding: 4px;
        `
      : css`
          min-width: 100px;
          font-size: 18px;
          padding: 5px;
        `};
  box-sizing: border-box;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.back};

  ${({ disabled }) =>
    disabled
      ? css`
          opacity: 0.3;
        `
      : css`
          :hover {
            opacity: 0.8;
            transform: scale(1.05);
          }
          :active {
            transform: scale(1);
          }
          transition: 0.1s;
          cursor: pointer;
        `}
`;

const Button = ({ className, type = "button", ...props }) => {
  return <Wrapper className={className} type={type} {...props}></Wrapper>;
};

export default Button;
