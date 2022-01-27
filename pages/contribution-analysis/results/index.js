import Page from "components/Page";
import styled from "styled-components";
import Section_ from "components/Section";
import { useEffect, useState } from "react";
import useQuery from "hooks/useQuery";
import useRequest from "hooks/useRequest";
import Table from "components/Table";
import Pie from "components/Pie";
import Spinner_ from "components/Spinner";
import Loading from "components/Loading";
import Error from "components/Error";

const Wrapper = styled(Page)``;

const Section = styled(Section_)`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const Spinner = styled(Spinner_)`
  margin: auto;
`;

const Home = ({ className, ...props }) => {
  const [voters, setVoters] = useState([]);

  const { get, json, loading, status } = useRequest((json) => {
    if (json?.voters?.length) setVoters(json.voters);
  });

  const query = useQuery();

  useEffect(() => {
    if (!query) return;
    const { id, voterId, token } = query;
    const queryString = new URLSearchParams({ id, voterId, token });
    get(`/api/contribution-analysis/results?${queryString}`);
  }, [query]);

  return loading ? (
    <Loading />
  ) : status === 200 ? (
    <Wrapper className={className} {...props}>
      <Section title="Results">
        <Table
          header={{ name: "Name", points: "Points" }}
          rows={voters.map((voter) => ({
            ...voter,
            points: (voter.points / voters.length).toFixed(1),
          }))}
        />

        {voters?.length ? (
          <Pie
            data={voters.reduce(
              (previous, voter) => ({
                ...previous,
                [voter.name]: (voter.points / voters.length).toFixed(1),
              }),
              {}
            )}
          />
        ) : null}
      </Section>
    </Wrapper>
  ) : (
    <Error status={status} json={json} />
  );
};

export default Home;
