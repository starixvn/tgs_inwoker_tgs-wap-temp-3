import React from "react";

import Template11 from "./template11";
import Template13 from "./template13";

const TemplateSwitcher = ({
  template,
  gameTypeListSorting,
  homePageGameList,
  getImgPrefix,
  selectedGameType,
  convertGameTypeToText,
  handleGameTypeClick,
  handleGameClick,
  gameMenu,
  gameMenu2,
  shiftScene,
  changeShowGame,
  scrollRef,
  handleSignupClick,
  listOfGame,
  getBannerTemplate,
}) => {
  const commonprops = {
    gameTypeListSorting: gameTypeListSorting,
    homePageGameList: homePageGameList,
    getImgPrefix: getImgPrefix,
    selectedGameType: selectedGameType,
    convertGameTypeToText: convertGameTypeToText,
    handleGameTypeClick: handleGameTypeClick,
    handleGameClick: handleGameClick,
    gameMenu: gameMenu,
    gameMenu2: gameMenu2,
    shiftScene: shiftScene,
    changeShowGame: changeShowGame,
    template: template,
    scrollRef: scrollRef,
    handleSignupClick: handleSignupClick,
    listOfGame: listOfGame,
    getBannerTemplate: getBannerTemplate,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 11:
        return <Template11 {...commonprops} />;
      case 13:
        return <Template13 {...commonprops} />;
      default:
        <Template13 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

export default TemplateSwitcher;
