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

const GameLister = styled.div`
  overflow: auto;
  padding-top: 130px;
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

const SectionWrapper = styled.div`
  position: relative;
  color: #fff;
`;

const JackpotWrapper = styled(SectionWrapper)`
  transform: scale(1.1);
`;
const JackpotGif = styled.div`
  height: 355px;
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/resource/T13/homepage/jackpot.svg`})
    no-repeat center / contain;
`;
const JackpotContainer = styled.div`
  background: url(${process.env.PUBLIC_URL +
    `/assets/images/wapp/resource/T13/homepage/jackpotcontainer.svg`})
    no-repeat center / contain;
  margin: 0 auto;
  height: 180px;
  width: 610px;
  padding-top: 65px;
  text-align: center;
  font-size: 45px;
  line-height: 45px;
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
    { title: "common.deposit", type: "deposit" },
    { title: "common.withdrawal", type: "withdrawal" },
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

  const Jackpot = () => {
    return (
      <JackpotWrapper>
        <JackpotGif></JackpotGif>
        <JackpotContainer>
          {config.currency} {Common.formatNumberWithCommas(jackpotAmount)}
        </JackpotContainer>
      </JackpotWrapper>
    );
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
              >
                <Icons src={item.type} style={{ width: 50, height: 50 }} />
                <div>{i18n.t(item.title)}</div>
              </QuickActionButton>
            );
          })}
        </QuickAction>
      </UserInformation>{" "}
      {checking("hot").length > 0 && (
        <ContentWrapper
          title={i18n.t("T13.topGames")}
          type="game"
          icon="games"
          joinGame={handleJoinGameClick}
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
          icon="games"
          joinGame={handleJoinGameClick}
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
          icon="games"
          joinGame={handleJoinGameClick}
          games={checking("new")}
          seeMoreAt={() => {
            navigateToSlot();
          }}
        />
      )}
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
