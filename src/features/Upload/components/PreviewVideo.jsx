import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IconMusic, IconUpload } from "../../../components/Icons";
import { renderAvatarImage } from "../../../constants/defaultUrlImage";
import ProgressBar from "./ProgressBar";
var intervalId;
// $0.toBlob(blob => {
//   const file = new File([blob], "image.png");
//     console.log(file)
// }); get file canvas
const PreviewVideo = ({ setVideoFile, videoFile }) => {
  const user = useSelector((state) => state.user.current);
  const [showControls, setShowControls] = useState(false);
  const inputRef = useRef(null);
  const videoRef = useRef(new Audio());
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const handlePlay = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false);
    } else {
      videoRef.current.play();
      setPlay(true);
    }
  };
  const handleChangeProgess = (value) => {
    videoRef.current.currentTime = value;
    setCurrentTime(+value);
    setPlay(true);
  };
  useEffect(() => {
    if (!videoFile) return;
    setPlay(true);
    videoRef.current.src = URL.createObjectURL(videoFile);
    videoRef.current.pause();

    videoRef.current.load();
  }, [videoFile]);

  useEffect(() => {
    intervalId && clearInterval(intervalId);
    if (play) {
      videoRef.current.play();
      intervalId = setInterval(() => {
        setCurrentTime(+videoRef.current.currentTime);
        console.log(+videoRef.current.currentTime);
        if (videoRef.current.currentTime === videoRef.current.duration) {
          setTimeout(() => {
            setCurrentTime(0);
            videoRef.current.pause();
            videoRef.current.play();
          }, 50);
        }
      }, 50);
    }
  }, [play]);

  return videoFile ? (
    <Box
      sx={{
        width: "284px",
        height: "556px",
        position: "relative",
        color: "rgb(255, 255, 255)",
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        id="my-video"
        ref={videoRef}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration);
        }}
        style={{
          height: "486px",
          width: "259px",
          backgroundColor: "rgb(0, 0, 0)",
          marginLeft: "12px",
          marginTop: "13px",
          borderRadius: "0.5px",
          zIndex: 10,
        }}
      ></video>
      {showControls && (
        <ProgressBar
          handleChangeProgess={handleChangeProgess}
          handlePlay={handlePlay}
          play={play}
          duration={duration}
          currentTime={currentTime}
        />
      )}

      <Box
        sx={{
          position: "absolute",
          top: "40px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
          fontSize: "12px",
          fontWeight: 700,
          color: "rgba(255, 255, 255, 0.75)",
          gap: "20px",
        }}
      >
        <span>Following</span>
        <span>For You</span>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "70px",
          left: "25px",
          zIndex: 2,
          opacity: 0.6,
          color: "white",
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>@{user.nickname}</Typography>
        <Typography sx={{ fontSize: "12px" }}>file</Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconMusic></IconMusic>
          </Box>
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              sx={{
                paddingLeft: "15px",
                transform: "translateX(100%)",
                animation: "text-running 15s linear infinite",
                fontSize: "12px",
              }}
            >
              Original sound - {user.nickname}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "275px",
          right: "20px",
          zIndex: 2,
          opacity: 0.6,
        }}
      >
        <Avatar
          sx={{ width: "40px", height: "40px" }}
          src={renderAvatarImage(user.avatar)}
        />
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "130px",
          right: "24px",
          zIndex: 2,
          opacity: 0.6,
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <img
          alt=""
          src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/iconbar_right.8fa90e26.svg"
        />
      </Box>
      <Box
        sx={{
          backgroundImage: "url(/Phone.png)",
          backgroundSize: "cover",
          height: "100%",
          width: "100%",
          minWidth: "100%",
          minHeight: "100%",
          position: "absolute",
          top: "0px",
          left: "0px",
          zIndex: 1,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          bottom: "74px",
          right: "20px",
          zIndex: 2,
          opacity: 0.6,
        }}
      >
        <Box
          className="loading-spin-avatar"
          sx={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background:
              "conic-gradient(from 90deg at 50% 50%, rgb(57, 57, 57) -40.11deg, rgb(21, 21, 21) 47.27deg, rgb(57, 57, 57) 143.02deg, rgb(22, 22, 22) 227.49deg, rgb(57, 57, 57) 319.89deg, rgb(21, 21, 21) 407.27deg)",
          }}
        >
          <Avatar
            sx={{
              width: "24px",
              height: "24px",
              position: "absolute",
              top: "8px",
              right: "8px",
            }}
            src={renderAvatarImage(user.avatar)}
          />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box
      onClick={() => inputRef.current.click()}
      sx={{
        border: "2px dashed rgba(22, 24, 35, 0.2)",
        width: "260px",
        height: "480px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        padding: "0 35px",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "14px",
        transition: "background 0.15s ease-in-out 0s",
        whiteSpace: "nowrap",

        ".upload-item": {
          color: "rgba(22,24,35,0.5)",
          fontSize: "14px",
          textAlign: "center",
          marginBottom: "10px",
        },
        h3: {
          color: "rgba(22,24,35,0.75)",
          fontSize: "14px",
        },

        h2: {
          color: "#161823",
          fontSize: "18px",
          fontWeight: 600,
        },
        "&:hover": {
          background: "rgba(22, 24, 35, 0.03)",
          borderColor: "rgb(254, 44, 85)",
        },
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4,video/x-m4v,video/*"
        style={{ display: "none" }}
        onChange={(e) => setVideoFile(e.target.files[0])}
      ></input>
      <IconUpload />
      <Typography component="h2" sx={{ marginTop: "24px" }}>
        Select video to upload
      </Typography>
      <Typography component="h3" sx={{ margin: "4px 0 24px" }}>
        Or drag and drop a file
      </Typography>
      <Typography className="upload-item">MP4 or WebM</Typography>
      <Typography className="upload-item">
        720x1280 resolution or higher
      </Typography>
      <Typography className="upload-item">Up to 10 minutes</Typography>
      <Typography className="upload-item">Less than 2 GB</Typography>
      <Button
        sx={{
          background: "rgba(254,44,85,1)",
          border: "1px solid rgba(254,44,85,1)",
          minWidth: "96px",
          width: "100%",
          height: "36px",
          fontWeight: 600,
          textTransform: "capitalize",
          color: "#fff",
          margin: "16px 0",
          "&:hover": {
            background: "rgba(234,40,78,1)",
            borderColor: "rgba(234,40,78,1)",
          },
        }}
      >
        Select file
      </Button>
    </Box>
  );
};

export default PreviewVideo;
