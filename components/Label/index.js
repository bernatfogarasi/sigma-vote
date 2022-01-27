import styled from "styled-components";

const Wrapper = styled.label``;

const Label = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default Label;
