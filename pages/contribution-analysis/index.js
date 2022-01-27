import Page from "components/Page";
import Entries from "components/Entries";
import { PollContext } from "contexts";
import styled from "styled-components";
import useLocalStorage from "hooks/useLocalStorage";
import { useState } from "react";

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
