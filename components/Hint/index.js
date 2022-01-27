import styled from "styled-components";

const Wrapper = styled.div`
  opacity: 0.6;
`;

const Hint = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default Hint;
