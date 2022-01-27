import styled from "styled-components";
import Cell_ from "components/Cell";

const Wrapper = styled(Cell_)`
  background: #eee;
`;

const Cell = ({ className, cell, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      {cell[1]}
    </Wrapper>
  );
};

export default Cell;
