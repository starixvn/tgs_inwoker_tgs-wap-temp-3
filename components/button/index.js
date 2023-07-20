import React from "react";
import styled from "styled-components";
<<<<<<< HEAD
import { wapBorderRadius } from "../../../../config/settings";
=======
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82

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
=======
  border-radius: 50px;

>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82
  width: 100%;
  font-size: 34px;
  color: ${({ theme }) =>
    theme.customButtonText ? theme.customButtonText : "#ffffff"};
  text-align: center;
<<<<<<< HEAD
  border-radius: 20px;
=======

>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82
  display: flex;
  padding: 0 30px;
  align-items: center;
  justify-content: center;
  min-width: ${({ minWidth }) => {
    return minWidth ? minWidth : " fit-content";
  }};
`;

const SelectContainer = styled.div`
  position: relative;
  display: flex;
<<<<<<< HEAD
  width: 100%;
  padding: ${({ withSmallPadding }) => {
    return withSmallPadding ? "5px" : "";
  }};
=======
  padding: 10px;
  width: 100%;
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82
`;

const CustomInput = styled.div`
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
  border-radius: ${wapBorderRadius ? wapBorderRadius : "50px"};
  padding: 0 20px;

  flex: auto;
  width: 100%;
=======
  border-radius: 20px;

  margin: 10px auto;
  flex: auto;
  width: fit-content;
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82

  align-items: center;
  justify-content: center;
`;

const Button = (props) => {
  return (
    <CustomInput style={props.style}>
<<<<<<< HEAD
      <SelectContainer withSmallPadding={props.withSmallPadding}>
=======
      <SelectContainer>
>>>>>>> a363aa78807aab964cfa05cecabfa9677caecc82
        <Content
          minWidth={props.minWidth}
          onClick={props.disabled === true ? null : props.onClick}
          disabled={props.disabled ? props.disabled : false}
        >
          {props.label}
        </Content>
      </SelectContainer>
    </CustomInput>
  );
};

export default Button;
