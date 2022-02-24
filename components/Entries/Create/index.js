import Button from "components/Button";
import usePoll from "hooks/usePoll";
import useRequest from "hooks/useRequest";
import Router from "next/router";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled(Button)`
  grid-column: 3;
`;

const Create = ({ className, type, body, ...props }) => {
  const { entries, title, description } = usePoll();

  const { post, status } = useRequest();

  const onClick = async () => {
    post(`/api/${type}`, { voters: entries, title, description });
  };

  useEffect(() => {
    if (status !== 200) return;
    const queryString = new URLSearchParams({ type: "created" });
    Router.push(`/feedback?type=created`);
  }, [status]);

  return (
    <Wrapper className={className} onClick={onClick} {...props}>
      Create
    </Wrapper>
  );
};

export default Create;
