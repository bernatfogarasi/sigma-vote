import Field from "components/Field";
import Form from "components/Form";
import Submit from "components/Submit";
import usePoll from "hooks/usePoll";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  grid-column: span 3;
  gap: 10px;
`;

const Add = styled(Submit)`
  margin-left: auto;
`;

const InputEntry = ({
  className,
  name: showName,
  email: showEmail,
  children,
  ...props
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { entries, setEntries } = usePoll();

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onSubmit = () => {
    if (!entries) return;
    setEntries([
      ...entries,
      {
        name,
        email,
      },
    ]);
    setName("");
    setEmail("");
  };

  return (
    <Wrapper className={className} onSubmit={onSubmit} {...props}>
      {showName && (
        <Field onChange={onNameChange} value={name} required>
          Name
        </Field>
      )}
      {showEmail && (
        <Field onChange={onEmailChange} value={email} required>
          Email
        </Field>
      )}
      <Add disabled={!name || !email}>Add</Add>
      {children}
    </Wrapper>
  );
};

export default InputEntry;
