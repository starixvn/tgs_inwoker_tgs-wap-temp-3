import React from "react";
import styled from "styled-components";

const NewsWrapper = styled.div`
  margin-bottom: 20px;
  border-radius: 40px;
`;

const Content = styled.div`
  padding: 30px;
  border: solid 1px #fff;
  border-radius: 0 0 40px 40px;
`;

const Title = styled.div`
  font-size: 40px;
  padding-bottom: 10px;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 24px;
`;

const ImageWrapper = styled.div`
  height: 300px;
  width: 100%;
  background: url(${({ src }) => src}) no-repeat center;
  background-size: cover;
`;

const News = ({ data, onClick }) => {
  return (
    <NewsWrapper onClick={onClick}>
      <ImageWrapper
        style={{ width: "100%", height: "300px" }}
        src={
          process.env.PUBLIC_URL + "/assets/images/news/w" + data.image + ".jpg"
        }
      />
      <Content>
        <Title>{data.title}</Title> <Description>{data.content}</Description>
      </Content>
    </NewsWrapper>
  );
};

export default News;
