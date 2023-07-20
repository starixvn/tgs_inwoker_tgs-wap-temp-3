import React from "react";

import Template11 from "./template11";
import Template13 from "./template13";
<<<<<<< HEAD
import Template14 from "./template14";
=======
<<<<<<< HEAD
import Template14 from "./template14";
=======
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82
>>>>>>> f1b0523a14811655fde1878a8cb58ebf4a615d14

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
  token,
  alert,
}) => {
  const commonprops = {
    gameTypeListSorting,
    homePageGameList: homePageGameList,
    getImgPrefix,
    selectedGameType,
    convertGameTypeToText,
    handleGameTypeClick,
    handleGameClick,
    gameMenu,
    gameMenu2,
    shiftScene,
    changeShowGame,
    template,
    scrollRef: scrollRef,
    handleSignupClick,
    listOfGame,
    getBannerTemplate: getBannerTemplate,
    token,
    alert,
  };

  const switchTemplate = (template) => {
    switch (template) {
      case 11:
        return <Template11 {...commonprops} />;
      case 13:
        return <Template13 {...commonprops} />;
<<<<<<< HEAD
      case 14:
        return <Template14 {...commonprops} />;
=======
<<<<<<< HEAD
      case 14:
        return <Template14 {...commonprops} />;
=======
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82
>>>>>>> f1b0523a14811655fde1878a8cb58ebf4a615d14
      default:
        <Template13 {...commonprops} />;
    }
  };
  return switchTemplate(template);
};

export default TemplateSwitcher;
