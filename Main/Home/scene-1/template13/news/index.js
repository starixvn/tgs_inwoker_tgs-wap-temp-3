import React from "react";
import styled from "styled-components";

const NewsWrapper = styled.div`
  border: solid 1px #fff;

  border-radius: 40px;
`;

const Content = styled.div`
  padding: 30px;
`;

const Title = styled.div`
  font-size: 40px;
`;

const Description = styled.div`
  font-size: 24px;
`;

const News = () => {
  return (
    <NewsWrapper>
      <img
        style={{ width: "100%" }}
        src={
          process.env.PUBLIC_URL +
          `/assets/images/wapp/resource/T13/homepage/dummy.svg`
        }
      />
      <Content>
        <Title>Caesars Racebook launches on Android and desktop</Title>{" "}
        <Description>
          The launch is in cooperation with Nyra Bets, the official online
          wagering platform of the New York Racing Association.
        </Description>
      </Content>
    </NewsWrapper>
  );
};

export default News;
