import Input_ from "components/Input";
import Label_ from "components/Label";
import TextArea from "components/TextArea";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled(Label_)`
  font-size: 14px;
  font-weight: bold;
`;

const Input = styled(Input_)`
  width: 100%;
`;

const Field = ({ className, children, textarea, ...props }) => {
  return (
    <Wrapper className={className}>
      <Label>{children}</Label>
      {textarea ? <TextArea {...props} /> : <Input {...props} />}
    </Wrapper>
  );
};

export default Field;
