import styled from "styled-components";
import Cell_ from "components/Cell";

const Wrapper = styled(Cell_)``;

const Cell = ({ className, cell, children, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      {cell?.[1]}

      {children}
    </Wrapper>
  );
};

export default Cell;
