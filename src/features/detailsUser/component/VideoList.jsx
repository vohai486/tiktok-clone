import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { IconUserBio } from "../../../components/Icons";
import Video from "./Video";
import VideoSekeleton from "./VideoSekeleton";

const VideoList = ({ loading }) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const user = useSelector((state) => state.user.userInfo);
  return (
    <Box sx={{ width: "100%", height: "490px" }}>
      {loading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(184px, 1fr))",
            gap: "24px 16px",
          }}
        >
          {Array.from(new Array(24))
            .fill(" ")
            .map((item, index) => (
              <VideoSekeleton key={index} />
            ))}
        </Box>
      ) : user?.videos?.length === 0 ? (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            svg: {
              opacity: 0.34,
              width: "90px",
              height: "90px",
            },
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <IconUserBio />
            <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
              {loggedInUser.id === user.id
                ? "Upload your first video"
                : "No content"}
            </Typography>
            <Typography
              sx={{ color: "rgba(22, 24, 35, 0.75)", marginTop: "8px" }}
            >
              {loggedInUser.id === user.id
                ? "Your videos will appear here"
                : "This user has not published any videos."}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(184px, 1fr))",
            gap: "24px 16px",
          }}
        >
          {user?.videos?.map((item) => (
            <Video video={item} key={item.uuid} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default VideoList;
