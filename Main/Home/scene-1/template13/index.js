import React, { useEffect, useState } from "react";
import styled from "styled-components";
import config from "../../../../../../config/config";
import i18n from "../../../../../../utils/i18n";
import Marquee from "../../Marquee";
import { shared } from "../shared";
import ContentWrapper from "./contentwrapper";

const TheContainer = styled.div``;

const GameLister = styled.div`
  overflow: auto;

  margin-bottom: 10px;
  overflow: auto;
  padding-right: 20px;
  display: -webkit-box;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TheText = styled.div`
  font-size: 20px;
  white-space: nowrap;
  width: 150px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 10px 0;

  color: ${({ theme }) => theme.gamelisterOriginalText};
  ${() => config.brand === "TIGER" && `font-weight: bold; font-size: 24px;`}
`;

const CustomImageResizer = styled.div`
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.gamelisterOriginalColor};
  mask: ${({ icon }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/home/T8/${icon}.svg`
    }) no-repeat center /
    contain;`;
  }};
`;

const Dot = styled.div`
  border-radius: 20px;
  position: absolute;
  zindex: 0;
  display: none;
`;

const Arrow = styled.div`
  position: absolute;
  bottom: -2px;
  left: 45%;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  display: none;
`;

const ListerWrapper = styled.div`
  padding-left: 20px;
  ${({ selected }) => {
    return selected
      ? `
      ${Arrow} {
        display: block;
      }
  `
      : "";
  }};
`;

const GameListItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 10px;
  width: 150px;
  background: #27273f;
  color: #fff;
  justify-content: center;
  border: ${({ theme }) => theme.gamelisterBorder};
  ${({ selected, theme }) => {
    return selected
      ? `
   
    
      ${CustomImageResizer}{
        background:${theme.gamelisterSelectedIcon};
      }

      ${Dot}{
        display: block;
      }


    `
      : "";
  }};
  border-radius: 20px;
`;

const GridWrapper = styled.div`
  padding: 0 20px 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const GameListItemIcon = styled.div`
  min-height: 80px;
  min-width: 80px;

  height: 41px;
  width: 45px;

  mask: ${({ src }) => {
    return `url(${
      process.env.PUBLIC_URL +
      `/assets/images/wapp/resource/T13/homepage/icon/${src}.png`
    }) no-repeat center /
    contain;`;
  }};
  background: ${({ theme }) => theme.primary};
`;

const AnnouncementSection = styled.div`
  background: #27273f;
  margin: 15px 20px;
  color: #fff;
  padding: 10px 20px;
  border-radius: 50px;
  min-height: 50px;
  display: flex;
  align-items: center;
`;

const Template13 = ({
  gameMenu2,
  changeShowGame,
  homePageGameList,
  getImgPrefix,
  handleGameClick,
}) => {
  const [selected, setSelected] = useState("");

  useEffect(() => {
    if (selected === "") {
      setSelected(gameMenu2[0].type);
    }
  }, []);

  return (
    <TheContainer>
      <GameLister>
        {shared.theSorter(gameMenu2).map((i, index) => {
          //hide if 0 game found.
          var newList = homePageGameList.filter(
            (game) => i.type.indexOf(game.type) >= 0
          );
          if (newList.length > 0) {
            return (
              <ListerWrapper
                index={index}
                style={{ position: "relative", paddingBottom: 5 }}
                selected={selected === i.type}
              >
                <GameListItem
                  selected={selected === i.type}
                  onClick={() => {
                    changeShowGame(i.type);
                    setSelected(i.type);
                  }}
                >
                  <GameListItemIcon src={i.type} />
                  <TheText style={{ zIndex: 1 }}>{i18n.t(i.title)}</TheText>
                </GameListItem>
              </ListerWrapper>
            );
          }
        })}
      </GameLister>
      <AnnouncementSection>
        <Marquee />
      </AnnouncementSection>
      <GridWrapper>
        <ContentWrapper title="topgames" type="game" />
        <ContentWrapper title="topgames" type="game" />
        <ContentWrapper title="topgames" type="game" />
        <ContentWrapper title="topgames" type="game" />
        <ContentWrapper title="topgames" type="game" />
        <ContentWrapper title="topgames" type="game" />
      </GridWrapper>
    </TheContainer>
  );
};

export default Template13;
