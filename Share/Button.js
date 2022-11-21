import React, { Component } from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Content = styled.div`
  ${(props) =>
    props.disabled
      ? `background-color: #A5A5A5;`
      : `background-color: ${props.theme.primary};
         filter: drop-shadow(0 0 5px ${props.theme.primary})
      drop-shadow(0 0 5px ${props.theme.primary}) contrast(1)
      brightness(1);`}
  height: 93px;
  border-radius: 50px;
  width: fit-content;
  font-size: 34px;

  color: ${({ theme }) =>
    theme.customButtonText ? theme.customButtonText : "#ffffff"};
  text-align: center;
  min-width: 400px;
  display: flex;
  padding: 0 50px;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  margin: 20px;
  padding: 20px;
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
