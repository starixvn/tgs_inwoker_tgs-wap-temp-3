import React from "react";

import styled from "styled-components";
import i18n from "../../../../../../../utils/i18n";

const Section = styled.div`
  color: #ffffff;
  width: 400px;
`;

const SectionTitle = styled.div`
  font-size: 34px;
  text-transform: uppercase;
`;

const LinkContainer = styled.div`
  margin: 20px 0;
  line-height: 35px;
`;

const Link = styled.div`
  width: max-content;

  cursor: pointer;
`;

const SocialMediaContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin: 20px 0;
`;

const SocialMedia = styled.div`
  width: 68px;
  height: 68px;
  background: ${({ src }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/pcHomePage/${src}.svg`
    }) no-repeat center /
  contain;`;
  }};
  cursor: pointer;
`;

const QuickLinks = ({ navigateTo }) => {
  return (
    <Section>
      <LinkContainer>
        <Link onClick={() => navigateTo("cs")}>24/7 Customer Service</Link>
        <Link onClick={() => navigateTo("faq")}>FAQs</Link>
        <Link onClick={() => navigateTo("privacy")}>Privacy Policy</Link>
        <Link onClick={() => navigateTo("terms")}>Terms and Conditions</Link>
        <Link onClick={() => alert(i18n.t("common.comingSoon"))}>
          Responsible Gaming
        </Link>
      </LinkContainer>
      <SectionTitle>Follow Us</SectionTitle>
      <SocialMediaContainer>
        <SocialMedia
          src="facebook"
          onClick={() => navigateTo("cs")}
        ></SocialMedia>
        <SocialMedia
          src="instagram"
          onClick={() => navigateTo("cs")}
        ></SocialMedia>
        <SocialMedia
          src="twitter"
          onClick={() => navigateTo("cs")}
        ></SocialMedia>
      </SocialMediaContainer>
    </Section>
  );
};

export default QuickLinks;
