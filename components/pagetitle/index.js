import React from "react";
import styled from "styled-components";

const PageLabel = styled.div`
  padding: 30px;
  text-align: ${({ position }) => position};
  width: 100%;
  font-size: 30px;
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
`;

const PageTitle = ({ children, position }) => {
  return <PageLabel position={position}>{children}</PageLabel>;
};

export default PageTitle;
