import Box from "components/Box";
import LinkButton from "components/LinkButton";
import Page from "components/Page";
import Section_ from "components/Section";
import styled from "styled-components";
import descriptions from "text/descriptions";

const Wrapper = styled(Page)``;

const Section = styled(Section_)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Description = styled.div``;

const Poll = styled(Box)`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 10px;
`;

const New = ({ className, ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      <Section title="Poll types">
        Invitations and results are sent by email.
        <Poll title="Contribution Analysis">
          <Description>{descriptions.contributionAnalysis}</Description>
          <LinkButton href="/contribution-analysis">Create</LinkButton>
        </Poll>
        <Poll title="Order items" color="success" blocked>
          <LinkButton href="/order">Create</LinkButton>
        </Poll>
        <Poll title="Select items" color="error" blocked>
          <LinkButton href="/select">Create</LinkButton>
        </Poll>
      </Section>
    </Wrapper>
  );
};

export default New;
