import Table from "components/Table";
import styled from "styled-components";

const Wrapper = styled(Table)``;

const TableResults = ({ className, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      TableResults
    </Wrapper>
  );
};

export default TableResults;
