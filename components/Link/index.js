import Link_ from "next/link";
import styled from "styled-components";

const Wrapper = styled(Link_)``;

const A = styled.a`
  color: black;
  text-decoration: none;
`;

const Link = ({ className, children, ...props }) => {
  return (
    <Wrapper {...props} passHref>
      <A className={className}>{children}</A>
    </Wrapper>
  );
};

export default Link;
