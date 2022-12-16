import { Box } from "@mui/material";
import React from "react";
import "./index.scss";
const LoadingPage = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className="tiktok-loader"></span>
    </Box>
  );
};

export default LoadingPage;
