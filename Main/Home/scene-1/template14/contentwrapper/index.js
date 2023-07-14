import React from "react";
import styled from "styled-components";
import config from "../../../../../../../config/config";
import Common from "../../../../../../../utils/Common";
import i18n from "../../../../../../../utils/i18n";
import Button from "../../../../../components/button";
import FavButton from "../favbutton";

const ContentWrapperx = styled.div`
  border-radius: 50px;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding: 20px 10px 20px 10px;

  background: ${({ darktone }) => {
    return darktone && darktone;
  }};

  margin-bottom: ${({ darktone }) => {
    return darktone ? "20px" : "0px";
  }};
`;

const TitleSection = styled.div`
  display: flex;
  font-size: 40px;
  gap: 10px;
  align-items: center;
  padding: 10px 0 30px 0;
  color: ${({ theme }) => theme.primary};
  text-transform: uppercase;
`;

const IconHolder = styled.img`
  height: 40px;
  width: 40px;
`;

const ContentHolder = styled.div`
  display: grid;
  grid-template-columns: ${({ content }) => {
    return content ? "" : "1fr 1fr";
  }};
  gap: ${({ noGap }) => {
    return noGap ? "0px" : "20px";
  }};

  padding: ${({ type }) => {
    return type === "text" ? "0px 20px 40px 20px" : "0 0 20px 0 ";
  }};
  font-size: 24px;
`;

const TheGamesOrContent = styled.div`
  background: url(${({ background }) => {
      return background;
    }})
    no-repeat center;
  background-size: 100%;
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
  background: rgba(27, 29, 48, 0.75);
  :active {
    opacity: 1;
  }

  /** make opacity animation**/
  transition: opacity 0.5s;
`;

const JoinButton = styled.div`
  width: 150px;
  height: 60px;
  background: ${({ theme }) => theme.primary};
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

const FavUnfav = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;

const ContentWrapper = React.memo(
  ({
    title,
    children,
    icon,
    games,
    joinGame,
    seeMoreAt,
    darktone,
    noGap,
    type,
    style,
    favGame,
    setFavGame,
    removeFavGame,
  }) => {
    return (
      <ContentWrapperx darktone={darktone}>
        <TitleSection>
          <IconHolder
            src={
              process.env.PUBLIC_URL +
              "/assets/images/wapp/resource/T14/homepage/wrapper-icon/" +
              icon +
              ".svg"
            }
          />
          <div>{title}</div>
        </TitleSection>
        <ContentHolder
          content={children}
          noGap={noGap}
          type={type}
          style={style}
        >
          {children ? (
            children
          ) : (
            <>
              {games.length >= 0 &&
                games.slice(0, 6).map((row, index) => {
                  return (
                    <TheGamesOrContent
                      key={index}
                      background={`${
                        config.sourceUrl
                      }${row.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                        row.code
                      }.jpg`}
                      onClick={() => {
                        joinGame(row);
                      }}
                    >
                      <FavUnfav>
                        <FavButton
                          active={favGame.includes(row.id)}
                          handleClick={(e) => {
                            e.stopPropagation();
                            if (!favGame.includes(row.id)) {
                              setFavGame(row.id);
                            } else {
                              removeFavGame(row.id);
                            }
                          }}
                        />
                      </FavUnfav>
                      <TheContent />
                    </TheGamesOrContent>
                  );
                })}
            </>
          )}
        </ContentHolder>
        {seeMoreAt && (
          <Button
            style={{ width: "100%" }}
            label={i18n.t("common.more")}
            onClick={seeMoreAt}
          />
        )}
      </ContentWrapperx>
    );
  }
);

export default ContentWrapper;
