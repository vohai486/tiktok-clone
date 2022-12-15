import { Box, styled, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import { IconLock } from "../../../components/Icons";
import Liked from "./Liked";
import VideoList from "./VideoList";

const BoxTabList = styled(Box)({
  maxWidth: "400px",
  height: "44px",
  display: "flex",
  position: "relative",
  marginBottom: "8px",
  "&::after": {
    content: '""',
    position: "absolute",
    width: "100%",
    bottom: 0,
    height: "1px",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    transform: "scaleY(50%)",
  },
  ".tab-item": {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: 600,
    cursor: "pointer",
    color: "rgba(22, 24, 35, .5)",
    svg: { width: "18px", height: "18px" },
    "&.active": {
      color: "#161823",
    },
  },
});
const TabDetails = ({ loading }) => {
  const [tabMode, setTabMode] = useState("video");
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <BoxTabList>
        <Box
          className={`${tabMode === "video" ? "active" : ""}  tab-item`}
          onClick={() => setTabMode("video")}
        >
          Video
        </Box>
        <Box
          className={`${tabMode === "like" ? "active" : ""} tab-item`}
          onClick={() => setTabMode("like")}
        >
          <Box>
            <IconLock /> Liked
          </Box>
        </Box>
        <Box
          className="tab-hover"
          sx={{
            position: "absolute",
            width: "50%",
            height: "2px",
            background: "rgba(22, 24, 35, 1)",
            left: 0,
            bottom: 0,
            transition: "all .5s ease-in-out",
            transform:
              tabMode === "like" ? "translateX(calc(100%))" : "translateX(0)",
          }}
        ></Box>
      </BoxTabList>
      {tabMode === "like" ? <Liked></Liked> : <VideoList loading={loading} />}
    </Box>
  );
};

export default TabDetails;
