import Button from "components/Button";
import styled from "styled-components";

const Wrapper = styled(Button)``;

const Submit = ({ className, children, ...props }) => {
  return (
    <Wrapper className={className} type="submit" {...props}>
      {children || "Submit"}
    </Wrapper>
  );
};

export default Submit;
