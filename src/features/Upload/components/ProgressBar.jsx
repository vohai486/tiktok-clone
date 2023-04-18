import {
  PauseCircleFilledOutlined,
  PlayCircleFilledOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Slider } from "@mui/material";
import React from "react";
const renderTime = (number) => {
  if (isNaN(number)) return;
  const minutes = Math.floor(number / 60);
  const seconds = Math.floor(number - minutes * 60);
  return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`;
};
const ProgressBar = ({
  handlePlay,
  play,
  duration,
  currentTime,
  handleChangeProgess,
}) => {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 3,
        top: 0,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "calc(100% - 10px)",
          height: "90px",
          bottom: "5px",
          paddingTop: "20px",
          margin: "0 5px",
          borderRadius: "10px",
          background:
            "linear-gradient(rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.65) 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "20px",
            justifyContent: "space-between",
            width: "100%",
            padding: "0 25px",
            marginBottom: "10px",
          }}
        >
          <Box
            sx={{
              color: "rgb(255, 255, 255)",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              fontWeight: 600,
            }}
          >
            <IconButton
              sx={{
                padding: 0,
                svg: { color: "white", fontSize: "16px", marginRight: "5px" },
              }}
              onClick={() => {
                handlePlay();
              }}
            >
              {play ? (
                <PauseCircleFilledOutlined />
              ) : (
                <PlayCircleFilledOutlined />
              )}
            </IconButton>
            <span>
              {renderTime(currentTime)} / {renderTime(duration)}
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            margin: "auto",
            width: "calc(100% - 10px)",
            padding: "0 15px",
          }}
        >
          <Slider
            aria-label="time-indicator"
            size="small"
            value={currentTime}
            min={0}
            step={0.1}
            max={duration}
            onChange={(_, value) => handleChangeProgess(value)}
            sx={{
              color: "#fff",
              height: 4,
              "& .MuiSlider-thumb": {
                width: 8,
                height: 8,
                transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                "&:before": {
                  boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
                },
                "&.Mui-active": {
                  width: 20,
                  height: 20,
                },
              },
              "& .MuiSlider-rail": {
                opacity: 0.28,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressBar;
