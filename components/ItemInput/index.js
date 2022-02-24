import Input_ from "components/Input";
import Item from "components/Item";
import styled from "styled-components";

const Wrapper = styled(Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div``;

const Input = styled(Input_)`
  width: 100%;
  max-width: 100px;
  margin-left: auto;
`;

const Sign = styled.div``;

const ItemInput = ({ className, title, ...props }) => {
  return (
    <Wrapper className={className}>
      <Title>{title}</Title>
      <Input {...props} />
      <Sign>%</Sign>
    </Wrapper>
  );
};

export default ItemInput;
