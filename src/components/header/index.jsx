import { AppBar, Box, styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IconLogo } from "../Icons";
import HeaderAuth from "./components/HeaderAuth/HeaderAuth";

import Search from "./components/Search/Search";

const AppbarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "0px 1px 1px rgb(0 0 0 / 12%)",
  width: "100%",
}));
const BoxContainerStyled = styled(Box)(({ theme }) => ({
  padding: "0 24px 0 20px",
  height: "60px",
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
const BoxLogo = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  paddingTop: "4px",
}));
const Header = ({ type = "" }) => {
  return (
    <AppbarStyled color="backgroundHeader" position="fixed">
      <BoxContainerStyled className={type === "big" ? "" : "container"} sx={{}}>
        <BoxLogo>
          <Link to="/">
            <IconLogo />
          </Link>
        </BoxLogo>
        <Search />
        <HeaderAuth />
      </BoxContainerStyled>
    </AppbarStyled>
  );
};

export default Header;
