import { yupResolver } from "@hookform/resolvers/yup";
import { Close } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  IconButton,
  styled,
  Typography,
  Zoom,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import userApi from "../../api/userApi";
import { renderAvatarImage, renderName } from "../../constants/defaultUrlImage";
import { userInfo } from "../../redux/user/userSlice";
import InputEdit from "../form-controls/InputEdit";
import TextareaEdit from "../form-controls/TextareaEdit.jsx";
import { IconWrite } from "../Icons";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Zoom timeout={500} ref={ref} {...props} />;
});
const ModalStyled = styled(DialogContent)(({ theme }) => ({
  width: "700px",
  padding: 0,
  [theme.breakpoints.down(768)]: {
    width: "500px",
  },
  [theme.breakpoints.down(520)]: {
    width: "400px",
  },
  [theme.breakpoints.down(425)]: {
    width: "350px",
  },
}));
const BoxHeader = styled(Box)(({ theme }) => ({
  padding: "24px 24px 12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
const BoxBody = styled(Box)(({ theme }) => ({
  padding: "8px 24px 0",
  borderTop: "0.5px solid rgba(22, 24, 35, 0.2)",
  borderBottom: "0.5px solid rgba(22, 24, 35, 0.2)",
  ".modal-form": {
    padding: "16px 0",
    display: "flex",
    borderBottom: "0.5px solid rgba(22, 24, 35, 0.12)",
    gap: "24px",
    [theme.breakpoints.down(520)]: {
      flexDirection: "column",
    },
    fontWeight: 600,
    ".modal-label": {
      width: "120px",
    },
    ".modal-content": {
      width: "360px",
      [theme.breakpoints.down(520)]: {
        width: "100%",
      },
      "textarea, input": {
        width: "100%",
        fontSize: "16px",
        height: "38px",
        background: "rgba(22, 24, 35, 0.06)",
        caretColor: "rgb(254, 44, 85)",
        padding: "7px 12px",
        color: "#161823",
        borderRadius: "4px",
        "&:focus": {
          border: "1.5px solid rgba(22, 24, 35, 0.2)",
        },
      },
      textarea: {
        resize: "none",
        height: "100px",
      },
      ".modal-text": {
        fontSize: "12px",
        color: "rgba(22, 24, 35, 0.75)",
        marginTop: "8px",
      },
    },
    "&:last-of-type": {
      border: "none",
    },
  },
}));
const BoxAvatar = styled(Box)(({ theme }) => ({
  position: "relative",
  ".MuiAvatar-root": {
    width: "96px",
    height: "96px",
    marginLeft: "128px",
    position: "unset",
    [theme.breakpoints.down(520)]: {
      margin: "auto",
    },
  },
  ".modal-write": {
    position: "absolute",
    width: "32px",
    height: "32px",
    border: "1px solid rgb(208, 208, 211)",
    borderRadius: "50%",
    lineHeight: "32px",
    background: "rgb(255, 255, 255)",
    textAlign: "center",
    bottom: 0,
    right: 0,
    svg: {
      color: "#161823",
    },
  },
}));
const BoxFooter = styled(Box)(({ theme }) => ({
  height: "86px",
  padding: "0 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "16px",
  button: {
    width: "96px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: 500,
    borderRadius: "4px",
    "&:first-of-type": {
      border: "1px solid rgba(22, 24, 35, 0.12)",
    },
    "&:last-of-type": {
      color: "#fff",
      background: "rgb(254, 44, 85)",
      border: "none",
      "&:disabled,  &[disabled]": {
        border: "none",
        color: "rgba(22, 24, 35, 0.34)",
        backgroundColor: "rgba(22, 24, 35, 0.06)",
        pointerEvents: "none",
      },
    },
  },
}));
const ModalEdit = ({ open, setOpen, getUser }) => {
  const inputRef = useRef(null);
  const [image, setImage] = useState("");
  const [fileImage, setFileImage] = useState("");
  const ditpatch = useDispatch();
  const schema = yup
    .object({
      username: yup
        .string()
        .min(2, "Include at least 2 characters in your username"),
      first_name: yup
        .string()
        .min(2, "Include at least 2 characters in your first name"),
      last_name: yup
        .string()
        .min(2, "Include at least 2 characters in your last name"),
      bio: yup.string().required("Please enter your bio"),
    })
    .required();
  const user = useSelector((state) => state.user.current);
  const form = useForm({
    defaultValues: {
      bio: user.bio,
      username: user.nickname,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    resolver: yupResolver(schema),
  });

  const handleEidt = async (values) => {
    try {
      const res = await userApi.updateCurrentUser(
        values.first_name,
        values.last_name,
        values.bio,
        fileImage || ""
      );
      getUser(user.nickname, true);
      setOpen(false);
    } catch (error) {}
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      disableEscapeKeyDown={true}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="lg"
      sx={{
        ".MuiPaper-root": {
          margin: 0,
        },
      }}
    >
      <ModalStyled>
        <BoxHeader>
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            Edit profile
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close sx={{ width: "24px", height: "24px" }} />
          </IconButton>
        </BoxHeader>
        <BoxBody component={"form"} onSubmit={form.handleSubmit(handleEidt)}>
          <Box className="modal-form">
            <Box className="modal-label">Profile photo</Box>
            <BoxAvatar onClick={() => inputRef.current.click()}>
              <input
                onChange={(e) => {
                  console.log(e.target.files[0]);

                  setImage(e.target.files[0]);
                  setFileImage(e.target.files[0]);
                }}
                name="avatar"
                ref={inputRef}
                type={"file"}
                style={{ display: "none" }}
              ></input>
              <Avatar
                src={
                  (fileImage && URL.createObjectURL(fileImage)) ||
                  renderAvatarImage(user.avatar)
                }
              ></Avatar>
              <Box className="modal-write">
                <IconWrite />
              </Box>
            </BoxAvatar>
          </Box>
          <Box className="modal-form">
            <Box className="modal-label">Username</Box>
            <Box className="modal-content">
              <Box sx={{ marginBottom: "16px" }}>
                <InputEdit form={form} name="username" disabled />
              </Box>
              <Typography className="modal-text">
                {window.location.href}
              </Typography>
              <Typography className="modal-text">
                Usernames can only contain letters, numbers, underscores, and
                periods. Changing your username will also change your profile
                link.
              </Typography>
            </Box>
          </Box>
          <Box className="modal-form">
            <Box className="modal-label">FirstName</Box>
            <Box className="modal-content">
              <Box sx={{ marginBottom: "16px" }}>
                <InputEdit form={form} name="first_name" />
              </Box>
              <Typography className="modal-text"></Typography>
            </Box>
          </Box>
          <Box className="modal-form">
            <Box className="modal-label">LastName</Box>
            <Box className="modal-content">
              <InputEdit form={form} name="last_name" />
              <Typography className="modal-text"></Typography>
            </Box>
          </Box>
          <Box className="modal-form">
            <Box className="modal-label">Bio</Box>
            <Box className="modal-content">
              <TextareaEdit placeholder="Bio" form={form} name="bio" />
              <Typography className="modal-text">0/80</Typography>
            </Box>
          </Box>
          <BoxFooter>
            <button onClick={() => setOpen(false)}>Cancel</button>
            <button disabled={!form.formState.isValid} type="submit">
              Save
            </button>
          </BoxFooter>
        </BoxBody>
      </ModalStyled>
    </Dialog>
  );
};

export default ModalEdit;
