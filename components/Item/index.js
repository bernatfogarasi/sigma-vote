import styled from "styled-components";

const Wrapper = styled.div`
  padding: 10px;
  border: 1px solid #aaa;
  box-sizing: border-box;
`;

const Item = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default Item;
