import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px;
  border: 1px solid #aaa;
`;

const Item = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default Item;
