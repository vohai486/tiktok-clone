import { ShopTwoOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  MenuItem,
  Select,
  styled,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import videoApi from "../../../api/videoApi";
import PreviewVideo from "../components/PreviewVideo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 44,
  height: 24,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    marginLeft: 1,

    marginTop: 1,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

var snapshots = [];
const UploadPage = () => {
  const theme = useTheme();
  const loggedInUser = useSelector((state) => state.user.current);
  const navigate = useNavigate();
  const [personName, setPersonName] = React.useState("public");
  const [videoFile, setVideoFile] = useState("");
  const [caption, setCaption] = useState("");
  const handleChange = (event) => {
    console.log(event.target.value);
    setPersonName(event.target.value);
  };
  function capture(video, scaleFactor) {
    if (scaleFactor == null) {
      scaleFactor = 1;
    }
    var w = 84;
    var h = 150;
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, w, h);
    return canvas;
  }
  function shoot() {
    var video = document.getElementById("my-video");
    var output = document.getElementById("output");
    var canvas = capture(video, 0.24);
    canvas.onclick = function (e) {
      window.open(e.target.toDataURL("image/jpeg"));
    };
    snapshots.unshift(canvas);
    output.innerHTML = "";
    for (var i = 0; i < 4; i++) {
      output.appendChild(snapshots[i]);
    }
  }
  const handleUpload = async () => {
    if (!videoFile) return;
    try {
      const res = await videoApi.createVideo(
        caption,
        videoFile,
        1,
        "Hello",
        "public",
        "comment"
      );
      toast.success("Video upload success");
      navigate(`/@${loggedInUser?.nickname}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      sx={{
        marginTop: "60px",
        padding: "15px 0",
        backgroundColor: "rgb(248, 248, 248)",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          borderRadius: "10px",
          margin: "0 auto",
          width: "1100px",
          padding: "40px 56px",
          backgroundColor: "rgb(255, 255, 255)",
          boxShadow: "rgb(0 0 0 / 6%) 0px 2px 8px",
          [theme.breakpoints.down(1130)]: {
            textAlign: "center",
            width: "100%",
            padding: "1rem",
          },
        }}
      >
        <Typography
          component={"h2"}
          sx={{
            fontSize: "24px",
            fontWeight: 700,
          }}
        >
          Upload Video
        </Typography>
        <Typography
          sx={{
            color: "rgba(22,24,35,0.5)",
            fontSize: "18px",
            marginTop: "5px",
          }}
        >
          Post a video to your account
        </Typography>
        <Box
          sx={{
            display: "flex",
            margin: "24px 0 130px",
            [theme.breakpoints.down(1130)]: {
              flexDirection: "column",
              alignItems: "center",
            },
          }}
        >
          <Box sx={{ marginTop: "24px" }}>
            <PreviewVideo setVideoFile={setVideoFile} videoFile={videoFile} />
          </Box>
          <Box
            sx={{
              marginLeft: "24px",
              [theme.breakpoints.down(1130)]: {
                marginTop: "1rem",
                marginLeft: 0,
              },
              flex: 1,
              h2: {
                fontWeight: 600,
                marginBottom: "5px",
              },
              ".input-caption": {
                width: "100%",
              },
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography component={"h2"}>Caption</Typography>
                <Typography
                  sx={{ fontSize: "13px", color: "rgba(22, 24, 35, 0.5)" }}
                >
                  0 / 150
                </Typography>
              </Box>
              <Box
                className="input-caption"
                sx={{
                  width: "100%",
                  height: "46px",
                  padding: "0 80px 0 16px",
                  border: "1px solid rgba(22, 24, 35, 0.12)",
                  borderRadius: "5px",
                  input: {
                    fontSize: "15px",
                    height: "100%",
                    padding: "12px 0",
                    background: "transparent",
                    border: "none",
                    width: "100%",
                  },
                }}
              >
                <input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                ></input>
              </Box>
            </Box>
            <Box sx={{ marginTop: "24px" }}>
              <Typography component={"h2"}>Cover</Typography>
              <Box
                sx={{
                  padding: "6px",
                  border: "1px solid rgba(22, 24, 35, 0.12)",
                  borderRadius: "2px",
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <Box id="output" sx={{ display: "flex", borderRadius: "2px" }}>
                  <Box
                    sx={{
                      backgroundColor: "rgba(22, 24, 35, 0.03)",
                      width: "84px",
                      height: "150px",
                    }}
                  ></Box>
                </Box>
                <Button
                  sx={{
                    color: "#fff",
                    width: "150px",
                    height: "45px",
                    border: "1px solid rgba(254,44,85,1)",
                    background: "rgba(254,44,85,1)",
                    "&:hover": {
                      background: "rgba(234,40,78,1)",
                    },
                  }}
                  onClick={() => shoot()}
                >
                  Capture
                </Button>
              </Box>
            </Box>
            <Box sx={{ marginTop: "24px" }}>
              <Typography component={"h2"}>Who can watch this video</Typography>
              <Box>
                <Select
                  sx={{
                    width: "50%",
                    height: "40px",
                    ".MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(22, 24, 35, 0.12)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(22, 24, 35, 0.12)",
                      borderWidth: "1px !important",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(22, 24, 35, 0.12)",
                    },
                  }}
                  value={personName}
                  onChange={handleChange}
                >
                  <MenuItem value="public">Public</MenuItem>
                  <MenuItem value="friends">Friends</MenuItem>
                  <MenuItem value="private">Private</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box sx={{ marginTop: "24px" }}>
              <Typography component={"h2"}>Allow users to:</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Checkbox
                    defaultChecked
                    id="comment"
                    sx={{
                      input: {
                        border: "1px solid rgba(22,24,35,0.12)",
                      },
                      padding: 0,
                      "&.Mui-checked": {
                        color: "rgba(254,44,85,1)",
                      },
                    }}
                  />
                  <label htmlFor="comment">Comment</label>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Checkbox
                    defaultChecked
                    id="duet"
                    sx={{
                      input: {
                        border: "1px solid rgba(22,24,35,0.12)",
                      },
                      padding: 0,
                      "&.Mui-checked": {
                        color: "rgba(254,44,85,1)",
                      },
                    }}
                  />
                  <label htmlFor="comment">Duet</label>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <Checkbox
                    defaultChecked
                    id="stitch"
                    sx={{
                      input: {
                        border: "1px solid rgba(22,24,35,0.12)",
                      },
                      padding: 0,
                      "&.Mui-checked": {
                        color: "rgba(254,44,85,1)",
                      },
                    }}
                  />
                  <label htmlFor="stitch">Stitch</label>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                marginTop: "24px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <Typography component={"h2"} sx={{ marginBottom: 0 }}>
                Run a copyright check
              </Typography>
              <Box>
                <IOSSwitch sx={{ marginBottom: "5px" }} defaultChecked />
              </Box>
            </Box>
            <Typography sx={{ color: "rgba(0,0,0,.6)", fontSize: "12px" }}>
              We'll check your video for potential copyright infringements on
              used sounds. If infringements are found, you can edit the video
              before posting.{" "}
              <Box component={"span"} sx={{ color: "#161823" }}>
                Learn more
              </Box>
            </Typography>
            <Box
              sx={{
                marginTop: "24px",
                display: "flex",
                gap: "24px",
                button: {
                  height: "48px",
                  width: "164px",
                  fontWeight: 600,
                  [theme.breakpoints.down(500)]: {
                    width: "100%",
                  },
                },
              }}
            >
              <Button
                sx={{
                  background: "rgba(255,255,255,1)",
                  border: "1px solid rgba(22,24,35,0.12)",
                  color: "#161823",
                  "&:hover": {
                    background: "rgba(245,245,245,1)",
                  },
                }}
              >
                Discard
              </Button>
              <Button
                sx={{
                  background: "rgba(254,44,85,1)",
                  border: "1px solid rgba(254,44,85,1)",
                  color: "rgba(255,255,255,1)",
                  "&:hover": {
                    background: "rgba(234,40,78,1)",
                  },
                  ":disabled": {
                    backgroundColor: "rgba(235,235,235,1)",
                    color: "#161823",
                  },
                }}
                onClick={() => handleUpload()}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadPage;
