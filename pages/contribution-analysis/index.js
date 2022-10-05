import Entries from "components/Entries";
import Page from "components/Page";
import { PollContext } from "contexts";
import useLocalStorage from "hooks/useLocalStorage";
import styled from "styled-components";

const Wrapper = styled(Page)``;

const ContributionAnalysis = ({ className, ...props }) => {
  const [entries, setEntries] = useLocalStorage([], "entries");
  const [title, setTitle] = useLocalStorage("", "title");
  const [description, setDescription] = useLocalStorage("", "description");

  return (
    <PollContext.Provider
      value={{
        entries,
        setEntries,
        title,
        setTitle,
        description,
        setDescription,
      }}
    >
      <Wrapper className={className} {...props}>
        <Entries
          title={"Create a Contribution Analysis"}
          type={"contribution-analysis"}
          header={{ name: "Name", email: "Email" }}
        />
      </Wrapper>
    </PollContext.Provider>
  );
};

export default ContributionAnalysis;
