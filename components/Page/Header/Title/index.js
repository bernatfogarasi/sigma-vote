import styled from "styled-components";

const Wrapper = styled.div`
  font-weight: 800;
`;

const Title = ({ className, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      SigmaVote
    </Wrapper>
  );
};

export default Title;
