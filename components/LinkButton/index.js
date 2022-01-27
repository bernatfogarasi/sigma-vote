import Link from "components/Link";
import styled, { css } from "styled-components";

const Wrapper = styled(Link)`
  padding: 10px;
  border-radius: 4px;
  transition: 0.2s;
  :hover {
    opacity: 0.8;
  }
  ${({ theme }) => css`
    background: ${theme.colors.primary};
    color: ${theme.colors.back};
  `}
`;

const LinkButton = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default LinkButton;
