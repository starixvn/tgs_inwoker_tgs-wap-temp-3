import React from "react";
import styled from "styled-components";

const ContentWrapperx = styled.div`
  background: #0e0f1a;
  border-radius: 50px;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 30px 60px 30px;
`;

const TitleSection = styled.div`
  display: flex;
  font-size: 50px;
  gap: 10px;
  align-items: center;
  padding: 0 0 20px 0;
`;

const IconHolder = styled.img`
  height: 80px;
  width: 80px;
`;

const ContentHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const TheGamesOrContent = styled.div`
  background: green;
  height: 300px;
  position: relative;
  border-radius: 50px;
`;

const TheOverlay = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  background: rgba(27, 29, 48, 0.25);
  :active {
    opacity: 1;
  }

  /** make opacity animation**/
  transition: opacity 0.5s;
`;

const JoinButton = styled.div`
  width: 150px;
  height: 60px;
  background: #cf2029;
  border-radius: 50px;

  filter: drop-shadow(0 0 10px ${({ theme }) => theme.primary})
    drop-shadow(0 0 10px ${({ theme }) => theme.primary}) contrast(1)
    brightness(1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;

  text-transform: uppercase;
`;

const TheContent = styled.div``;

const TheWrapperContents = () => {
  return (
    <TheGamesOrContent oncontextmenu="return false">
      <TheContent>123</TheContent>
      <TheOverlay>
        <JoinButton>Play</JoinButton>
      </TheOverlay>
    </TheGamesOrContent>
  );
};

const ContentWrapper = ({ title, children, icon }) => {
  return (
    <ContentWrapperx>
      <TitleSection>
        <IconHolder
          src={
            process.env.PUBLIC_URL +
            "/assets/images/wapp/resource/T13/homepage/wrapper-icon/" +
            icon +
            ".svg"
          }
        />
        <div>{title}</div>
      </TitleSection>
      <ContentHolder>
        {children ? (
          children
        ) : (
          <>
            <TheWrapperContents /> <TheWrapperContents /> <TheWrapperContents />{" "}
            <TheWrapperContents />
          </>
        )}
      </ContentHolder>
    </ContentWrapperx>
  );
};

export default ContentWrapper;
