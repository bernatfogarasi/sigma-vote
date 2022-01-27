import Page from "components/Page";
import styled from "styled-components";

const Wrapper = styled(Page)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Status = styled.div`
  font-size: 20px;
`;

const Message = styled.div`
  font-size: 30px;
  font-weight: bold;
`;

const Info = styled.div``;

const Error = ({ className, status, json, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      <Status>Error {status}:</Status>
      <Message>{json?.message}</Message>
      <Info>{json?.error ? JSON.stringify(json?.error) : null}</Info>
    </Wrapper>
  );
};

export default Error;
