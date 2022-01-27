import styled from "styled-components";

const Wrapper = styled.form``;

const Form = ({ className, onSubmit, ...props }) => {
  const onSubmitIntercept = (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit(event);
  };

  return (
    <Wrapper
      className={className}
      onSubmit={onSubmitIntercept}
      {...props}
    ></Wrapper>
  );
};

export default Form;
