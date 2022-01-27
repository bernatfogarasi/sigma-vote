import styled from "styled-components";

const Wrapper = styled.textarea`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;
  font-family: Montserrat;
  border: 1px solid ${({ theme }) => theme.colors.middle};
  border-radius: 4px;
  resize: none;
`;

const TextArea = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default TextArea;
