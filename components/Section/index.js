import styled from "styled-components";
import Text from "components/Text";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const Title = styled(Text)`
  font-size: 40px;
  font-family: Bad Script;
`;

const Content = styled.div``;

const Section = ({ className, children, title, color, ...props }) => {
  return (
    <Wrapper>
      <Title color={color}>{title}</Title>
      <Content className={className} {...props}>
        {children}
      </Content>
    </Wrapper>
  );
};

export default Section;
