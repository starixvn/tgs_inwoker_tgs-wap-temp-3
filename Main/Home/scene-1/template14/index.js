import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { GameService } from "../../../../../../api-services/services/GameService";
import { GameTypeEnum } from "../../../../../../api-services/utils/Enum";
import config from "../../../../../../config/config";
import Common from "../../../../../../utils/Common";
import i18n from "../../../../../../utils/i18n";
import { shared } from "../shared";
import { playerList, gameList as gameListx } from "./../template11/hardcode";
import ContentWrapper from "./contentwrapper";
import { AppHistory } from "../../../../../../history/History";
import FavButton from "./favbutton";

const GameLister = styled.div`
  overflow: auto;
  padding-top: 130px;
  overflow: auto;
  padding-right: 20px;
  display: -webkit-box;
  background: #000325;
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
  padding: 20px;
  padding-top: 30px;
  width: 150px;

  color: #ffa200;
  justify-content: center;
  border: ${({ theme }) => theme.gamelisterBorder};

  border-radius: 20px;
`;

const GameListItemIcon = styled.div`
  min-height: 50px;
  min-width: 50px;

  mask: ${({ src }) => {
    return `url(${
      process.env.PUBLIC_URL +
      `/assets/images/wapp/resource/T13/homepage/icon/${src}.svg`
    }) no-repeat center /
    contain;`;
  }};
  background: ${({ theme }) => theme.primary};
`;

const MarqueeContainer = styled.div`
  background: #181c42;
  padding: 10px;
`;

const HomePageWrapper = styled.div`
  color: #fff;
  font-size: 24px;
`;

const UserInformation = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const AlignItemCenter = styled.div`
  display: flex;
  align-items: center;
`;

const QuickAction = styled(AlignItemCenter)`
  min-height: 175px;
  padding: 20px;
  background: #252958;
`;

const UserContainer = styled(AlignItemCenter)`
  justify-content: center;
  background: #181c42;
`;

const QuickActionButton = styled.div`
  color: #ffa200;
  gap: 10px;
`;

// create a component that mask image
const Icons = styled.div`
  height: 80px;
  width: 80px;
  mask: ${({ src }) => {
    return `url(${
      process.env.PUBLIC_URL + `/assets/images/wapp/bottomnav/${src}.svg`
    }) no-repeat center /
    contain;`;
  }};
  background: #ffa200;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #000325;
  min-height: 80vh;
  align-content: baseline;
`;

const GameWrapper = styled.div`
  padding: 0 20px 10px 20px;
`;

const GameButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  padding: 20px 20px 10px 20px;
  align-content: baseline;
  min-height: 80vh;
  background: #000325;
`;

const GameFrameImg = styled.div`
  display: block;

  aspect-ratio: 1;

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
  padding: 20px;
  color: #fff;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProviderListWrapper = styled.div`
  background: #1f213a;
  border-radius: 50px;
  width: -webkit-fill-available;
  position: relative;
`;
const ProviderList = styled.select`
  background: #1f213a;
  border: none;
  border-radius: 50px;
  padding: 20px 40px;
  color: #fff;
  font-size: 28px;
  width: -webkit-fill-available;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
`;

const SearchBar = styled.input`
  background: #1f213a;
  border: none;
  border-radius: 50px;
  padding: 20px 40px;
  color: #fff;
  font-size: 28px;
  font-family: "Montserrat", sans-serif;

  ::placeholder {
    color: #fff;
    font-size: 28px;
    opacity: 1;
  }
`;

const WrapTheGames = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`;

const Title = styled.div`
  position: absolute;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  padding: 10px;
  text-align: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArrowDown = styled.div`
  mask: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/btn-back-white.png`})
    no-repeat center;
  background: ${({ theme }) => theme.primaryText};
  width: 40px;
  height: 30px;

  mask-size: 25%;
  rotate: 275deg;
  position: absolute;
  right: 10px;
  bottom: 20px;
`;

const FavButtonHolder = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  transform: scale(0.8);
`;

const Template14 = ({
  gameMenu2,
  changeShowGame,
  homePageGameList,
  getImgPrefix,
  handleGameClick,
  token,
  game,
  general,
  alert,
  account,
}) => {
  const [selected, setSelected] = useState("");
  var currentType = -1;

  const [selectedBrand, setSelectedBrand] = useState("");
  const [keyword, setKeyword] = useState("");
  const [gameList, setGameList] = useState([]);
  const [prizeMin, sePrizeMin] = useState(5000);
  const [prizeMax, setPrizeMax] = useState(5);
  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(false);

  const initialJackpotAmount = 1822085;

  const [jackpotAmount, setJackpotAmount] = useState(initialJackpotAmount);

  var gameTypeToDisplayDifferently = (selectedGameType) => {
    return (
      selectedGameType[0] === GameTypeEnum.FISH ||
      selectedGameType[0] === GameTypeEnum.SLOT ||
      selectedGameType[0] === GameTypeEnum.TABLEGAME
    );
  };
  const quickAction = [
    { title: "common.deposit", type: "deposit", path: "/deposit" },
    { title: "common.withdrawal", type: "withdrawal", path: "/withdrawal" },
  ];

  useEffect(() => {
    const updateJackpotAmount = () => {
      //random digit from 0.05 to  0.2
      var randomDigit = Math.floor(Math.random() * 15 + 5) / 100;
      if (jackpotAmount < 9999999.99) {
        setJackpotAmount(
          (currentJackpotAmount) => currentJackpotAmount + randomDigit
        );
      } else {
        setJackpotAmount(initialJackpotAmount);
      }
    };

    const interval = setInterval(updateJackpotAmount, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  const randomize = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    const item = array[randomIndex];
    return item;
  };

  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (favList.length <= 0) {
      getFav(selected);
    } else {
      console.log(favList);
    }
  }, [favList]);

  const getFav = (type = GameTypeEnum.SLOT) => {
    var result = GameService.GetFavoriteGame(type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;
        setFavList(data);
      }
    });
  };

  const setFavGame = (gameId) => {
    var result = GameService.SetFavoriteGame(gameId);
    result.then((response) => {
      if (response.IsSuccess) {
        getFav(selected);
      }
    });
  };

  const removeFavGame = (gameId) => {
    var result = GameService.RemoveFavoriteGame(gameId);
    result.then((response) => {
      if (response.IsSuccess) {
        getFav(selected);
      }
    });
  };

  const generateList = () => {
    let tempList = [];
    for (var i = 0; i < 10; i++) {
      let name = randomize(playerList);
      let game = randomize(gameListx);
      let prize = Math.floor(
        Math.random() * (prizeMax - prizeMin + 1) + prizeMin
      );
      tempList.push({
        id: Math.random().toString(16).slice(2),
        img: `${
          config.sourceUrl
        }${game.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
          game.code
        }.jpg`,
        playerName: name,
        gameName: game.name,
        prize: Common.formatNumberWithThousand(prize),
      });
    }
    setList(tempList);
  };

  useEffect(() => {
    if (gameList.length <= 0) {
      var result = GameService.GetGameList("", GameTypeEnum.SLOT);
      result.then((e) => {
        if (e.IsSuccess) {
          setGameList(e.data);
          setLoading(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    setLoading(false);
    if (gameTypeToDisplayDifferently(selected)) {
      setLoading(true);
      var result = GameService.GetGameList(selectedBrand, selected);
      result.then((e) => {
        if (e.IsSuccess) {
          getFav(selected);
          setGameList(e.data);
          setLoading(false);
        }
      });
    }
  }, [selected, selectedBrand]);

  useEffect(() => {
    if (list.length <= 0) {
      generateList();
    }
  });
  const checking = (variant) => {
    return gameList.filter((a) => {
      return a.tag[variant] === true;
    });
  };
  const handleJoinGameClick = (row) => {
    Common.closePreviousPopup();
    if (token) {
      Common.PopupCenter(
        `/joingame/${selected || GameTypeEnum.SLOT}/${row.gpcode}/${row.id}`,
        "gamewindow"
      );
    } else {
      AppHistory.push("/login");
    }
  };
  const navigateToSlot = () => {
    setLoading(true);
    setSelected([GameTypeEnum.SLOT]);
    changeShowGame([GameTypeEnum.SLOT]);
    window.scrollTo(0, 0);
  };

  return (
    <HomePageWrapper>
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
                style={{ position: "relative" }}
                selected={selected === i.type}
              >
                <GameListItem
                  selected={selected === i.type}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    setLoading(false);
                    if (selected === i.type) {
                      setSelected("");
                    } else {
                      if (gameTypeToDisplayDifferently(selected)) {
                        setLoading(true);
                      }

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

      <GridWrapper>
        {selected && gameTypeToDisplayDifferently(selected) ? (
          <SlotGameTypeWrapper>
            <SearchSection>
              <SearchBar
                placeholder={i18n.t("T13.slot.search")}
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
                    {i18n.t("T13.slot.provider")}
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
                          {data.name}
                        </option>
                      );
                    })}
                </ProviderList>{" "}
                <ArrowDown />
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
                        handleJoinGameClick(row);
                      }}
                    >
                      <FavButtonHolder>
                        <FavButton
                          active={favList.includes(row.id)}
                          handleClick={(e) => {
                            e.stopPropagation();
                            if (!favList.includes(row.id)) {
                              setFavGame(row.id);
                            } else {
                              removeFavGame(row.id);
                            }
                          }}
                        />
                      </FavButtonHolder>
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
                        )}-${row.abbreviation.toLowerCase()}.png`}
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
            <MarqueeContainer>This is marquee container</MarqueeContainer>
            <UserInformation>
              <UserContainer>
                {!account.token
                  ? i18n.t("wap.main.home.profile.pleaseLogin")
                  : `Hi, ${account.info.member_username}`}
              </UserContainer>
              <QuickAction>
                {quickAction.map((item, index) => {
                  return (
                    <QuickActionButton
                      key={index}
                      style={{
                        width: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                      onClick={() => {
                        AppHistory.push(item.path);
                      }}
                    >
                      <Icons
                        src={item.type}
                        style={{ width: 50, height: 50 }}
                      />
                      <div>{i18n.t(item.title)}</div>
                    </QuickActionButton>
                  );
                })}
              </QuickAction>
            </UserInformation>
            <GameWrapper>
              {checking("hot").length > 0 && (
                <ContentWrapper
                  title={i18n.t("T13.topGames")}
                  type="game"
                  icon="star"
                  favGame={favList}
                  joinGame={handleJoinGameClick}
                  setFavGame={setFavGame}
                  removeFavGame={removeFavGame}
                  games={checking("hot")}
                  seeMoreAt={() => {
                    navigateToSlot();
                  }}
                />
              )}
              {checking("recommend").length > 0 && (
                <ContentWrapper
                  title={i18n.t("T13.recommeneddGames")}
                  type="game"
                  icon="star"
                  favGame={favList}
                  joinGame={handleJoinGameClick}
                  setFavGame={setFavGame}
                  removeFavGame={removeFavGame}
                  games={checking("recommend")}
                  seeMoreAt={() => {
                    navigateToSlot();
                  }}
                />
              )}
              {checking("new").length > 0 && (
                <ContentWrapper
                  title={i18n.t("T13.newGames")}
                  type="game"
                  icon="star"
                  favGame={favList}
                  setFavGame={setFavGame}
                  removeFavGame={removeFavGame}
                  joinGame={handleJoinGameClick}
                  games={checking("new")}
                  seeMoreAt={() => {
                    navigateToSlot();
                  }}
                />
              )}
            </GameWrapper>
          </>
        )}
      </GridWrapper>
    </HomePageWrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account,
    game: state.game,
    token: state.account.token,
    general: state.general,
  };
};

export default connect(mapStateToProps, null)(Template14);
