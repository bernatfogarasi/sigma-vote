import { AppContext } from "contexts";
import { useContext } from "react";
import styled from "styled-components";
import Colors from "./Colors";
import Header from "./Header";
import Message from "./Message";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  margin: auto;
  max-width: 600px;
  width: 80%;
  box-sizing: border-box;
  padding: 20px;
`;

const Page = ({ className, children, ...props }) => {
  const { message } = useContext(AppContext);
  return (
    <Wrapper>
      <Colors />
      <Header />
      <Content className={className} {...props}>
        {children}
      </Content>
      {message && <Message />}
    </Wrapper>
  );
};

export default Page;
