import styled from "styled-components";

const Wrapper = styled.div`
  height: 20px;
  background-image: linear-gradient(
    90deg,
    #eeb902,
    #eeb902 25%,
    #2d7dd2 25%,
    #2d7dd2 50%,
    #97cc04 50%,
    #97cc04 75%,
    #f45d01 75%,
    #f45d01
  );
`;

const Colors = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default Colors;
