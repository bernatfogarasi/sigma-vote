import Button from "components/Button";
import usePoll from "hooks/usePoll";
import styled from "styled-components";

const Wrapper = styled(Button)`
  grid-column: 1;
  background: ${({ theme }) => theme.colors.error};
`;

const Clear = ({ className, children, ...props }) => {
  const { entries, setEntries } = usePoll();
  const onClick = () => {
    if (entries) setEntries([]);
  };
  return (
    <Wrapper className={className} onClick={onClick} {...props}>
      {children || "Clear all"}
    </Wrapper>
  );
};

export default Clear;
