import { Box, styled } from "@mui/material";
import React from "react";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const BoxStyled = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  marginTop: "60px",
});
const LayoutAppSmall = ({ children }) => {
  return (
    <>
      <Header />
      <BoxStyled className="container">
        <Sidebar></Sidebar>
        {children}
      </BoxStyled>
    </>
  );
};

export default LayoutAppSmall;
