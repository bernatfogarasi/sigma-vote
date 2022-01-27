import styled, { css } from "styled-components";

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.middle};
  border-radius: 4px;
  padding: 20px;
  display: grid;
  grid-template-columns: 10px auto;
  gap: 20px;
  ${({ blocked }) =>
    blocked &&
    css`
      opacity: 0.5;
    `}
`;

const Color = styled.div`
  background: ${({ color, theme }) =>
    theme.colors?.[color] || color || theme.colors.primary};
  margin: -20px;
  grid-row: 1 / 3;
  margin-right: 0;
  grid-column: 1;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  grid-row: 1;
  grid-column: 2;
`;

const Content = styled.div`
  grid-row: 2;
  grid-column: 2;
`;

const Blocked = styled.div`
  font-size: 20px;
  margin-left: auto;
  font-weight: 800;
`;

const Box = ({ className, title, color, blocked, ...props }) => {
  return (
    <Wrapper blocked={blocked}>
      <Color color={color} />
      <Title>{title}</Title>
      {blocked ? (
        <Blocked>Coming soon</Blocked>
      ) : (
        <Content className={className} {...props}></Content>
      )}
    </Wrapper>
  );
};

export default Box;
