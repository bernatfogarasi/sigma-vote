import Input_ from "components/Input";
import Item from "components/Item";
import styled from "styled-components";

const Wrapper = styled(Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div``;

const Input = styled(Input_)``;

const ItemInput = ({ className, title, ...props }) => {
  return (
    <Wrapper className={className}>
      <Title>{title}</Title>
      <Input {...props} />
    </Wrapper>
  );
};

export default ItemInput;
