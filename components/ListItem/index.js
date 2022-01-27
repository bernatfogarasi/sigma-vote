import styled from "styled-components";

const Wrapper = styled.li``;

const ListItem = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default ListItem;
