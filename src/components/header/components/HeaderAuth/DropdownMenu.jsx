import {
  Avatar,
  Box,
  IconButton,
  MenuItem,
  MenuList,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { renderAvatarImage } from "../../../../constants/defaultUrlImage";

import {
  IconBack,
  IconCoins,
  IconDarkMode,
  IconFeedback,
  IconKeyboard,
  IconLanguague,
  IconLiveBorder,
  IconMenu,
  IconSetting,
  IconTriangle,
  IconUserLogin,
} from "../../../Icons";

const LIST_MENU = [
  {
    icon: <IconLanguague />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          type: "language",
          code: "en",
          title: "English",
        },
        {
          type: "language",
          code: "vi",
          title: "Tiếng Việt",
        },
      ],
    },
  },
  {
    icon: <IconFeedback />,
    title: "Feedback and help",
    pathName: "feedback",
  },
  {
    icon: <IconKeyboard />,
    title: "Keyboard shortcuts",
  },
  {
    icon: <IconDarkMode />,
    title: "Dark mode",
  },
];
const LIST_MENU_LOGIN = [
  {
    icon: <IconUserLogin />,
    title: "View profile",
    profile: "profile",
  },
  {
    icon: <IconCoins />,
    title: "Get Coins",
  },
  {
    icon: <IconLiveBorder />,
    title: "LIVE Studio",
  },
  {
    icon: <IconSetting />,
    title: "Settings",
  },
  {
    icon: <IconLanguague />,
    title: "English",
    children: {
      title: "Language",
      data: [
        {
          type: "language",
          code: "en",
          title: "English",
        },
        {
          type: "language",
          code: "vi",
          title: "Tiếng Việt",
        },
      ],
    },
  },
  {
    icon: <IconFeedback />,
    title: "Feedback and help",
  },
  {
    icon: <IconKeyboard />,
    title: "Keyboard shortcuts",
  },
  {
    icon: <IconDarkMode />,
    title: "Dark mode",
  },
];
const BoxStyled = styled(Box)({
  padding: "0 4px",
  position: "relative",
  display: "flex",
  alignItems: "center",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "13px ",
    left: "-5px ",
    height: "35px ",
    backgroundColor: "transparent",
    width: "42px ",
  },
  ".popper": {
    opacity: 1,
    borderRadius: "8px",
    minWidth: "223px",
    position: "absolute",
    boxShadow: "rgb(0 0 0 / 12%) 0px 4px 16px",
    background: "rgb(255, 255, 255)",
    top: "calc(100% + 12px)",
    transition: "opacity 300ms ease 0s",
    right: "-13px",
    ".popper-header": {
      display: "flex",
      height: "50px",
      alignItems: "center",
      marginLeft: "28px",
      gap: "20px",
    },
    ".triangle": {
      position: "absolute",
      top: "-8px",
      height: "8px",
      width: "24px",
      display: "block",
      right: "15px",
    },
    ul: {
      color: "rgba(22, 24, 35, 1)",
      fontSize: "16px",
      padding: "8px 0",
      li: {
        fontWeight: 600,
        padding: "9px 8px 9px 16px",
        div: {
          display: "flex",
          alignItems: "center",
          svg: {
            marginRight: "8px",
          },
        },
        "&.active": {
          background: "rgba(22, 24, 35, 0.03)",
        },
        "&:hover": {
          background: "rgba(22, 24, 35, 0.03)",
        },
      },
    },
  },
});
const DropdownMenu = ({ isLoggedIn, loggedInUser }) => {
  const [isShow, setIsShow] = useState(false);
  const [history, setHistory] = useState([{ data: LIST_MENU }]);
  const current = history[history.length - 1];
  const [historyLogin, setHistoryLogin] = useState([{ data: LIST_MENU_LOGIN }]);
  const currentLogin = historyLogin[historyLogin.length - 1];
  const navigate = useNavigate();
  const onClickValue = (value) => console.log(value);
  const onClickSetHistory = (item) => {
    setHistory((history) => [...history, item.children]);
  };
  const onClickSetHistoryLogin = (item) => {
    setHistoryLogin((history) => [...historyLogin, item.children]);
  };
  return (
    <BoxStyled
      className="header-menu"
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setIsShow(false);
        }, 500)
      }
      onClick={() => setIsShow(true)}
    >
      <IconButton sx={{ p: 0 }}>
        {isLoggedIn ? (
          <Avatar
            sx={{ width: "32px", height: "32px" }}
            src={renderAvatarImage(loggedInUser.avatar)}
          />
        ) : (
          <IconMenu />
        )}
      </IconButton>
      {isShow ? (
        <Box onMouseEnter={() => setIsShow(true)} className="popper">
          {!isLoggedIn && (
            <>
              <IconTriangle />
              {history.length > 1 && (
                <Box
                  className="popper-header"
                  onClick={() => {
                    setHistory((history) =>
                      history.slice(0, history.length - 1)
                    );
                  }}
                >
                  <IconBack />
                  <Typography sx={{ fontWeight: 600 }}>Language</Typography>
                </Box>
              )}
              <MenuList>
                {current.data.length > 0 &&
                  current.data.map((item) => (
                    <MenuItem
                      key={item.title}
                      onClick={() => {
                        if (!!item.children) onClickSetHistory(item);
                        if (!!item.type) onClickValue(item);
                        if (!!item.pathName) navigate(`/${item.pathName}`);
                      }}
                    >
                      <Box
                        sx={{
                          svg: {
                            width: "20px",
                            height: "20px",
                          },
                        }}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Box>
                    </MenuItem>
                  ))}
              </MenuList>
            </>
          )}
          {isLoggedIn && (
            <>
              <IconTriangle />
              {historyLogin.length > 1 && (
                <Box
                  className="popper-header"
                  onClick={() => {
                    setHistoryLogin((history) =>
                      history.slice(0, history.length - 1)
                    );
                  }}
                >
                  <IconBack />
                  <Typography sx={{ fontWeight: 600 }}>Language</Typography>
                </Box>
              )}
              <MenuList>
                {currentLogin.data.length > 0 &&
                  currentLogin.data.map((item) => (
                    <MenuItem
                      key={item.title}
                      onClick={() => {
                        if (!!item.children) onClickSetHistoryLogin(item);
                        if (!!item.type) onClickValue(item);
                        if (!!item.pathName) navigate(`/${item.pathName}`);
                        if (!!item.profile)
                          navigate(`/@${loggedInUser.nickname}`);
                      }}
                    >
                      <Box
                        sx={{
                          svg: {
                            width: "20px",
                            height: "20px",
                          },
                        }}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Box>
                    </MenuItem>
                  ))}
              </MenuList>
            </>
          )}
        </Box>
      ) : null}
    </BoxStyled>
  );
};

export default DropdownMenu;
