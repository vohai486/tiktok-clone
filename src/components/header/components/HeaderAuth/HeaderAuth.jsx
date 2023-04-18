import {
  Box,
  IconButton,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

import { IconAdd, IconMessage, IconNotice } from "../../../Icons";
import DropdownMenu from "./DropdownMenu";

import { useSelector } from "react-redux";
import { useShowModal } from "../../../../context/showModalContext";

const BoxAuthStyled = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  fontWeight: 500,
  color: "rgb(22, 24, 35,1)",
  ".upload": {
    // [theme.breakpoints.down(480)]: { display: "none" },
    cursor: "pointer",
    color: "rgb(22, 24, 35)",
    minWidth: "110px",
    textDecoration: "none",
    lineHeight: "22px",
    div: {
      height: "36px",
      border: "1px solid rgba(22, 24, 35, 0.12)",
      padding: "0 16px",
      display: "flex",
      backgroundColor: "#ffffff",
      alignItems: "center",
      svg: {
        marginRight: "8px",
      },
      span: {},
      "&:hover": {
        backgroundColor: "rgba(22, 24, 35, 0.03)",
      },
    },
  },
  ".header-login": {
    fontWeight: 600,
    padding: "8px 16px",
    background: "rgba(254, 44, 85, 1)",
    borderRadius: "4px",
    color: "rgba(255, 255, 255, 1)",
    minHeight: "36px",
    minWidth: "100px",
    fontSize: "16px",
    "&:hover": {
      background:
        "linear-gradient(0deg,rgba(0,0,0,.06),rgba(0,0,0,.06)),#fe2c55",
    },
    "&:active": {
      background:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.12)),#FE2C55",
    },
  },
}));

const HeaderAuth = () => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const { showModal, setShowModal } = useShowModal();
  const theme = useTheme();
  const isBreakpointDown480 = useMediaQuery(theme.breakpoints.down(480));
  return (
    <BoxAuthStyled>
      {!isBreakpointDown480 && (
        <Box
          className="upload"
          onClick={() => {
            if (!isLoggedIn) {
              setShowModal(true);
            } else {
              navigate("/upload");
            }
          }}
        >
          <Box>
            <IconAdd />
            <Box component="span">Upload</Box>
          </Box>
        </Box>
      )}
      {isBreakpointDown480 && (
        <IconButton
          onClick={() => {
            if (!isLoggedIn) {
              setShowModal(true);
            } else {
              navigate("/upload");
            }
          }}
        >
          <IconAdd />
        </IconButton>
      )}
      {!isLoggedIn ? (
        <button className="header-login" onClick={() => setShowModal(true)}>
          Log in
        </button>
      ) : (
        <>
          <IconNotice></IconNotice>
        </>
      )}
      <DropdownMenu isLoggedIn={isLoggedIn} loggedInUser={loggedInUser} />
    </BoxAuthStyled>
  );
};

export default HeaderAuth;
