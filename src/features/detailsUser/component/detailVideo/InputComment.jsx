import { Box } from "@mui/material";
import React, { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import videoApi from "../../../../api/videoApi";
import { IconEmoji, IconSign } from "../../../../components/Icons";
import { useShowModal } from "../../../../context/showModalContext";

const InputComment = ({ handleComment }) => {
  const inputRef = useRef();
  const loggedInUser = useSelector((state) => state.user.current);
  const loggedInUserId = loggedInUser.id;
  const { showModal, setShowModal } = useShowModal();
  const form = useForm({
    defaultValues: {
      comment: "",
    },
  });
  const onSubmit = async (values) => {
    if (!handleComment || inputRef.current.value === "") return;
    await handleComment(values);
    form.reset({
      comment: "",
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: "rgb(255, 255, 255)",
        padding: "21px 30px",
      }}
    >
      <Box
        onSubmit={form.handleSubmit(onSubmit)}
        component={"form"}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          button: {
            width: "48px",
            color: "rgb(254, 44, 85)",
            background: "none",
          },
        }}
      >
        <Box
          sx={{
            padding: "0 10px",
            position: "relative",
            backgroundColor: "rgba(22, 24, 35, 0.06)",
            display: "flex",
            borderRadius: "8px",
            overflow: "hidden",
            height: "38px",
            flex: 1,

            input: {
              caretColor: "rgba(254, 44, 85, 1)",
              background: "transparent",
              flex: 1,
            },
            svg: {
              width: "22px",
              height: "22px",
              color: "#161823",
            },
          }}
        >
          <Controller
            name={"comment"}
            control={form.control}
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                ref={inputRef}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                type="text"
                placeholder="Add comment..."
                onClick={() => {
                  if (!loggedInUserId) {
                    setShowModal(true);
                    return;
                  }
                }}
              ></input>
            )}
          ></Controller>

          <Box
            sx={{
              width: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconSign />
          </Box>
          <Box
            sx={{
              width: "32px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconEmoji />
          </Box>
        </Box>
        <button type="submit">Post</button>
      </Box>
    </Box>
  );
};

export default InputComment;
