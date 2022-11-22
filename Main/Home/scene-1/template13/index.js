import React, { useState } from "react";
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
   
  background: ${theme.primary};  
  filter: drop-shadow(0 0 2px ${theme.primary})
  drop-shadow(0 0 2px ${theme.primary}) contrast(1)
  brightness(1);

  ${GameListItemIcon}{
    background: #fff;
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

const GameButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const GameFrameImg = styled.div`
  display: block;

  aspect-ratio: 1;
  border-radius: 20px;
  background: url(${(props) => props.src}) no-repeat;
  background-position: center;
  background-size: cover;
`;

const Maintenance = styled.div`
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 2;
  font-size: 40px;
  font-weight: bold;
  text-transform: capitalize;
`;

const LogoOverlay = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 0;
  font-size: 40px;
  font-weight: bold;
  text-transform: capitalize;
  background: rgba(0, 0, 0, 0.5);
`;

const NewWrapper = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 20px;

  ${({ maintenance }) => {
    return maintenance
      ? `
      ${GameFrameImg}{
        filter: brightness(20%) grayscale(200%);
      }

    
      ${Maintenance}{
        display: flex;
    }
    
    ${LogoOverlay}  { 
      display: none;
    }
    
    `
      : ``;
  }}
`;

const MaintenanceContentHolder = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Template13 = ({
  gameMenu2,
  changeShowGame,
  homePageGameList,
  getImgPrefix,
  handleGameClick,
}) => {
  const [selected, setSelected] = useState("");
  var currentType = -1;

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
                    if (selected === i.type) {
                      setSelected("");
                    } else {
                      changeShowGame(i.type);
                      setSelected(i.type);
                    }
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
        {selected ? (
          <GameButtonWrapper>
            {(() => {
              return homePageGameList
                .filter((game) => selected.indexOf(game.type) >= 0)
                .sort((a, b) => {
                  if (config.features.LiveGame_Sorting_SKY) {
                    var sortDGFirst = ["DG"];
                    return (
                      sortDGFirst.indexOf(b.abbreviation) -
                      sortDGFirst.indexOf(a.abbreviation)
                    );
                  } else return b - a;
                })
                .map((row, index) => {
                  return (
                    <NewWrapper maintenance={row.status !== 0}>
                      <Maintenance>
                        <MaintenanceContentHolder>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/wapp/resource/T13/homepage/notavailable.png"
                            }
                            alt={"not available"}
                            style={{
                              width: "200px",

                              transform: "rotate(-35deg)",
                            }}
                          />
                        </MaintenanceContentHolder>
                      </Maintenance>
                      <LogoOverlay
                        onClick={() =>
                          handleGameClick(
                            row.type,
                            row.gpcode,
                            row.game_platform_id
                          )
                        }
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `/assets/images/provider/${row.abbreviation.toLowerCase()}.png`
                          }
                          style={{ width: "200px", height: "auto" }}
                          alt={row.abbreviation.toLowerCase()}
                        />
                      </LogoOverlay>
                      <GameFrameImg
                        src={`${
                          process.env.PUBLIC_URL
                        }/assets/images/wapGame/T13/${getImgPrefix(
                          row.type
                        )}-${row.abbreviation.toLowerCase()}.jpg`}
                        id={
                          currentType !== row.type
                            ? `gameType${row.type}`
                            : `gameId${row.id}`
                        }
                        onClick={() =>
                          handleGameClick(
                            row.type,
                            row.gpcode,
                            row.game_platform_id
                          )
                        }
                      ></GameFrameImg>
                    </NewWrapper>
                  );
                });
            })()}
          </GameButtonWrapper>
        ) : (
          <>
            <ContentWrapper title="topgames" type="game" />
            <ContentWrapper title="topgames" type="game" />
            <ContentWrapper title="topgames" type="game" />
            <ContentWrapper title="topgames" type="game" />
            <ContentWrapper title="topgames" type="game" />
            <ContentWrapper title="topgames" type="game" />
          </>
        )}
      </GridWrapper>
    </TheContainer>
  );
};

export default Template13;
