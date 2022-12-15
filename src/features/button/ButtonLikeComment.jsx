import { IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import videoApi from "../../api/videoApi";
import { IconHeart, IconHeartRounded } from "../../components/Icons";

const ButtonLikeComment = ({ comment }) => {
  const [countLike, setCountLike] = useState(0);
  const [isLike, setIsLike] = useState(false);
  useEffect(() => {
    setCountLike(() => comment.likes_count);
    setIsLike(() => comment.is_liked);
  }, [comment]);
  const handleUnLike = async () => {
    try {
      const res = await videoApi.unLikeComment(comment.id);
      setCountLike((prev) => prev - 1);
      setIsLike((prev) => !prev);
    } catch (error) {}
  };
  const handleLike = async () => {
    try {
      const res = await videoApi.likeComment(comment.id);
      setCountLike((prev) => prev + 1);
      setIsLike((prev) => !prev);
    } catch (error) {}
  };
  const handleClick = async () => {
    if (!comment.id) return;
    if (isLike) {
      await handleUnLike();
    } else {
      await handleLike();
    }
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          svg: {
            color: isLike ? "rgb(254, 44, 85)" : "unset",
          },
        }}
      >
        {isLike ? <IconHeart /> : <IconHeartRounded />}
      </IconButton>
      {countLike}
    </>
  );
};

export default ButtonLikeComment;
