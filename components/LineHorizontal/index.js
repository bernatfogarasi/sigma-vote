import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.middle};
`;

const LineHorizontal = ({ className, ...props }) => {
  return <Wrapper className={className} {...props} />;
};

export default LineHorizontal;
