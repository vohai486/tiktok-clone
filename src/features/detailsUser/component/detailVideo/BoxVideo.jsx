import { EmojiFlags } from "@mui/icons-material";
import { Box, IconButton, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IconCloseRounded, IconTikTok } from "../../../../components/Icons";
const BoxWrapper = styled(Box)({
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
const BoxVideo = ({ video }) => {
  const navigate = useNavigate();
  return (
    <BoxWrapper>
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
          <video loop controls autoPlay src={video?.file_url}></video>
        </BoxVideoWrapper>
      </BoxContent>
      {/* navigate(`/@${video?.user?.nickname}`) */}
      <ButtonClose onClick={() => navigate(-1)}>
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
    </BoxWrapper>
  );
};

export default BoxVideo;
