import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Skeleton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import videoApi from "../../../../api/videoApi";
import {
  IconCode,
  IconComment,
  IconDelete,
  IconFacebook,
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
  sliceString,
} from "../../../../constants/defaultUrlImage";
import { useShowModal } from "../../../../context/showModalContext";
import ButtonFollowing from "../../../button/ButtonFollowing";
import ButtonLikeComment from "../../../button/ButtonLikeComment";
import ButtonLikeVideo from "../../../button/ButtonLikeVideo";
import InputComment from "./InputComment";

const BoxWrapper = styled(Box)(({ theme }) => ({
  maxWidth: "544px",
  paddingTop: "32px",
  display: "flex",
  background: "#fff",
  flexDirection: "column",
  [theme.breakpoints.down(1000)]: {
    paddingTop: "10px",
    borderRadius: "8px",
    width: "400px",
    height: "600px",
    position: "absolute",
    bottom: "5px",
    left: "50%",
    transform: "translateX(-50%)",
  },
}));
const BoxInfo = styled(Box)({
  padding: "22px 32px 15px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
});
const ButtonComment = styled(IconButton)({
  position: "absolute",
  top: "30%",
  right: "20px",
  height: "50px",
  width: "50px",
  background: "rgba(255, 255, 255, 0.12)",
  color: "#fff",
  svg: {
    width: "25px",
    height: "25px",
  },
  "&:hover": {
    background: "rgba(255, 255, 255, 0.3)",
  },
});
const BoxFeature = ({ video, loading }) => {
  const theme = useTheme();
  const isBreakpointDown1000 = useMediaQuery(theme.breakpoints.down(1000));
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.current);
  const loggedInUserId = loggedInUser.id;
  const [countComment, setCountComment] = useState(0);
  const [listCommentVideo, setListCommentVideo] = useState([]);
  const [showModalDel, setShowModalDel] = useState(false);
  const [idDel, setIdDel] = useState("");
  const [showComment, setShowComment] = useState(
    isBreakpointDown1000 ? false : true
  );
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
      setShowModalDel(false);
    } catch (err) {}
  };
  return (
    <>
      {showComment && (
        <BoxWrapper>
          <BoxInfo>
            {loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                sx={{ width: "40px", height: "40px" }}
              ></Skeleton>
            ) : (
              <Avatar
                sx={{ width: "40px", height: "40px" }}
                src={renderAvatarImage(video?.user?.avatar)}
                onClick={() => navigate(`/@${video?.user?.nickname}`)}
              />
            )}

            <Box
              className="pointer"
              sx={{ display: "flex", flexDirection: "column", flex: 1 }}
              onClick={() => navigate(`/@${video?.user?.nickname}`)}
            >
              {loading ? (
                <Skeleton
                  animation="wave"
                  sx={{
                    height: "30px",
                    width: "150px",
                  }}
                ></Skeleton>
              ) : (
                <Typography
                  sx={{ fontSize: "18px", fontWeight: 700, lineHeight: "25px" }}
                >
                  {video?.user?.nickname} {video?.user?.tick && <IconTick />}
                </Typography>
              )}
              <Box
                sx={{
                  fontSize: "14px",
                  span: {
                    lineHeight: "20px",
                  },
                }}
              >
                {loading ? (
                  <Skeleton
                    animation="wave"
                    sx={{
                      height: "20px",
                      width: "80px",
                    }}
                  ></Skeleton>
                ) : (
                  <>
                    <Typography component="span">
                      {renderName(
                        video?.user?.first_name,
                        video?.user?.last_name,
                        video?.user?.first_name
                      )}
                    </Typography>
                    <Typography component="span">·</Typography>{" "}
                    <Typography component="span">2ago</Typography>
                  </>
                )}
              </Box>
            </Box>
            {loading ? (
              <Skeleton
                animation="wave"
                sx={{
                  height: "40px",
                  width: "100px",
                }}
              ></Skeleton>
            ) : (
              <ButtonFollowing
                id={video?.user?.id}
                isFollow={!!video?.user?.is_followed}
                width="106px"
              />
            )}
          </BoxInfo>

          <Box sx={{ padding: "0 32px" }}>
            <Typography>
              {loading ? (
                <Skeleton
                  animation="wave"
                  sx={{
                    height: "20px",
                    width: "300px",
                  }}
                ></Skeleton>
              ) : (
                video?.description + " " + `#${video?.user?.nickname}`
              )}
            </Typography>
            {loading ? (
              <Skeleton
                animation="wave"
                sx={{
                  height: "20px",
                  width: "90px",
                }}
              ></Skeleton>
            ) : (
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
                  {video?.music?.length === 0
                    ? video?.user?.nickname
                    : video?.music}
                </Typography>
              </Box>
            )}
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
              {loading ? (
                <>
                  <Skeleton
                    animation="wave"
                    sx={{
                      height: "40px",
                      width: "50px",
                    }}
                  ></Skeleton>
                  <Skeleton
                    animation="wave"
                    sx={{
                      height: "40px",
                      width: "150px",
                    }}
                  ></Skeleton>
                </>
              ) : (
                <>
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
                </>
              )}
            </Box>
            {loading ? (
              <Skeleton
                animation="wave"
                sx={{
                  height: "50px",
                  width: "450px",
                }}
              ></Skeleton>
            ) : (
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
                  {isBreakpointDown1000
                    ? sliceString(window.location.href, 35)
                    : sliceString(window.location.href, 57)}
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
            )}
          </Box>
          {loading ? (
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
              {Array.from(new Array(6))
                .fill("")
                .map((item, index) => (
                  <Skeleton
                    key={index}
                    animation="wave"
                    sx={{
                      height: "80px",
                      width: "450px",
                    }}
                  ></Skeleton>
                ))}
            </Box>
          ) : (
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
                      sx={{
                        width: "40px",
                        height: "40px",
                        marginRight: "12px",
                      }}
                      onClick={() => navigate(`/@${item.user.nickname}`)}
                    ></Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "18px",
                          fontWeight: 700,
                          lineHeight: "25px",
                        }}
                        onClick={() => navigate(`/@${item.user.nickname}`)}
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
                        paddingTop:
                          item.user.id === loggedInUserId ? 0 : "24px",
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
                              setShowModalDel(true);
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
          )}

          {loading ? (
            <Skeleton
              animation="wave"
              sx={{
                transform: "unset",
                height: "60px",
                width: "100%",
              }}
            ></Skeleton>
          ) : (
            <InputComment handleComment={handleComment} />
          )}
          <Dialog
            open={showModalDel}
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
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowModalDel(false);
                }}
              >
                Cancel
              </button>
            </DialogContent>
          </Dialog>
        </BoxWrapper>
      )}

      {isBreakpointDown1000 && (
        <ButtonComment
          onClick={() => {
            if (!loggedInUserId) {
              setShowModal(true);
              return;
            }
            setShowComment((prev) => !prev);
          }}
        >
          <IconComment />
        </ButtonComment>
      )}
    </>
  );
};

export default BoxFeature;
