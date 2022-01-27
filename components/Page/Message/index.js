import Image_ from "components/Image";
import Spinner_ from "components/Spinner";
import { AppContext } from "contexts";
import { useContext } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  border: 1px solid ${({ theme }) => theme.colors.middle};
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Image = styled(Image_)`
  /* background: ${({ theme, background }) => theme.colors[background]}; */
  height: 20px;
`;

const Spinner = styled(Spinner_)``;

const types = {
  success: { background: "success", image: "/success.png" },
  warning: { background: "warning", image: "/warning.png" },
  error: { background: "error", image: "/error.png" },
  loading: { background: "back", image: "/loading.png" },
};

const Message = ({ className, ...props }) => {
  const { message } = useContext(AppContext);

  const type = types[message.type];

  return (
    <Wrapper className={className} {...props}>
      {message.type === "loading" ? (
        <Spinner height={20} />
      ) : (
        <Image src={type.image} background={type.background} />
      )}
      {message.text}
    </Wrapper>
  );
};

export default Message;
