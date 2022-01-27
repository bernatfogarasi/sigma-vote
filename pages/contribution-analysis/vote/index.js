import Page from "components/Page";
import styled from "styled-components";
import Section_ from "components/Section";
import { useEffect, useState } from "react";
import useQuery from "hooks/useQuery";
import ItemInput from "components/ItemInput";
import Button from "components/Button";
import useRequest from "hooks/useRequest";
import Error from "components/Error";
import Loading from "components/Loading";

const Wrapper = styled(Page)``;

const Section = styled(Section_)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  color: ${({ color, theme }) => theme.colors[color]};
  font-weight: bold;
`;

const Home = ({ className, ...props }) => {
  const [voters, setVoters] = useState([]);
  const [votes, setVotes] = useState({});
  const [sum, setSum] = useState(0);
  const [message, setMessage] = useState({});

  const query = useQuery();

  const {
    get: getVoters,
    status: statusVoters,
    loading: loadingVoters,
    json: jsonVoters,
  } = useRequest((json) => {
    if (json?.voters?.length) setVoters(json.voters);
  });

  const { post: postVote } = useRequest();

  useEffect(() => {
    if (!query) return;
    const { id, voterId, token } = query;
    const queryString = new URLSearchParams({ id, voterId, token }).toString();
    getVoters(`/api/contribution-analysis/?${queryString}`);
  }, [query]);

  useEffect(() => {
    const sum = Object.values(votes).reduce(
      (previous, vote) => previous + vote,
      0
    );
    setSum(sum);
    const message =
      sum < 100
        ? {
            text: `Please allocate ${100 - sum} ${
              sum === 0 ? "" : "more"
            } points.`,
            color: "error",
          }
        : sum === 100
        ? { text: `All points allocated.`, color: "success" }
        : { text: `Please remove ${sum - 100} points`, color: "error" };
    setMessage(message);
  }, [votes]);

  const onChange = (event) => {
    const { name, value } = event.target;
    const number = Number.isInteger(Number(value))
      ? Math.min(Math.max(0, Number(value)), 100)
      : 0;
    setVotes({ ...votes, [name]: number });
    event.target.value = number;
  };

  const onSubmit = async () => {
    const { id, voterId, token } = query;
    const queryString = new URLSearchParams({ id, voterId, token }).toString();
    postVote(`/api/contribution-analysis/vote?${queryString}`, votes);
  };

  return loadingVoters ? (
    <Loading />
  ) : statusVoters === 200 ? (
    <Wrapper className={className} {...props}>
      <Section title="Vote">
        You may allocate a total of 100 points to the participants below, based
        on how much they have contributed. You only have to give points to other
        participants (the person voting is excluded).
        <Message color={message.color}>{message.text}</Message>
        {voters.map(({ _id, name }) => (
          <ItemInput
            autoComplete="off"
            key={_id}
            name={_id}
            title={name}
            onChange={onChange}
            defaultValue={0}
          ></ItemInput>
        ))}
        <Button onClick={onSubmit} disabled={sum !== 100}>
          Submit
        </Button>
      </Section>
    </Wrapper>
  ) : (
    <Error status={statusVoters} json={jsonVoters} />
  );
};

export default Home;
