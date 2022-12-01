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

const Button = styled.div`
  font-size: 23px;
  position: absolute;
  text-align: center;
  color: #fff;
  padding: 8px 20px;
  margin-top: 24px;
  top: 10%;
  right: 25px;
  height: 47px;
  border-radius: 50px;
  background: ${({ theme }) => theme.primary};
`;

const TextfieldWithButton = ({
  title,
  value,
  onChange,
  buttonlabel,
  placeholder,
  onClick,
  maxLength,
}) => {
  return (
    <CustomInput>
      <CustomLabel>{title}</CustomLabel>
      <SelectContainer>
        <CustomInputfield
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
        />
        <Button onClick={onClick}>{buttonlabel}</Button>
      </SelectContainer>
    </CustomInput>
  );
};

export default TextfieldWithButton;
