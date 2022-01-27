import styled from "styled-components";

const Wrapper = styled.div`
  display: table-cell;
  padding: 10px;
  border: 1px solid #aaa;
`;

const Cell = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default Cell;
