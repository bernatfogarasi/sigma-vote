import Link from "components/Link";
import styled from "styled-components";
import Logo from "./Logo";
import Title from "./Title";

const Wrapper = styled(Link)`
  font-size: 20px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 30px 10px;
  justify-content: center;
`;

const Header = ({ className, ...props }) => {
  return (
    <Wrapper className={className} href="/" {...props}>
      <Logo />
      <Title />
    </Wrapper>
  );
};

export default Header;
