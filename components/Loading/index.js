import Page from "components/Page";
import Spinner_ from "components/Spinner";
import styled from "styled-components";

const Wrapper = styled(Page)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Spinner = styled(Spinner_)`
  margin: auto;
`;

const Loading = ({ className, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      <Spinner />
    </Wrapper>
  );
};

export default Loading;
