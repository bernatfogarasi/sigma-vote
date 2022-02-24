import styled from "styled-components";

import Header from "./Header";
import Row from "./Row";

const Wrapper = styled.div`
  border-collapse: collapse;
  display: table;

  /* width: 100%;
  box-sizing: border-box; */
`;

const Table = ({ className, header = [], rows = [], ...props }) => {
  header = { index: "Index", ...header };

  return (
    <Wrapper className={className} {...props}>
      <Header cells={header} />
      {rows.map((cells, index) => (
        <Row key={index} index={index} cells={{ index: index + 1, ...cells }} />
      ))}
      {!rows.length && (
        <Row
          cells={Object.keys(header).reduce(
            (previous, key) => ({
              ...previous,
              [key]: "-",
            }),
            {}
          )}
        />
      )}
    </Wrapper>
  );
};

export default Table;
