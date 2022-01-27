import styled from "styled-components";

const Wrapper = styled.ol``;

const ListOrdered = ({ className, ...props }) => {
  return <Wrapper className={className} {...props}></Wrapper>;
};

export default ListOrdered;
