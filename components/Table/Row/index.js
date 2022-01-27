import Button from "components/Button";
import styled from "styled-components";
import Cell from "./Cell";

const Wrapper = styled.div`
  display: table-row;
  width: 100%;
`;

const Remove = styled(Button)``;

const Row = ({ className, index, cells = [], removable, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      {Object.entries(cells).map((cell, index) => (
        <Cell key={index} cell={cell}></Cell>
      ))}
    </Wrapper>
  );
};

export default Row;
