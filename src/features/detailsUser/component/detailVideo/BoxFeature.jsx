import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Dialog,
  DialogContent,
  Fade,
  IconButton,
  Modal,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import videoApi from "../../../../api/videoApi";
import {
  IconCode,
  IconComment,
  IconDelete,
  IconFacebook,
  IconHeartRounded,
  IconMenuDot,
  IconMusic,
  IconNextRounded,
  IconSend,
  IconTick,
  IconTriangle,
  IconTwitter,
  IconWhatsApp,
} from "../../../../components/Icons";
import {
  renderAvatarImage,
  renderName,
} from "../../../../constants/defaultUrlImage";
import ButtonFollowing from "../../../button/ButtonFollowing";
import ButtonLikeComment from "../../../button/ButtonLikeComment";
import ButtonLikeVideo from "../../../button/ButtonLikeVideo";
import InputComment from "./InputComment";

const BoxWrapper = styled(Box)({
  width: "544px",
  paddingTop: "32px",
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
});
const BoxInfo = styled(Box)({
  padding: "22px 32px 15px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
});
const BoxFeature = ({ video }) => {
  const loggedInUser = useSelector((state) => state.user.current);
  const loggedInUserId = loggedInUser.id;
  const [countComment, setCountComment] = useState(0);
  const [listCommentVideo, setListCommentVideo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idDel, setIdDel] = useState("");
  useEffect(() => {
    handleGetListComment();
  }, [video]);
  const handleGetListComment = async () => {
    if (!video.id) return;
    const res = await videoApi.getListVideoComment(video.id);
    setListCommentVideo(res.data);
  };
  const handleComment = async (values) => {
    try {
      const res = await videoApi.postComment(video.uuid, values);
      handleGetListComment();
    } catch (error) {}
  };
  const handleDeleteComment = async (id) => {
    try {
      const res = await videoApi.deleteComment(id);
      handleGetListComment();
      setShowModal(false);
    } catch (err) {}
  };
  return (
    <BoxWrapper>
      <BoxInfo>
        <Avatar
          sx={{ width: "40px", height: "40px" }}
          src={renderAvatarImage(video?.user?.avatar)}
        />
        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Typography
            sx={{ fontSize: "18px", fontWeight: 700, lineHeight: "25px" }}
          >
            {video?.user?.nickname} {video?.user?.tick && <IconTick />}
          </Typography>
          <Box
            sx={{
              fontSize: "14px",
              span: {
                lineHeight: "20px",
              },
            }}
          >
            <Typography component="span">
              {renderName(
                video?.user?.first_name,
                video?.user?.last_name,
                video?.user?.first_name
              )}
            </Typography>
            <Typography component="span">·</Typography>{" "}
            <Typography component="span">2ago</Typography>
          </Box>
        </Box>
        <ButtonFollowing
          id={video?.user?.id}
          isFollow={!!video?.user?.is_followed}
          width="106px"
        />
      </BoxInfo>
      <Box sx={{ padding: "0 32px" }}>
        <Typography>
          {video?.description} {`#${video?.user?.nickname}`}
        </Typography>
        <Box
          sx={{
            margin: "10px 0 16px",
            display: "flex",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <IconMusic></IconMusic>
          <Typography sx={{ fontWeight: 700 }}>
            nhạc nền{" "}
            {video?.music?.length === 0 ? video?.user?.nickname : video?.music}
          </Typography>
        </Box>
        <Box
          sx={{
            borderRadius: "12px",

            fontSize: "12px",
            fontWeight: "bold",
            padding: "16px 0",
            color: "rgba(22, 24, 35, .75)",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                button: {
                  background: "rgba(22, 24, 35, 0.06)",
                },
              }}
            >
              <ButtonLikeVideo
                id={video?.id}
                is_liked={video?.is_liked}
                count={video?.likes_count}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                button: {
                  background: "rgba(22, 24, 35, 0.06)",
                },
                svg: {
                  color: "#161823",
                },
              }}
            >
              <IconButton>
                <IconComment />
              </IconButton>
              {listCommentVideo?.length}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
              svg: {
                width: "24px",
                height: "24px",
              },
            }}
          >
            <IconCode />
            <IconSend />
            <IconFacebook />
            <IconWhatsApp />
            <IconTwitter />
            <IconNextRounded />
          </Box>
        </Box>
        <Box
          sx={{
            margin: "16px 0",
            border: "1px solid rgba(22, 24, 35, 0.12)",
            fontSize: "14px",
            color: "rgba(22, 24, 35, 0.75)",
            display: "flex",
            borderRadius: "12px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              fontSize: "14px",
              flex: 1,
              whiteSpace: "nowrap",
              padding: "7px 0 5px 12px",
              backgroundColor: "rgba(22, 24, 35, 0.06)",
            }}
          >
            {window.location.href.length < 59
              ? window.location.href
              : window.location.href.slice(0, 56) + "..."}
          </Box>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            sx={{
              backgroundColor: "rgba(22, 24, 35, 0.06)",
              color: "#161823",
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            Copy link
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          padding: "24px 32px",
          backgroundColor: "rgb(248, 248, 248)",
          borderTop: "1px solid rgba(22, 24, 35, 0.2)",
          borderBottom: "1px solid rgba(22, 24, 35, 0.2)",
          overflowY: "overlay",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {listCommentVideo.length > 0 ? (
          listCommentVideo.map((item) => (
            <Box
              sx={{
                display: "flex",
                ".icon-menu": {
                  opacity: 0,
                },
                "&:hover .icon-menu": {
                  opacity: 1,
                },
              }}
              key={item.id}
            >
              <Avatar
                src={renderAvatarImage(item.user.avatar)}
                sx={{ width: "40px", height: "40px", marginRight: "12px" }}
              ></Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontWeight: 700,
                    lineHeight: "25px",
                  }}
                >
                  {renderName(
                    item.user.first_name,
                    item.user.last_name,
                    item.user.nickname
                  )}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "16px",
                    lineHeight: "22px",
                    marginBottom: "8px",
                  }}
                >
                  {item.comment}
                </Typography>
                <Typography
                  sx={{
                    lineHeight: "18px",
                    fontSize: "14px",
                    color: "rgba(22, 24, 35, 0.5)",
                  }}
                >
                  8hours
                </Typography>
              </Box>
              <Box
                sx={{
                  marginLeft: "18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "rgba(22, 24, 35, 0.5)",
                  paddingTop: item.user.id === loggedInUserId ? 0 : "24px",
                  button: {
                    padding: 0,
                  },
                  fontSize: "12px",
                  svg: {
                    width: "24px",
                    height: "24px",
                  },
                }}
              >
                {item.user.id === loggedInUserId && (
                  <Box
                    className="icon-menu"
                    sx={{
                      position: "relative",
                      height: "24px",
                      ".triangle": {
                        position: "absolute",
                        right: "0",
                        top: "8px",
                      },
                      "&:hover .overlay": {
                        display: "block",
                      },
                      ".overlay": {
                        display: "none",
                      },
                    }}
                  >
                    <IconMenuDot />
                    <IconTriangle />
                    <Box
                      onClick={() => {
                        setIdDel(item.id);
                        setShowModal(true);
                      }}
                      className="overlay"
                      sx={{
                        zIndex: 2,
                        top: "calc(100% - 6px)",
                        position: "absolute",
                        bgcolor: "rgb(255, 255, 255)",
                        borderRadius: "8px",
                        minWidth: "200px",
                        boxShadow: "rgb(0 0 0 / 12%) 0px 4px 16px",
                        padding: "8px 16px",
                        fontWeight: 700,
                        fontSize: "16px",
                        right: "-6px",
                        color: "#161823",
                        "&:hover": {
                          color: "rgb(254, 44, 85)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          padding: "12px 0",
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                        }}
                      >
                        <IconDelete />
                        Delete
                      </Box>
                    </Box>
                  </Box>
                )}
                <ButtonLikeComment comment={item}></ButtonLikeComment>
              </Box>
            </Box>
          ))
        ) : (
          <Box
            sx={{
              fontSize: "14px",
              color: "rgba(22, 24, 35, 0.5)",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Be the first to comment!
          </Box>
        )}
      </Box>
      <InputComment handleComment={handleComment} />
      <Dialog
        open={showModal}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          fontSize: "24px",
          fontWeight: 700,
          padding: "28px 24px",
          textAlign: "center",
        }}
      >
        <DialogContent
          sx={{
            width: "310px",
            boxShadow: 24,
            borderRadius: "8px",
            bgcolor: "background.paper",
            padding: 0,
            button: {
              width: "100%",
              bgcolor: "inherit",
              height: "47px",
              borderTop: "1px solid rgba(22, 24, 35, 0.12)",
              fontSize: "14px",
              color: "rgba(22, 24, 35, 0.5)",
              fontWeight: 600,
              "&:first-of-type": {
                color: "#161823",
              },
            },
          }}
        >
          <Box sx={{ padding: "28px 24px" }}>
            Are you sure you want to delete this comment?
          </Box>
          <button
            onClick={() => {
              handleDeleteComment(idDel);
              console.log(idDel);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </DialogContent>
      </Dialog>
    </BoxWrapper>
  );
};

export default BoxFeature;
