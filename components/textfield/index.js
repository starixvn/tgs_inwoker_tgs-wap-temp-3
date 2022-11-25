import React from "react";
import styled from "styled-components";

const CustomInputfield = styled.input`
  font-size: 28px;
  min-height: 105px;
  border: none;
  color: #fff;
  border-radius: 50px;
  border: solid 1px #fff;
  padding: 0px 50px;
  background: none;
  width: 100%;

  ::placeholder {
    font-size: 28px;
    opacity: 0.76;
  }
`;

const SelectContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
`;

const CustomInput = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px 20px 0 20px;
  margin: 20px auto;
`;

const DropdownSection = styled.div`
  height: 100%;
  width: 125px;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 0 50px 50px 0;
  z-index: 0;

  ${({ variant }) => {
    switch (variant) {
      case "bordered":
        return "border-left: solid 2px #fff;";
      case "secondary":
        return "background: #fff;";
      default:
        return "";
    }
  }};
`;

const CustomLabel = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-left: 3px;
  padding-bottom: 30px;
  color: ${({ black, theme }) => {
    return black
      ? "#000"
      : theme.wapSecondary
      ? theme.wapSecondary
      : theme.secondary;
  }};
  float: left;
`;

const CustomContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Textfield = ({
  title,
  value,
  onChange,
  custom,
  variant,
  placeholder,
  onClick,
}) => {
  return (
    <CustomInput>
      <CustomLabel>{title}</CustomLabel>
      <SelectContainer onClick={onClick}>
        <CustomInputfield
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <DropdownSection variant={variant} />
      </SelectContainer>
      {custom && <CustomContainer>{custom}</CustomContainer>}
    </CustomInput>
  );
};

export default Textfield;
