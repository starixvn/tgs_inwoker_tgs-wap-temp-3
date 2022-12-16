import React from "react";
import styled from "styled-components";
import i18n from "../../../../../utils/i18n";
import PageTitle from "../../../components/pagetitle";

const ListItem = styled.div`
  background: url(${(props) => props.src}) no-repeat right top;

  position: relative;
  border-radius: 40px;

  height: 300px;
  width: 100%;

  background-size: 100% 100%;
  border-radius: 40px;
`;
const LayoutOne = (props) => {
  return (
    <div>
      <PageTitle>{i18n.t("common.promotion")}</PageTitle>
      {props.promotionList.items
        .sort((a, b) => {
          return a.order - b.order;
        })
        .map((row, index) => {
          const checkIfLocaleExist = row.localization[i18n.language];
          if (row.localization !== null) {
            return (
              <ListItem
                key={index}
                order={row.order}
                src={
                  checkIfLocaleExist
                    ? checkIfLocaleExist.mobileBanner
                    : row.mobileBanner
                }
                onClick={() => props.handlePromoClick(row.id)}
              ></ListItem>
            );
          } else {
            return (
              <ListItem
                key={index}
                src={row.mobileBanner}
                onClick={() => props.handlePromoClick(row.id)}
              ></ListItem>
            );
          }
        })}
    </div>
  );
};

export default LayoutOne;
