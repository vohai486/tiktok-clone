import {
  Avatar,
  Box,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  createSearchParams,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  IconComment,
  IconMusic,
  IconNextRounded,
  IconTick,
} from "../../../components/Icons";
import {
  renderAvatarImage,
  renderName,
  sliceString,
} from "../../../constants/defaultUrlImage";
import { useShowModal } from "../../../context/showModalContext";
import useElementOnScreen from "../../../hooks/useElementOnScreen";
import ButtonFollowing from "../../button/ButtonFollowing";
import ButtonLikeVideo from "../../button/ButtonLikeVideo";

const BoxVideo = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  padding: "20px 0",
  maxWidth: "692px",
  [theme.breakpoints.down(1072)]: {
    maxWidth: "592px",
  },
  [theme.breakpoints.down(768)]: {
    maxWidth: "calc(100vw - 32px - 68px)",
  },
  gap: "12px",

  position: "relative",
  "&::after": {
    position: "absolute",
    content: '""',
    left: 0,
    bottom: 0,
    height: "1px",
    width: "100%",
    transform: "scaleT(0,5)",
    background: "rgba(22, 24, 35, .2)",
  },
  ".MuiAvatar-root.avatar": {
    width: "56px",
    height: "56px",
    [theme.breakpoints.down(570)]: {
      display: "none",
    },
  },
}));
const BoxContent = styled(Box)(({ theme }) => ({
  maxWidth: "624px",
  marginLeft: "12px",
  [theme.breakpoints.down(570)]: {
    marginLeft: 0,
  },
}));
const BoxInfoUser = styled(Box)(({ theme }) => ({
  marginRight: "114px",
  button: {
    position: "absolute",
    right: 0,
    top: "28px",
  },
}));
const BoxMusic = styled(Box)(({ theme }) => ({
  marginTop: "4px",
  marginBottom: "12px",
  fontWeight: 600,
  svg: {
    transform: "translateY(4px)",
  },
}));
const Video = ({ video }) => {
  const theme = useTheme();
  const { showModal, setShowModal } = useShowModal();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.77,
  };
  const isVisibile = useElementOnScreen(options, videoRef);
  useEffect(() => {
    if (isVisibile) {
      if (!playing) {
        videoRef.current.play();
        setPlaying(true);
      }
    } else {
      if (playing) {
        videoRef.current.pause();
        setPlaying(false);
      }
    }
  }, [isVisibile]);
  const isBreakPointDown768 = useMediaQuery(theme.breakpoints.down(768));
  const isBreakPointDown570 = useMediaQuery(theme.breakpoints.down(570));
  const isBreakPointDown479 = useMediaQuery(theme.breakpoints.down(479));
  const isBreakPointDown1080 = useMediaQuery(theme.breakpoints.down(1080));
  const isBreakPointDown678 = useMediaQuery(theme.breakpoints.down(678));
  const navigate = useNavigate();
  return (
    <BoxVideo>
      <Avatar
        onClick={() => navigate(`/@${video?.user?.nickname}`)}
        className="avatar"
        src={renderAvatarImage(video?.user?.avatar)}
      />
      <BoxContent>
        <BoxInfoUser>
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <Avatar
              src={renderAvatarImage(video?.user?.avatar)}
              sx={{
                [theme.breakpoints.up(570)]: {
                  display: "none",
                },
              }}
              onClick={() => navigate(`/@${video?.user?.nickname}`)}
            ></Avatar>
            <Box
              className="pointer"
              onClick={() => navigate(`/@${video?.user?.nickname}`)}
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "flex-end",
                [theme.breakpoints.down(768)]: {
                  flexDirection: "column",
                  gap: 0,
                  alignItems: "unset",
                },
              }}
            >
              <Typography
                sx={{
                  lineHeight: "25px",
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                {video?.user?.nickname} {video?.user?.tick && <IconTick />}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                {renderName(
                  video?.user?.first_name,
                  video?.user?.last_name,
                  video?.user?.nickname
                )}
              </Typography>
            </Box>
          </Box>
          <ButtonFollowing
            isFollow={!!video?.user?.is_followed}
            id={video?.user?.id}
            height="28px"
            width="88px"
          ></ButtonFollowing>
          <Typography>
            {isBreakPointDown479
              ? sliceString(video?.description, 28)
              : video?.description}
          </Typography>
          <BoxMusic>
            <IconMusic />
            nhạc nền - {}
            {video?.music?.length === 0
              ? renderName(
                  video?.user?.first_name,
                  video?.user?.last_name,
                  video?.user?.nickname
                )
              : video?.music}
          </BoxMusic>
        </BoxInfoUser>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <Box
            sx={{
              width:
                video?.meta?.video?.resolution_x >=
                video?.meta?.video?.resolution_y
                  ? !isBreakPointDown768
                    ? "calc(440px + (100vw - 768px) / 1152 * 100)"
                    : !isBreakPointDown570
                    ? "calc(100vw - 72px - 32px - 16px - 56px - 60px)"
                    : "calc(100vw - 72px - 32px - 16px - 40px)"
                  : isBreakPointDown479
                  ? "calc(100vw - 72px - 32px - 16px - 40px)"
                  : "unset",
              height:
                video?.meta?.video?.resolution_x <
                video?.meta?.video?.resolution_y
                  ? !isBreakPointDown1080
                    ? "calc(480px + (100vw - 768px) / 1152 * 100)"
                    : !isBreakPointDown678
                    ? "calc(500px + (100vw - 768px) / 1152 * 100)"
                    : !isBreakPointDown479
                    ? "calc(550px + (100vw - 768px) / 1152 * 100)"
                    : "420px"
                  : "unset",
              position: "relative",
              borderRadius: "8px",
              marginRight: "20px",
              overflow: "hidden",
              backgroundSize: "cover",
            }}
          >
            <canvas style={{ width: "100%", display: "block" }}></canvas>
            <Box
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={video?.thumb_url}
                  alt=""
                />
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <video
                    preload="true"
                    ref={videoRef}
                    controls
                    loop
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      objectFit: "cover",
                    }}
                    src={video?.file_url}
                  ></video>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              button: {
                background: "rgba(22, 24, 35, .06)",
                width: "48px",
                height: "48px",
                margin: "5px 0",
                [theme.breakpoints.down(768)]: {
                  width: "32px",
                  height: "32px",
                },
              },
              svg: {
                width: "24px",
                height: "24px",
                color: "#161823",
                // color: "red",
              },
              span: {
                textAlign: "center",
                fontSize: "12px",
                color: "rgba(22, 24, 35, .75)",
                fontWeight: 500,
              },
            }}
          >
            <ButtonLikeVideo
              id={video.id}
              is_liked={video.is_liked}
              count={video?.likes_count}
            />
            <IconButton
              onClick={() => {
                if (!isLoggedIn) {
                  setShowModal(true);
                } else {
                  navigate({
                    pathname: `/@${video.user.nickname}/video`,
                    search: createSearchParams({
                      q: video?.id,
                    }).toString(),
                  });
                }
              }}
            >
              <IconComment />
            </IconButton>
            <Box component={"span"}>{video?.comments_count}</Box>
            <IconButton>
              <IconNextRounded />
            </IconButton>
            <Box component={"span"}>{video?.shares_count}</Box>
          </Box>
        </Box>
      </BoxContent>
    </BoxVideo>
  );
};

export default Video;
