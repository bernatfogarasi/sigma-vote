import styled from "styled-components";

const Wrapper = styled.div`
  font-family: sans-serif;
  font-weight: 600;
  font-size: 30px;
`;

const Logo = ({ className, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      Σ
    </Wrapper>
  );
};

export default Logo;
