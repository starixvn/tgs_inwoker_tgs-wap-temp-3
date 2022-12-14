import React from "react";
import Header from "../../Share/Header";

import i18n from "../../../../utils/i18n";
import styled from "styled-components";
import { AppHistory } from "../../../../history/History";
import { useParams } from "react-router";
import { hardcodeNews } from "../../Main/Home/scene-1/template13/news/hardcoded";

const Container = styled.div`
  padding: 110px 40px;
  color: #fff;
`;

const ImageWrapper = styled.div`
  height: 300px;
  width: 100%;
  background: url(${({ src }) => src}) no-repeat center;
  background-size: cover;
  border-radius: 40px;
`;

const ContentText = styled.div`
  font-size: 28px;
`;

const Title = styled.div`
  font-size: 40px;
`;

const DetailedNews = ({ newsid }) => {
  let { id } = useParams();

  const goBack = () => {
    AppHistory.goBack();
  };

  const reference = (content) => {
    return hardcodeNews
      .filter((e) => {
        return e.id === id;
      })
      .map((data) => {
        if (content === "content2") {
          return (
            <ContentText
              dangerouslySetInnerHTML={{
                __html: "<div>" + data[content] + "</div>",
              }}
            ></ContentText>
          );
        } else {
          return data[content];
        }
      });
  };

  return (
    <div>
      <Header
        background={true}
        onBackClick={goBack}
        title={i18n.t("T2.marquee")}
      ></Header>
      <Container>
        <ImageWrapper
          style={{ width: "100%", height: "300px" }}
          src={
            process.env.PUBLIC_URL +
            "/assets/images/news/w" +
            reference("image") +
            ".jpg"
          }
        />
        <Title>{reference("title")}</Title>
        <div>{reference("content2")}</div>
      </Container>
    </div>
  );
};

export default DetailedNews;
