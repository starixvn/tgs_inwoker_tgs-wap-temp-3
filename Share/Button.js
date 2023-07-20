import React, { Component } from "react";
import styled from "styled-components";
<<<<<<< HEAD
=======
<<<<<<< HEAD
import { wapBorderRadius } from "../../../config/settings";
=======
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82

>>>>>>> f1b0523a14811655fde1878a8cb58ebf4a615d14
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
<<<<<<< HEAD
  padding: 0 20px;
=======
<<<<<<< HEAD
  padding: 0 20px;
=======
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82
>>>>>>> f1b0523a14811655fde1878a8cb58ebf4a615d14
`;
const Content = styled.div`
  ${(props) =>
    props.disabled
      ? `background-color: #A5A5A5;`
      : `background-color: ${props.theme.primary};
         filter: drop-shadow(0 0 5px ${props.theme.primary})
      drop-shadow(0 0 5px ${props.theme.primary}) contrast(1)
      brightness(1);`}
  height: 105px;
<<<<<<< HEAD
  border-radius: ${({ theme }) => {
    return theme.wapBorderRadius ? theme.wapBorderRadius : "50px";
  }};
  width: fit-content;
  font-size: 34px;
  min-width: 100%;
=======
<<<<<<< HEAD
  border-radius: ${wapBorderRadius ? wapBorderRadius : "50px"}
  width: fit-content;
  font-size: 34px;
  min-width: 100%;
=======
  border-radius: 50px;
  width: fit-content;
  font-size: 34px;
  min-width: fit-content;
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82
>>>>>>> f1b0523a14811655fde1878a8cb58ebf4a615d14
  color: ${({ theme }) =>
    theme.customButtonText ? theme.customButtonText : "#ffffff"};
  text-align: center;

  display: flex;
  padding: 0 50px;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 0 20px;
  margin: 20px auto;
  flex: auto;
  padding: 10px 0;
  min-width: fit-content;
  align-items: center;
  justify-content: center;
`;
class CustomButton extends Component {
  render() {
    return (
      <ContentWrapper>
        <ButtonWrapper>
          <Content
            onClick={this.props.disabled === true ? null : this.props.onClick}
            disabled={this.props.disabled ? this.props.disabled : false}
          >
            {this.props.label}
          </Content>
        </ButtonWrapper>
      </ContentWrapper>
    );
  }
}
export default CustomButton;
