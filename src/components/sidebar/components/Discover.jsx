import { Box, styled, Typography } from "@mui/material";
import React from "react";
import { IconHashTag, IconMusic } from "../../Icons";
const BoxDiscover = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down(1080)]: {
    display: "none",
  },
  padding: "15px 8px 16px",
  borderTop: "1px solid rgba(22, 24, 35, .12)",
  fontSize: "14px",
  color: "rgba(22, 24, 35, 0.75)",
  cursor: "pointer",
  h3: {
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "22px",
    marginBottom: "16px",
  },
  ".side-hashtag": {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px 12px",
    ".hashtag-item": {
      display: "flex",
      height: "24px",
      padding: "3px 10px",
      borderRadius: "12px",
      border: "1px solid rgba(22, 24, 35, 0.2)",
      transition: "background 200ms ease-in-out 0s",
      gap: "6px",
      lineHeight: "18px",
      alignItems: "center",
      svg: {
        color: "#212121",
      },
      "&:hover": {
        backgroundColor: "rgba(22, 24, 35, 0.03)",
      },
    },
  },
}));

const LIST_HASHTAG = [
  {
    title: "Messi",
    mode: "hashtagText",
  },
  {
    title: "argentina",
    mode: "hashtagText",
  },
  {
    title: "WC2022",
    mode: "hashtagText",
  },
  {
    title: "suthatla",
    mode: "hashtagText",
  },
  {
    title: "mackedoi",
    mode: "hashtagText",
  },
  {
    title: "sansangthaydoi",
    mode: "hashtagText",
  },
  {
    title: "ancungtiktok",
    mode: "hashtagText",
  },

  { title: "Em của ngày hôm qua - Sơn Tùng", mode: "hashtagMusic" },
  {
    title: "Waka Waka (This Time for Africa) - Shakira",
    mode: "hashtagMusic",
  },
  { title: "La La La (Brazil 2014) - Shakira", mode: "hashtagMusic" },

  {
    title: "photography",
    mode: "hashtagText",
  },
  {
    title: "TiktokDanceVN",
    mode: "hashtagText",
  },
  { title: "Đời tôi cô đơn - Đàm Vĩnh Hưng", mode: "hashtagMusic" },
  { title: "Thương về Miền Trung - Quang Lê", mode: "hashtagMusic" },
];
const MODE_DISCOVER = {
  TEXT: "hashtagText",
  MUSIC: "hashtagMusic",
};
const Discover = ({ type = "" }) => {
  return (
    <BoxDiscover>
      <Typography component={"h3"} sx={{ fontSize: "14px" }}>
        Discover
      </Typography>
      <Box className="side-hashtag">
        {LIST_HASHTAG.map((item) => (
          <Box className="hashtag-item" key={item.title}>
            {item.mode === MODE_DISCOVER.TEXT ? <IconHashTag /> : <IconMusic />}
            {type === ""
              ? item.title
              : item.title.length < 20
              ? item.title
              : item.title.slice(0, 20) + "..."}
          </Box>
        ))}
      </Box>
    </BoxDiscover>
  );
};

export default Discover;
