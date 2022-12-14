import {
  Box,
  Button,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { useShowModal } from "../../context/showModalContext";
import {
  IconLiveRounded,
  IconHomeBorder,
  IconHomeRounded,
  IconLiveBorder,
  IconUserBorder,
  IconUserRounded,
} from "../Icons";
import Discover from "./components/Discover";
import SuggestedAccount from "./components/SuggestedAccount";
const LIST_MAIN = [
  {
    iconbroder: <IconHomeBorder />,
    iconrounded: <IconHomeRounded />,
    title: "For You",
    link: "/",
  },
  {
    iconbroder: <IconUserBorder />,
    iconrounded: <IconUserRounded />,
    title: "Following",
    link: "/following",
  },
  {
    iconbroder: <IconLiveBorder />,
    iconrounded: <IconLiveRounded />,
    title: "LIVE",
    link: "/live",
  },
];
const BoxSidebar = styled(Box)(({ theme }) => ({
  overflowX: "hidden",
  overflowY: "overlay",
  overscrollBehaviorY: "contain",
  perspective: "1px",
  transformStyle: "preserve-3d",
  perspectiveOrigin: "right top",
  top: "60px",
  bottom: 0,
  position: "fixed",
  zIndex: 99,
  paddingRight: "8px",
  minHeight: "100%",
  "&:hover": {
    "&::-webkit-scrollbar-thumb": {
      display: "block",
    },
  },
  "&::-webkit-scrollbar": {
    width: "6px",
    height: "1rem",
  },

  "&::-webkit-scrollbar-thumb": {
    display: "none",
    backgroundColor: "rgba(22, 24, 35, .06)",
    borderRadius: "3px",
  },

  "&::-webkit-scrollbar-track": { backgroundColor: "transparent" },
}));
const BoxMain = styled(Box)(({ theme }) => ({
  marginBottom: "8px",
  a: {
    color: "#161823",
    display: "flex",
    alignItems: "center",
    h2: {
      fontSize: "18px",
      fontWeight: 600,
      marginLeft: "8px",
    },
    "svg:first-of-type": {
      display: "block",
    },
    "svg:last-of-type": {
      display: "none",
    },
    "&.activeClassName": {
      color: "rgba(254, 44, 85, 1)",
      "svg:first-of-type": {
        display: "none",
      },
      "svg:last-of-type": {
        display: "block",
      },
    },
  },
}));

const BoxLogin = styled(Box)(({ theme }) => ({
  padding: "19px 8px 24px 8px",
  borderTop: "1px solid rgba(22, 24, 35, .12)",
  p: {
    color: "rgba(22, 24, 35, 0.5)",
    lineHeight: "22px",
  },
  button: {
    marginTop: "20px",
    padding: "6px 8px",
    fontSize: "18px",
    color: "rgba(254, 44, 85, 1)",
    height: "48px",
    borderColor: "rgba(254, 44, 85, 1)",
    "&:hover": {
      borderColor: "rgba(254, 44, 85, 1)",
      backgroundColor: "rgba(254,44,85,.06)",
    },
  },
}));

const BoxContact = styled(Box)(({ theme }) => ({
  padding: "15px 0 0 8px",
  borderTop: "1px solid rgba(22, 24, 35, .12)",
  fontSize: "12px",
  color: "rgba(22, 24, 35, .5)",
  span: {
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  div: {
    margin: "5px 0 13px",
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },
  [theme.breakpoints.down(1080)]: {
    display: "none",
  },
}));
const Sidebar = ({ type = "" }) => {
  const { showModal, setShowModal } = useShowModal();

  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const location = useLocation();
  const pathName = location.pathname;

  const theme = useTheme();
  const isBreakpointDown1080 = useMediaQuery(theme.breakpoints.down(1080));
  return (
    <Box
      sx={{
        position: "relative",
        flexShrink: 0,
        width: type === "small" ? "240px" : "356px",
        [theme.breakpoints.down(1080)]: {
          width: "72px",
          borderRight: "1px solid rgba(22, 24, 35, .12)",
        },
      }}
    >
      <BoxSidebar
        sx={{
          width: type === "small" ? "240px" : "356px",
          [theme.breakpoints.down(1080)]: {
            width: "72px",
            borderRight: "1px solid rgba(22, 24, 35, .12)",
          },
        }}
      >
        <Box sx={{ padding: "20px 0 26px 8px" }}>
          <BoxMain>
            {LIST_MAIN.map((item) => (
              <Box
                key={item.title}
                sx={{
                  padding: "8px",
                }}
              >
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive ? "activeClassName" : "main-item"
                  }
                >
                  {item.iconbroder}
                  {item.iconrounded}
                  {!isBreakpointDown1080 && <h2>{item.title}</h2>}
                </NavLink>
              </Box>
            ))}
          </BoxMain>
          {!isLoggedIn && !isBreakpointDown1080 && (
            <BoxLogin>
              <Typography>
                Log in to follow creators, like videos, and view comments.
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => setShowModal(true)}
              >
                Log in
              </Button>
            </BoxLogin>
          )}
          {pathName === "/following" && !isLoggedIn ? null : (
            <SuggestedAccount />
          )}

          <Discover type={type} />
          <BoxContact>
            <Box>
              <span>About</span>
              <span>Newsroom</span>
              <span>Contact</span>
              <span>Carrers</span>
              <span>ByteDance</span>
            </Box>
            <Box>
              <span>Tiktok for good</span>
              <span>Advertise</span>
              <span>Developers</span>
              <span>Transparency</span>
              <span>TikTok Rewards</span>
              <span>TikTok Browse</span>
              <span>TikTok Embeds</span>
            </Box>
            <Box>
              <span>Help</span>
              <span>Safety</span>
              <span>Terms</span>
              <span>Privacy</span>
              <span>Creator Portal</span>
              <span>Community Guidelines</span>
            </Box>
            <Box>
              <span>© 2022 Tiktok</span>
            </Box>
          </BoxContact>
        </Box>
      </BoxSidebar>
    </Box>
  );
};

export default Sidebar;
