import { Close, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  styled,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useState } from "react";

import Login from "../../features/auth/components/Login";
import Register from "../../features/auth/components/Register";
import {
  IconApple,
  IconFacebook,
  IconGoogle,
  IconInstagram,
  IconKakao,
  IconLine,
  IconQR,
  IconTwitter,
  IconUserLogin,
} from "../Icons";
const ModalStyled = styled(DialogContent)(({ theme }) => ({
  width: "483px",
  [theme.breakpoints.down(570)]: {
    width: "400px",
  },
  [theme.breakpoints.down(500)]: {
    width: "350px",
  },
  padding: 0,
  paddingTop: "48px",
  fontSize: "15px",
  position: "relative",
  svg: {
    fontSize: "20px",
  },
  ".auth-content": {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "0rem 2rem",
    [theme.breakpoints.down(500)]: {
      padding: "0rem 1rem",
    },
    width: "100%",
    height: "581px",
    margin: "auto",
    overflowY: "overlay",
    "::-webkit-scrollbar": {
      display: "none",
    },
    h3: {
      margin: "16px 0",
      fontSize: "32px",
      fontWeight: "bold",
      textAlign: "center",
    },
  },
  ".auth-footer": {
    height: "64px",
    borderTop: "1px solid rgba(22, 24, 35, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const MODE = {
  LOGIN: "login",
  REGISTER: "register",
};
const LIST_OPTION_LOGIN = [
  {
    icon: <IconQR />,
    title: "Use QR code",
  },
  {
    icon: <IconUserLogin />,
    title: "Use phone / email / username",
    onClick: () => {},
  },
  {
    icon: <IconFacebook />,
    title: "Continue with Facebook",
  },
  {
    icon: <IconGoogle />,
    title: "Continue with Google",
  },
  {
    icon: <IconTwitter />,
    title: "Continue with Twitter",
  },
  {
    icon: <IconLine />,
    title: "Continue with LINE",
  },
  {
    icon: <IconKakao />,
    title: "Continue with KakaoTalk",
  },
  {
    icon: <IconApple />,
    title: "Continue with Apple",
  },
  {
    icon: <IconInstagram />,
    title: "Continue with Instagram",
  },
];
const LIST_OPTION_SIGNUP = [
  {
    icon: <IconUserLogin />,
    title: "Use phone / email / username",
    onClick: () => {},
  },
  {
    icon: <IconFacebook />,
    title: "Continue with Facebook",
  },
  {
    icon: <IconGoogle />,
    title: "Continue with Google",
  },
  {
    icon: <IconTwitter />,
    title: "Continue with Twitter",
  },
  {
    icon: <IconLine />,
    title: "Continue with LINE",
  },
  {
    icon: <IconKakao />,
    title: "Continue with KakaoTalk",
  },
];
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom timeout={500} ref={ref} {...props} />;
});
const ModalLogin = ({ open, setOpen }) => {
  const [mode, setMode] = useState({
    status: MODE.LOGIN,
    data: LIST_OPTION_LOGIN,
    form: false,
  });
  const handleRegisterToLogin = () => {
    setMode((mode) => ({
      ...mode,
      status: MODE.LOGIN,
      data: LIST_OPTION_LOGIN,
      form: true,
    }));
  };
  const handleClose = () => {
    setOpen(false);
    setMode({
      status: MODE.LOGIN,
      data: LIST_OPTION_LOGIN,
      form: false,
    });
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      disableEscapeKeyDown={true}
      aria-describedby="alert-dialog-slide-description"
      sx={{
        ".MuiPaper-root": {
          margin: 0,
        },
      }}
    >
      <ModalStyled>
        <Box className="auth-content">
          <Box sx={{ flex: 1 }}>
            <IconButton
              size="large"
              sx={{
                position: "absolute",
                right: "2%",
                top: "2%",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              }}
              onClick={handleClose}
            >
              <Close sx={{ width: "25px", height: "25px" }} />
            </IconButton>

            {mode.status === MODE.LOGIN ? (
              <Typography component={"h3"}>
                Log in {!mode.form && " to TikTok"}
              </Typography>
            ) : (
              <Typography component={"h3"}>
                Sign up {!mode.form && " for Tiktok"}
              </Typography>
            )}
            {mode.form &&
              (mode.status === MODE.LOGIN ? (
                <Login handleClose={handleClose}></Login>
              ) : (
                <Register
                  setMode={handleRegisterToLogin}
                  handleClose={handleClose}
                />
              ))}
            {!mode.form && (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {(mode.status === MODE.LOGIN ? mode.data : mode.data).map(
                  (item) => (
                    <Box
                      key={item.title}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0 12px",
                        height: "44px",
                        border: "1px solid rgba(22, 24, 35, 0.12)",
                        marginBottom: "16px",
                      }}
                      onClick={() => {
                        return !!item.onClick
                          ? setMode((mode) => ({ ...mode, form: true }))
                          : {};
                      }}
                    >
                      {item.icon}
                      <Box
                        sx={{
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span>{item.title}</span>
                      </Box>
                    </Box>
                  )
                )}
                {mode.status === MODE.REGISTER &&
                  !mode.form &&
                  mode.data.length <= 3 && (
                    <Box
                      sx={{ textAlign: "center" }}
                      onClick={() => {
                        setMode((mode) => ({
                          ...mode,
                          data: LIST_OPTION_SIGNUP,
                        }));
                      }}
                    >
                      <IconButton sx={{ padding: 0 }}>
                        <ExpandMore sx={{ width: "40px", height: "40px" }} />
                      </IconButton>
                    </Box>
                  )}
              </Box>
            )}
          </Box>
          {mode.status === MODE.REGISTER && (
            <Box
              sx={{
                fontSize: "12px",
                color: "rgba(22, 24, 35, 0.5)",
                textAlign: "center",
                paddingBottom: "16px",
                span: {
                  cursor: "pointer",
                  color: "rgb(22, 24, 35)",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                },
              }}
            >
              By continuing, you agree to TikTok’s <span>Terms of Service</span>{" "}
              and confirm that you have read TikTok’s{" "}
              <span>Privacy Policy.</span>
            </Box>
          )}
        </Box>

        <Box className="auth-footer">
          {mode.status === MODE.LOGIN ? (
            <span>Don’t have an account? </span>
          ) : (
            <span>Already have an account?</span>
          )}

          <Typography
            sx={{
              fontSize: "15px",
              color: "rgb(254, 44, 85)",
              fontWeight: 600,
              marginLeft: "5px",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() =>
              setMode((mode) => ({
                ...mode,
                status: mode.status === MODE.LOGIN ? MODE.REGISTER : MODE.LOGIN,
                data:
                  mode.status === MODE.LOGIN
                    ? LIST_OPTION_SIGNUP.slice(0, 3)
                    : LIST_OPTION_LOGIN,
                form: false,
              }))
            }
          >
            {mode.status === MODE.LOGIN ? "Sign up" : "Log in"}
          </Typography>
        </Box>
      </ModalStyled>
    </Dialog>
  );
};

export default ModalLogin;
