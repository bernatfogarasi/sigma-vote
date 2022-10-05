import Button from "components/Button";
import Field from "components/Field";
import LineHorizontal from "components/LineHorizontal";
import Section from "components/Section";
import Table_ from "components/Table";
import usePoll from "hooks/usePoll";
import styled from "styled-components";

import Clear from "./Clear";
import Create from "./Create";
import InputEntry from "./InputEntry";

const Wrapper = styled(Section)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  gap: 20px;
  width: 100%;
`;

const Title = styled(Field)`
  grid-column: 1 / 4;
`;

const Description = styled(Field)`
  grid-column: 1 / 4;
  height: 140px;
`;

const Line = styled(LineHorizontal)`
  grid-column: 1 / 4;
`;

const TableContainer = styled.div`
  grid-column: 1 / 4;

  overflow: auto;
`;

const Table = styled(Table_)``;

const Remove = styled(Button)`
  border: 1px solid;
  background: ${({ theme }) => theme.colors.error};
`;

const Text = styled.div`
  grid-column: 1 / 4;
`;

const Entries = ({ className, header, type, ...props }) => {
  const { entries, setEntries, title, setTitle, description, setDescription } =
    usePoll();

  const onRemove = (index) => {
    const entriesCopy = [...entries];
    entriesCopy.splice(index, 1);
    setEntries(entriesCopy);
  };

  return (
    <Wrapper className={className} {...props}>
      <Title value={title} onChange={(event) => setTitle(event.target.value)}>
        Title
      </Title>
      <Description
        textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      >
        Description
      </Description>
      <Line />
      <Text>Add a participant</Text>
      {!entries?.length || entries.length < 3 ? (
        <Text>Please add at least 3 participants.</Text>
      ) : null}
      <InputEntry
        {...Object.keys(header).reduce(
          (previous, key) => ({ ...previous, [key]: true }),
          {}
        )}
      ></InputEntry>
      <TableContainer>
        <Table
          header={{ ...header, remove: "Remove" }}
          rows={
            entries &&
            entries.map((entry, index) => ({
              ...entry,
              remove: (
                <Remove small onClick={() => onRemove(index)}>
                  Remove
                </Remove>
              ),
            }))
          }
        />
      </TableContainer>
      <Clear disabled={!entries?.length} />
      <Create type={type} disabled={!entries?.length || entries.length < 3} />
    </Wrapper>
  );
};

export default Entries;
