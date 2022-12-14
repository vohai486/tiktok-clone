import {
  Avatar,
  Box,
  Skeleton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../../api/userApi";
import {
  renderAvatarImage,
  renderName,
} from "../../../constants/defaultUrlImage";
import { IconTick } from "../../Icons";
const BoxAccount = styled(Box)(({ theme }) => ({
  borderTop: "1px solid rgba(22, 24, 35, .12)",
  padding: "15px 0 16px",
  color: "rgba(22, 24, 35, .75)",
  fontWeight: 600,
  fontSize: "14px",
  h2: {
    fontWeight: 500,
    fontSize: "14px",
    padding: "0 8px",
    lineHeight: "20px",
    marginBottom: "8px",
  },
  ".item": {
    padding: "8px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "8px",
    ".item-name": {
      height: "32px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      p: { padding: 0 },
      "p:first-of-type": {
        fontWeight: 600,
        lineHeight: "22px",
        position: "relative",
        svg: {
          position: "absolute",
          marginLeft: "4px",
        },
      },
      "p:last-of-type": {
        fontSize: "12px",
        color: "rgba(22, 24, 35, 0.5)",
        fontWeight: 400,
        lineHeight: "15px",
      },
    },
  },
}));
const SuggestedAccount = () => {
  const [loading, setLoading] = useState(true);
  const [listSuggested, setListSuggested] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const res = await userApi.getSuggestedUser({ page: 1, per_page: 20 });
        setLoading(false);
        setListSuggested(res.data);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);
  const theme = useTheme();
  const isBreakpointDown1080 = useMediaQuery(theme.breakpoints.down(1080));
  return (
    <BoxAccount>
      {!isBreakpointDown1080 && (
        <Typography component="h2">Suggested accounts</Typography>
      )}
      {loading
        ? Array.from(new Array(5))
            .fill("")
            .map((item, index) => (
              <Box className="item" key={index}>
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={32}
                  height={32}
                />
                {!isBreakpointDown1080 && (
                  <Box className="item-name">
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{ fontSize: "16px", width: "120px" }}
                    />
                    <Skeleton
                      animation="wave"
                      variant="text"
                      sx={{ fontSize: "12px", width: "50px" }}
                    />
                  </Box>
                )}
              </Box>
            ))
        : (seeMore ? listSuggested : listSuggested.slice(0, 5)).map((item) => (
            <Box
              className="item"
              key={item.id}
              onClick={() => navigate(`/@${item.nickname}`)}
            >
              <Avatar
                src={renderAvatarImage(item.avatar)}
                sx={{ width: "32px", height: "32px" }}
              />
              {!isBreakpointDown1080 && (
                <Box className="item-name">
                  <Typography>
                    {item.nickname}
                    {item.tick && <IconTick />}
                  </Typography>
                  <Typography>
                    {renderName(item.first_name, item.last_name, item.nickname)}
                  </Typography>
                </Box>
              )}
            </Box>
          ))}
      {!isBreakpointDown1080 && (
        <Box
          sx={{
            padding: "0px 8px",
            fontSize: "14px",
            color: "rgb(254, 44, 85)",
            fontWeight: 500,
            marginTop: "8px",
            cursor: "pointer",
          }}
          onClick={() => setSeeMore(!seeMore)}
        >
          {seeMore ? "See less" : "See all"}
        </Box>
      )}
    </BoxAccount>
  );
};

export default SuggestedAccount;
