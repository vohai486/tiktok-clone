import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userApi from "../../api/userApi";
import { useShowModal } from "../../context/showModalContext";

const ButtonFollowing = ({
  type = "white",
  height = "36px",
  width = "88px",
  id,
  isFollow,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    setIsFollowing(isFollow);
  }, [isFollow]);

  const { showModal, setShowModal } = useShowModal();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const handleUnFollow = async () => {
    try {
      const res = await userApi.unFollowAUser(id);
      setIsFollowing((prev) => !prev);
    } catch (error) {}
  };
  const handleFollow = async () => {
    try {
      const res = await userApi.followAUser(id);
      setIsFollowing((prev) => !prev);
    } catch (error) {}
  };
  const handleAccount = () => {
    if (!id) return;
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };
  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: "4px",
        color: isFollowing
          ? "#161823"
          : type === "red"
          ? "rgb(255, 255, 255)"
          : "rgb(254, 44, 85)",
        background: isFollowing
          ? "rgb(255, 255, 255)"
          : type === "red"
          ? "rgb(254,44,85)"
          : "rgb(255, 255, 255)",
        borderColor: isFollowing
          ? "rgba(22, 24, 35, 0.12)"
          : type === "red"
          ? "rgb(254,44,85)"
          : "unset",
        width: width,
        height: height,
        fontSize: type === "red" ? "18px" : "16px",
        fontWeight: 500,
        textTransform: "capitalize",

        "&:hover": {
          background: isFollowing
            ? "rgb(248, 248, 248)"
            : type === "red"
            ? "linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)), rgb(254, 44, 85)"
            : "rgba(254, 44, 85, 0.06)",
          borderColor: isFollowing
            ? "rgb(208, 209, 211)"
            : type === "red"
            ? "rgb(254,44,85)"
            : "unset",
        },
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!isLoggedIn) {
          setShowModal(true);
          return;
        }
        handleAccount();
      }}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
};

export default ButtonFollowing;
