import React, { useEffect, useState } from "react";
import { connect, Provider } from "react-redux";
import styled from "styled-components";
import { GameService } from "../../../../../../api-services/services/GameService";
import { GameTypeEnum } from "../../../../../../api-services/utils/Enum";
import config from "../../../../../../config/config";
import { AppHistory } from "../../../../../../history/History";
import Common from "../../../../../../utils/Common";
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
  background: #0e0f1a;
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

const SlotGameTypeWrapper = styled.div`
  font-size: 28px;
  color: #fff;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProviderListWrapper = styled.div`
  background: #24253c;
  border-radius: 50px;
  width: -webkit-fill-available;
`;
const ProviderList = styled.select`
  background: #24253c;
  border: none;
  border-radius: 50px;
  padding: 20px 40px;
  color: #fff;
  font-size: 28px;
  width: -webkit-fill-available;
`;

const SearchBar = styled.input`
  background: #24253c;
  border: none;
  border-radius: 50px;
  padding: 20px 40px;
  color: #fff;
  font-size: 28px;

  ::placeholder {
    color: #fff;
    font-size: 28px;
    opacity: 1;
  }
`;

const WrapTheGames = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 20px;
`;

const Title = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  padding: 10px;
  text-align: center;
`;

const Template13 = ({
  gameMenu2,
  changeShowGame,
  homePageGameList,
  getImgPrefix,
  handleGameClick,
  token,
}) => {
  const [selected, setSelected] = useState("");
  var currentType = -1;

  const [selectedBrand, setSelectedBrand] = useState("");
  const [keyword, setKeyword] = useState("");
  const [gameList, setGameList] = useState([]);

  var gameTypeToDisplayDifferently = (selectedGameType) => {
    return (
      selectedGameType[0] === GameTypeEnum.FISH ||
      selectedGameType[0] === GameTypeEnum.SLOT ||
      selectedGameType[0] === GameTypeEnum.TABLEGAME
    );
  };

  useEffect(() => {
    if (gameTypeToDisplayDifferently(selected)) {
      var result = GameService.GetGameList(selectedBrand, selected);
      result.then((e) => {
        if (e.IsSuccess) {
          setGameList(e.data);
        }
      });
    }
  }, [selected, selectedBrand]);

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
                      setKeyword("");
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
        {selected && gameTypeToDisplayDifferently(selected) ? (
          <SlotGameTypeWrapper>
            <SearchSection>
              <SearchBar
                placeholder={i18n.t("slot.search")}
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <ProviderListWrapper>
                <ProviderList
                  onChange={(e) => {
                    setSelectedBrand(e.target.value);
                  }}
                >
                  <option value="" selected>
                    {i18n.t("report.all")}
                  </option>
                  {homePageGameList
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
                    .map((data, index) => {
                      return (
                        <option key={index} value={data.gpcode}>
                          {data.gpcode}
                        </option>
                      );
                    })}
                </ProviderList>
              </ProviderListWrapper>
            </SearchSection>
            <WrapTheGames>
              {gameList
                .filter((a) => {
                  if (keyword === "") return true;
                  else
                    return a.name.toUpperCase().includes(keyword.toUpperCase());
                })
                .filter((s) => {
                  return s.isactive === true; // show only active game.
                })
                .map((row, index) => {
                  return (
                    <NewWrapper
                      key={index}
                      onClick={() => {
                        if (token) {
                          Common.PopupCenter(
                            `/${i18n.language}/joingame/${selected}/${row.gpcode}/${row.id}`,
                            "gamewindow"
                          );
                        } else {
                          AppHistory.push("/" + i18n.language + "/login");
                        }
                      }}
                    >
                      <Title>{row.name}</Title>
                      <GameFrameImg
                        src={`${
                          config.sourceUrl
                        }${row.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                          row.code
                        }.jpg`}
                        id={
                          currentType !== row.type
                            ? `gameType${row.type}`
                            : `gameId${row.id}`
                        }
                      ></GameFrameImg>
                    </NewWrapper>
                  );
                })}
            </WrapTheGames>
          </SlotGameTypeWrapper>
        ) : selected ? (
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
                    <NewWrapper maintenance={row.status !== 0} key={index}>
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
            <ContentWrapper title="topgames" type="game" icon="games" />
            <ContentWrapper title="topgames" type="game" icon="games" />
            <ContentWrapper title="topgames" type="game" icon="games" />
            <ContentWrapper title="topgames" type="game" icon="games" />
            <ContentWrapper title="topgames" type="game" icon="games" />
            <ContentWrapper title="topgames" type="game" icon="games" />
            <ContentWrapper title="Promotions" type="game" icon="promotions">
              123
            </ContentWrapper>
            <ContentWrapper title="jackpot" type="game" icon="jackpot">
              123
            </ContentWrapper>
            <ContentWrapper title="winners" type="game" icon="winners">
              123
            </ContentWrapper>
            <ContentWrapper title="top news" type="game" icon="news">
              123
            </ContentWrapper>
            <ContentWrapper
              title="pega gaming: a winning casino! "
              type="game"
              icon="pg"
            >
              123
            </ContentWrapper>
            <ContentWrapper title="About us " type="game" icon="about">
              123
            </ContentWrapper>
            <ContentWrapper title="Quick link" type="game" icon="links">
              123
            </ContentWrapper>
            <ContentWrapper title="Partners" type="game" icon="partners">
              123
            </ContentWrapper>
          </>
        )}
      </GridWrapper>
    </TheContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.account.token,
  };
};

export default connect(mapStateToProps, null)(Template13);
