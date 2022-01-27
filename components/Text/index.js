import styled from "styled-components";

const Wrapper = styled.div``;

const Text = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default Text;
