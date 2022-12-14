import { EmojiFlags } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import videoApi from "../../../api/videoApi";
import {
  IconArrowDown,
  IconArrowUp,
  IconCloseRounded,
  IconCode,
  IconComment,
  IconFacebook,
  IconHeart,
  IconMusic,
  IconNextRounded,
  IconSend,
  IconTick,
  IconTikTok,
  IconTwitter,
  IconWhatsApp,
} from "../../../components/Icons";
import {
  renderAvatarImage,
  renderName,
} from "../../../constants/defaultUrlImage";
import { useShowModal } from "../../../context/showModalContext";
import ButtonFollowing from "../../button/ButtonFollowing";
import ButtonLikeVideo from "../../button/ButtonLikeVideo";

const BoxContainer = styled(Box)({
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  display: "flex",
});
const BoxLeft = styled(Box)({
  width: "896px",
  background: "rgb(0, 0, 0)",
  flex: 1,
  position: "relative",
  overflow: "hidden",
});
const BoxContent = styled(Box)({
  position: "relative",
  width: "100%",
  height: "100%",
  cursor: "pointer",
});
const BoxVideoWrapper = styled(Box)({
  position: "absolute",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  video: {
    width: "100%",
    height: "100%",
    display: "block",
  },
});
const ButtonClose = styled(IconButton)({
  position: "absolute",
  top: "20px",
  left: "20px",
  height: "40px",
  width: "40px",
  background: "rgba(255, 255, 255, 0.12)",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.3)",
  },
});
const ButtonLogo = styled(IconButton)({
  position: "absolute",
  top: "20px",
  left: "84px",
  svg: {
    borderRadius: "50%",
  },
});
const ButtonReport = styled(Box)({
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 600,
  lineHeight: "20px",
  padding: "10px 16px",
  backgroundColor: "rgba(255, 255, 255, 0.12)",
  display: "flex",
  borderRadius: "100px",
  position: "absolute",
  top: "20px",
  right: "20px",
  alignItems: "center",
  color: "rgb(255, 255, 255)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

const BoxRight = styled(Box)({
  width: "544px",
  paddingTop: "32px",
  flexShrink: 0,
});
const BoxInfo = styled(Box)({
  padding: "22px 32px 15px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
});
const DetailVideo = () => {
  const { showModal, setShowModal } = useShowModal();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [video, setVideo] = useState({});
  const videoRef = useRef(null);
  const videos = useSelector((state) => state.user.videos);
  useEffect(() => {
    (async () => {
      try {
        const res = await videoApi.getVideo(searchParams?.get("q"));
        setVideo(res.data);
      } catch (error) {
        navigate("/notfound");
      }
    })();
  }, [location.search]);
  useEffect(() => {
    if (!video.id) return;
    (async () => {
      const res = await videoApi.getListVideoComment(video.id);
      console.log(res);
    })();
  }, [video]);
  return (
    <BoxContainer>
      <BoxLeft>
        <Box
          className="video-overlay"
          sx={{
            position: "absolute",
            opacity: 0.3,
            width: "10%",
            height: "10%",
            filter: "blur(2px)",
            left: "50%",
            top: "50%",
            transform: "scale(11)",
            background: " center center / cover no-repeat",
            backgroundImage: `url(${video?.thumb_url})`,
          }}
        ></Box>
        <BoxContent>
          <BoxVideoWrapper>
            <video
              ref={videoRef}
              loop
              controls
              autoPlay
              src={video?.file_url}
            ></video>
          </BoxVideoWrapper>
        </BoxContent>
        <ButtonClose onClick={() => navigate(`/@${video?.user?.nickname}`)}>
          <IconCloseRounded />
        </ButtonClose>
        <ButtonLogo>
          <IconTikTok />
        </ButtonLogo>
        <ButtonReport>
          <EmojiFlags /> Reports
        </ButtonReport>
        {/* {videos?.indexOf(+searchParams?.get("q")) !== 0 && (
          <IconButton
            sx={{
              position: "absolute",
              top: "calc(50% - 48px)",
              right: "20px",
              transform: "rotate(-90deg)",
              background: "rgba(255, 255, 255, 0.12)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.3)",
              },
            }}
            onClick={() =>
              setSearchParams({
                q: videos[videos?.indexOf(+searchParams?.get("q")) - 1],
              })
            }
          >
            <IconArrowUp />
          </IconButton>
        )}
        {videos?.indexOf(+searchParams?.get("q")) !== videos?.length - 1 && (
          <IconButton
            sx={{
              position: "absolute",
              top: "calc(50% + 8px)",
              right: "20px",
              transform: "rotate(90deg)",
              background: "rgba(255, 255, 255, 0.12)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.3)",
              },
            }}
            onClick={() =>
              setSearchParams({
                q: videos[videos?.indexOf(+searchParams?.get("q")) + 1],
              })
            }
          >
            <IconArrowDown />
          </IconButton>
        )} */}
        {/* {videoRef.paused && (
          <Box
            sx={{
              zIndex: 1000,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 0,
              height: 0,
              borderTop: "25px solid transparent",
              borderLeft: " 50px solid #fff",
              borderBottom: "25px solid transparent",
              borderRadius: "6px",
              pointerEvents: "none",
            }}
          ></Box>
        )} */}
      </BoxLeft>
      <BoxRight>
        <BoxInfo>
          <Avatar
            sx={{ width: "40px", height: "40px" }}
            src={renderAvatarImage(video?.user?.avatar)}
          />
          <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <Typography
              sx={{ fontSize: "18px", fontWeight: 700, lineHeight: "25px" }}
            >
              {video?.user?.nickname} {video?.user?.tick && <IconTick />}
            </Typography>
            <Box
              sx={{
                fontSize: "14px",
                span: {
                  lineHeight: "20px",
                },
              }}
            >
              <Typography component="span">
                {renderName(
                  video?.user?.first_name,
                  video?.user?.last_name,
                  video?.user?.first_name
                )}
              </Typography>
              <Typography component="span">·</Typography>{" "}
              <Typography component="span">2ago</Typography>
            </Box>
          </Box>
          <ButtonFollowing
            id={video?.user?.id}
            isFollow={!!video?.user?.is_followed}
            width="106px"
          />
        </BoxInfo>
        <Box sx={{ padding: "0 32px" }}>
          <Typography>
            {video?.description} {`#${video?.user?.nickname}`}
          </Typography>
          <Box
            sx={{
              margin: "10px 0 16px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <IconMusic></IconMusic>
            <Typography sx={{ fontWeight: 700 }}>
              nhạc nền{" "}
              {video?.music?.length === 0
                ? video?.user?.nickname
                : video?.music}
            </Typography>
          </Box>
          <Box
            sx={{
              fontSize: "12px",
              fontWeight: "bold",
              padding: "16px 0",
              color: "rgba(22, 24, 35, .75)",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  button: {
                    background: "rgba(22, 24, 35, 0.06)",
                  },
                }}
              >
                <ButtonLikeVideo
                  id={video?.id}
                  is_liked={video?.is_liked}
                  count={video?.likes_count}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  button: {
                    background: "rgba(22, 24, 35, 0.06)",
                  },
                  svg: {
                    color: "#161823",
                  },
                }}
              >
                <IconButton>
                  <IconComment />
                </IconButton>
                {video?.comments_count}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                svg: {
                  width: "24px",
                  height: "24px",
                },
              }}
            >
              <IconCode />
              <IconSend />
              <IconFacebook />
              <IconWhatsApp />
              <IconTwitter />
              <IconNextRounded />
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "16px",
              border: "1px solid rgba(22, 24, 35, 0.12)",
              borderRadius: "2px",
              fontSize: "14px",
              color: "rgba(22, 24, 35, 0.75)",
              display: "flex",
            }}
          >
            <Box
              sx={{
                fontSize: "14px",
                flex: 1,
                whiteSpace: "nowrap",
                padding: "7px 0 5px 12px",
                backgroundColor: "rgba(22, 24, 35, 0.06)",
              }}
            >
              {window.location.href.length < 59
                ? window.location.href
                : window.location.href.slice(0, 56) + "..."}
            </Box>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              sx={{
                backgroundColor: "rgba(22, 24, 35, 0.06)",
                color: "#161823",
                fontWeight: 700,
                textTransform: "capitalize",
              }}
            >
              Copy link
            </Button>
          </Box>
        </Box>
      </BoxRight>
    </BoxContainer>
  );
};

export default DetailVideo;
