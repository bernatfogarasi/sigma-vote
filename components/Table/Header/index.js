import styled from "styled-components";
import Cell from "./Cell";

const Wrapper = styled.div`
  display: table-header-group;
`;

const Header = ({ className, cells = [], ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      {Object.entries(cells).map((cell, index) => (
        <Cell key={index} cell={cell} />
      ))}
    </Wrapper>
  );
};

export default Header;
