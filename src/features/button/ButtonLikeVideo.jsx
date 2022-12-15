import { Box, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userApi from "../../api/userApi";
import videoApi from "../../api/videoApi";
import { IconHeart } from "../../components/Icons";
import { useShowModal } from "../../context/showModalContext";

const ButtonLikeVideo = ({ is_liked, id, count }) => {
  const [isLike, setIsLike] = useState(false);
  const [countLike, setCountLike] = useState(1);
  useEffect(() => {
    setIsLike(() => is_liked);
  }, [is_liked]);
  useEffect(() => {
    setCountLike(() => count);
  }, [count]);
  const { showModal, setShowModal } = useShowModal();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const handleUnLike = async () => {
    try {
      const res = await videoApi.unLikeAVideo(id);
      setIsLike((prev) => !prev);
      setCountLike((prev) => prev - 1);
    } catch (error) {}
  };
  const handleLike = async () => {
    try {
      const res = await videoApi.likeAVideo(id);
      setIsLike((prev) => !prev);
      setCountLike((prev) => prev + 1);
    } catch (error) {}
  };
  const handleVideo = () => {
    if (!id) return;
    if (isLike) {
      handleUnLike();
    } else {
      handleLike();
    }
  };
  return (
    <>
      <IconButton
        sx={{
          svg: {
            color: isLike ? "red !important" : "#161823",
          },
        }}
        onClick={() => {
          if (!isLoggedIn) {
            setShowModal(true);
            return;
          }
          handleVideo();
        }}
      >
        <IconHeart />
      </IconButton>
      <Box component={"span"}>{countLike}</Box>
    </>
  );
};

export default ButtonLikeVideo;
