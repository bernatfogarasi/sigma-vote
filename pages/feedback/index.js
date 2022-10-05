import Image_ from "components/Image";
import Loading from "components/Loading";
import Page from "components/Page";
import Section_ from "components/Section";
import useQuery from "hooks/useQuery";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled(Page)``;

const Section = styled(Section_)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const types = {
  created: {
    title: "Success",
    description: (
      <>The poll was created successfully. Emails were sent to participants.</>
    ),
    image: "/success.png",
  },
  voted: {
    title: "Success",
    description: <>Vote recorded successfully.</>,
    image: "/success.png",
  },
};

const Description = styled.div`
  text-align: center;
`;

const Image = styled(Image_)`
  height: 40px;
`;

const Title = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const TitleText = styled.div``;

const Feedback = ({ className, ...props }) => {
  const [type, setType] = useState();

  const query = useQuery();

  useEffect(() => {
    if (!query) return;
    setType(types?.[query.type]);
  }, [query]);

  return type ? (
    <Wrapper className={className} {...props}>
      <Section
        title={
          <Title>
            <TitleText>{type.title}</TitleText>
            <Image src={type.image} alt="" />
          </Title>
        }
      >
        <Description>{type.description}</Description>
      </Section>
    </Wrapper>
  ) : (
    <Loading />
  );
};

export default Feedback;
