import React from "react";
import styled from "styled-components";

const PageLabel = styled.div`
  margin: 30px auto;
  display: table;
  font-size: 30px;
  color: ${({ theme }) =>
    theme.wapSecondary ? theme.wapSecondary : theme.secondary};
`;

const PageTitle = ({ children }) => {
  return <PageLabel>{children}</PageLabel>;
};

export default PageTitle;
