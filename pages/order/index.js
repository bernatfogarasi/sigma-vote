import styled from "styled-components";

const Wrapper = styled.div``;

const Order = ({ className, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      Order
    </Wrapper>
  );
};

export default Order;
