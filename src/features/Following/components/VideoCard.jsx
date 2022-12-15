import { Avatar, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconTick } from "../../../components/Icons";
import {
  renderAvatarImage,
  renderName,
} from "../../../constants/defaultUrlImage";
import ButtonFollowing from "../../button/ButtonFollowing";

const VideoCard = ({ user }) => {
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  return (
    <Box
      onClick={() => navigate(`/@${user.nickname}`)}
      sx={{
        width: "100%",
        maxHeight: "420px",
        borderRadius: "8px",
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
      }}
      onMouseEnter={() => {
        setShowVideo(true);
      }}
      onMouseLeave={() => setShowVideo(false)}
    >
      <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
        <img
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={user.popular_video.thumb_url}
        />
        {showVideo && (
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <video
              autoPlay
              loop
              muted="muted"
              src={user.popular_video.file_url}
              style={{
                display: "block",
                width: " 100%",
                height: "100%",
                objectFit: "cover",
              }}
            ></video>
          </Box>
        )}
      </Box>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "200px",
          padding: "30px 12px 20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          src={renderAvatarImage(user.avatar)}
          sx={{ width: "48px", height: "48px", marginBottom: "14px" }}
        />
        <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
          {user.nickname}
        </Typography>
        <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
          {renderName(user.first_name, user.last_name, user.nickname)}

          {user.tick && <IconTick />}
        </Typography>
        <ButtonFollowing
          id={user.id}
          isFollow={!!user.is_followed}
          type="red"
          width="164px"
        ></ButtonFollowing>
      </Box>
    </Box>
  );
};

export default VideoCard;
