import styled from "styled-components";

const Wrapper = styled.div``;

const Select = ({ className, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      Select
    </Wrapper>
  );
};

export default Select;
