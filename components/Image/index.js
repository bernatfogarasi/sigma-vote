import styled from "styled-components";

const Wrapper = styled.img``;

const Image = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default Image;
