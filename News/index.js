import React from "react";
import { AppHistory } from "../../../history/History";
import i18n from "../../../utils/i18n";
import Header from "../Share/Header";

const News = () => {
  const goBack = () => {
    AppHistory.goBack();
  };
  return (
    <div>
      <Header
        background={true}
        onBackClick={goBack}
        title={i18n.t("T2.marquee")}
      ></Header>
      <div>123</div>
    </div>
  );
};

export default News;
