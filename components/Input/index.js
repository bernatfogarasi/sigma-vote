import styled from "styled-components";

const Wrapper = styled.input`
  font-size: 18px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.middle};
  box-sizing: border-box;
  font-family: Montserrat;
`;

const Input = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default Input;
