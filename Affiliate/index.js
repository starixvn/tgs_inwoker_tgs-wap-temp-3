import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";
import Header from "../../Wap/Share/Header";
import { withStyles } from "@material-ui/core/styles";
import Loading from "../../Wap/Share/Loading";
import i18n from "../../../utils/i18n";
import QRCode from "react-qr-code";
import { utility } from "../../../utils/utility";
import PageTitle from "../components/pagetitle";
import Select from "../components/select";
import { generalAction } from "../../../api-services/actions/generalAction";

const QRCodeContainer = styled.div`
  padding: 20px;
  margin: 50px auto;
  display: table;
  background-color: #fff;
`;
const CustomText = styled.div`
  width: 700px;
  font-size: 28px;
  box-shadow: 0 2px 6px 0 rgba(58, 58, 58, 0.2);
  background-color: #27273f;
  border-radius: 50px;
  padding: 0 20px 0 40px;
  margin: 20px auto;

  display: grid;
  align-items: center;
  grid-template-columns: 30% auto;
`;
const CustomLabel = styled.div`
  float: left;
  color: #fff;
`;
const CustomInput = styled.input`
  color: #fff;
  background: transparent;
  font-size: 28px;
  margin: 25px 0 25px 10px;
  font-weight: 500;
  border: 0;

  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
  }
  &:disabled {
    opacity: 1;
  }
`;
const Button = styled.div`
  height: 60px;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background: #dc141e;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
`;

const Table = styled.table`
  width: 700px;
  margin: 0 auto;
  border-collapse: collapse;
  border-spacing: 0;
  background: #27273f;
  border-radius: 30px;

  font-size: 24px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  thead {
    tr {
      th {
        padding: 20px 0;
        border-radius: 30px;
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 20px 0;
      }
    }
  }
`;

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    fontSize: 30,
  },
}))(Tooltip);
class Affiliate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      copyTooltips: false,
      rebates: [],
      rebateType: 1,
    };
  }

  componentDidMount() {
    if (this.state.rebates.length === 0) {
      this.props.getBrandAllAgent().then((res) => {
        if (res.IsSuccess) {
          this.setState({
            ...this.state,
            rebates: res.data,
          });
        }
      });
    }
  }

  handleBackClick = () => {
    this.props.appHistory.goBack();
  };
  handleCopyLink = (link) => {
    this.setState({ ...this.state, copyTooltips: true });
    utility.copy(link);
    setTimeout(() => {
      this.setState({ ...this.state, copyTooltips: false });
    }, 3000);
  };
  handleClickAway = () => {};

  render() {
    var affiliateLink = `https://${window.location.hostname}/${i18n.language}/p/${this.props.account.info.playercode}?do=register`;
    const types = [
      { value: 1, title: "sport" },
      { value: 2, title: "virtualsports" },
      { value: 5, title: "live" },
      { value: 7, title: "chess" },
      { value: 13, title: "lottery" },
      { value: 15, title: "electron" },
    ];
    return (
      <React.Fragment>
        <Header
          token={null}
          balance={0}
          background={true}
          onBackClick={this.handleBackClick}
          title={i18n.t("affiliate.title")}
        ></Header>

        <div style={{ paddingTop: 90 }}>
          <PageTitle>{i18n.t("affiliate.qrCode")}</PageTitle>
          <QRCodeContainer>
            <QRCode value={affiliateLink}></QRCode>
          </QRCodeContainer>
          <CustomText>
            <CustomLabel>{i18n.t("affiliate.promoId")}</CustomLabel>
            <CustomInput
              type={"text"}
              value={this.props.account.info.playercode}
              readOnly={true}
            ></CustomInput>
          </CustomText>
          <CustomText>
            <CustomLabel>{i18n.t("affiliate.promoLink")}</CustomLabel>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <CustomInput
                type={"text"}
                value={affiliateLink}
                readOnly={true}
              ></CustomInput>
              <LightTooltip
                open={this.state.copyTooltips}
                title={i18n.t("affiliate.copied")}
                placement="top"
              >
                <Button
                  onClick={() => {
                    this.handleCopyLink(affiliateLink);
                  }}
                >
                  {i18n.t("common.copy")}
                </Button>
              </LightTooltip>
            </div>
          </CustomText>
          <Select title={i18n.t("rebateRate.title")}>
            {types.map((item, index) => {
              return (
                <option key={index} value={item.value}>
                  {i18n.t(`common.${item.title}`)}
                </option>
              );
            })}
          </Select>{" "}
          <Table>
            <thead>
              <tr>
                <th>{i18n.t("rebateRate.players")}</th>
                <th>{i18n.t("rebateRate.turnover")}</th>{" "}
                <th>{i18n.t("rebateRate.rebates")} (%)</th>
              </tr>
            </thead>
            <tbody>
              {this.state.rebates
                .filter((item) => {
                  if (this.state.rebateType === 0) {
                    return true;
                  } else {
                    return (
                      item.allagentgametype.toString() ===
                      this.state.rebateType.toString()
                    );
                  }
                })
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.activenumber}</td>
                      <td>{item.turnover}</td>
                      <td>{item.rebatepercentage}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
        <Loading show={this.state.loading}></Loading>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    getBrandAllAgent: () => dispatch(generalAction.getBrandAllAgent()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Affiliate);
