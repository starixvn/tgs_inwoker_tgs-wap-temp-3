import React from "react";
import styled from "styled-components";
import config from "../../../../config/config";
import Common from "../../../../utils/Common";
import i18n from "../../../../utils/i18n";

const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: 35% 65%;
  color: #fff;
  font-size: 28px;
`;

const TheLogo = styled.div`
  display: grid;
  gap: 40px;
`;

const TheRewards = styled.div`
  overflow: auto;
  display: -webkit-inline-box;
`;

const TheRewardStuffs = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto auto auto auto auto auto auto auto auto;
  grid-template-rows: 77px ${({ total }) => {
      total &&
        total.map((data, index) => {
          return "auto ";
        });
    }};
  overflow: auto;
  justify-content: center;
  align-items: center;
`;

const Data = styled.div`
  min-width: max-content;
  text-align: center;
`;

const VipEmlemContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  min-width: 150px;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  max-height: 200px;
  ${({ selected, theme }) => {
    return (
      selected &&
      ` background: #fff;border-radius: 20px;border: solid 3px ${
        theme.wapPrimary ? theme.wapPrimary : theme.primary
      };`
    );
  }}
`;
const VipEmblem = styled.img`
  height: 125px;
`;
const VIPText = styled.div`
  font-weight: bold;
`;

const WithMinHeight = styled(Data)`
  max-height: 77px;
  background: #27273f;
  padding: 20px 40px;
`;

const WithLeftBorderRadius = styled(WithMinHeight)`
  border-radius: 40px 0 0 40px;
`;

const WithRightBorderRadius = styled(WithMinHeight)`
  border-radius: 0 40px 40px 0;
`;

const getVIPTitle = (level) => {
  if (config.features.VIP_CustomLevel_BUNNY && level < 7)
    return i18n.t("vip.bunny.level" + level);
  else return "VIP" + level;
};

const VIPTable = ({ data }) => {
  return (
    <TableWrapper>
      <TheLogo>
        <WithLeftBorderRadius>{i18n.t("vip.level")}</WithLeftBorderRadius>
        {data &&
          data.length &&
          data.map((data, index) => {
            return (
              <VipEmlemContainer>
                <VipEmblem
                  src={
                    process.env.PUBLIC_URL +
                    `/assets/images/vip/${data.level}.svg`
                  }
                />
                <VIPText>{getVIPTitle(data.level)}</VIPText>
              </VipEmlemContainer>
            );
          })}
      </TheLogo>

      <TheRewards>
        <TheRewardStuffs total={data}>
          <WithMinHeight>
            {i18n.t("vip.levelKeepAccumulateBetAmount")}
          </WithMinHeight>
          <WithMinHeight>
            {i18n.t("vip.levelKeepAccumulateDeposit")}
          </WithMinHeight>
          <WithMinHeight>
            {i18n.t("vip.levelUpAccumulateBetAmount")}
          </WithMinHeight>
          <WithMinHeight>
            {i18n.t("vip.levelUpAccumulateDeposit")}
          </WithMinHeight>
          <WithMinHeight>{i18n.t("vip.birthBenefit")}</WithMinHeight>
          <WithMinHeight>{i18n.t("vip.promotionBenefit")}</WithMinHeight>
          <WithMinHeight>{i18n.t("vip.quarterlyBenefit")}</WithMinHeight>
          <WithMinHeight>{i18n.t("vip.cardGameRebate")}</WithMinHeight>
          <WithMinHeight>{i18n.t("vip.liveDealerRebate")}</WithMinHeight>
          <WithMinHeight>{i18n.t("vip.lotteryRebate")}</WithMinHeight>
          <WithMinHeight>{i18n.t("vip.slotRebate")}</WithMinHeight>
          <WithMinHeight>{i18n.t("vip.sportsRebate")}</WithMinHeight>
          <WithRightBorderRadius>
            {i18n.t("vip.virtualSportsRebate")}
          </WithRightBorderRadius>
          {data &&
            data.length &&
            data.map((data, index) => {
              return (
                <>
                  <Data>
                    {Common.addComma(data.levelKeepAccumulateBetAmount)}
                  </Data>
                  <Data>
                    {Common.addComma(data.levelKeepAccumulateDeposit)}
                  </Data>
                  <Data>
                    {Common.addComma(data.levelUpAccumulateBetAmount)}
                  </Data>
                  <Data>{Common.addComma(data.levelUpAccumulateDeposit)}</Data>
                  <Data>{Common.addComma(data.birthBenefit)}</Data>
                  <Data>{Common.addComma(data.promotionBenefit)}</Data>
                  <Data>{Common.addComma(data.quarterlyBenefit)}</Data>
                  <Data>{Common.addComma(data.cardGameRebate)}</Data>
                  <Data>{Common.addComma(data.liveDealerRebate)}</Data>
                  <Data>{Common.addComma(data.lotteryRebate)}</Data>
                  <Data>{Common.addComma(data.slotRebate)}</Data>
                  <Data>{Common.addComma(data.sportsRebate)}</Data>
                  <Data>{Common.addComma(data.virtualSportsRebate)}</Data>
                </>
              );
            })}
        </TheRewardStuffs>
      </TheRewards>
    </TableWrapper>
  );
};

export default VIPTable;
