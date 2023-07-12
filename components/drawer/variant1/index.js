import React from "react";
import styled from "styled-components";
import i18n from "../../../../../utils/i18n";

const Overlay = styled.div`
  position: fixed;
  z-index: 99999999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: ${({ show }) => {
    return show ? "flex" : "none";
  }};
  flex-direction: column;
  font-size: 30px;
  transition: all 0.3s ease-in-out;
`;

const Drawer = styled.div`
  position: absolute;
  background: #181c42;
  right: 0;
  top: 0;
  width: 60vw;
  height: 100vh;
`;

const UserSection = styled.div`
  background: #242958;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  background: #fff;
  border-radius: 50px;
  right: 20px;
  top: 20px;
  height: 50px;
  width: 50px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #000;
`;

const Variant1 = ({ open, handleClose, account }) => {
  return (
    <Overlay show={open} onClick={handleClose}>
      <Drawer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <UserSection>
          {account.token ? (
            <>
              <div>123</div> <div>123</div>
            </>
          ) : (
            <div>{i18n.t("wap.main.home.profile.pleaseLogin")}</div>
          )}
          <CloseButton onClick={handleClose}>✖</CloseButton>
        </UserSection>
      </Drawer>
    </Overlay>
  );
};

export default Variant1;
