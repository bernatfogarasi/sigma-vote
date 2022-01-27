import styled from "styled-components";

const Wrapper = styled.div``;

const Paragraph = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default Paragraph;
