import { Box, styled } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/sidebar";

const BoxStyled = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "60px",
});
const LayoutAppFull = ({ children }) => {
  return (
    <>
      <Header type="big" />
      <BoxStyled>
        <Sidebar type="small"></Sidebar>
        {children}
      </BoxStyled>
    </>
  );
};

export default LayoutAppFull;
