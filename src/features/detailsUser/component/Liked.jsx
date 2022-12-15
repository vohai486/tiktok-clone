import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import videoApi from "../../../api/videoApi";
import { IconLock, IconLockBorder } from "../../../components/Icons";
import Video from "./Video";

const Liked = () => {
  const loggedInUser = useSelector((state) => state.user.current);
  const user = useSelector((state) => state.user.userInfo);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await videoApi.getUserLikedVideos(loggedInUser.id);
      setVideos(res.data);
    })();
  }, []);
  return (
    <>
      {loggedInUser.id !== user.id ? (
        <Box
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            height: "100%",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <IconLockBorder />
            <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
              This user's liked videos are private
            </Typography>
            <Typography
              sx={{ color: "rgba(22, 24, 35, 0.75)", marginTop: "8px" }}
            >
              Videos liked by {user?.nickname} are currently hidden
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
          {videos.length > 0 &&
            videos.map((item) => <Video video={item} key={item.id} />)}
        </Box>
      )}
    </>
  );
};

export default Liked;
