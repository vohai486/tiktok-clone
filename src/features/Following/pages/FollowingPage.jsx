import { Box, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import userApi from "../../../api/userApi";
import LoadingTiktok from "../../../components/loading/LoadingTiktok";
import VideoCard from "../components/VideoCard";

const FollowingPage = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingFirst, setLoadingFirst] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await userApi.getSuggestedUser({ page: page, per_page: 15 });
      setUsers((users) => [...users, ...res.data]);
      setLoadingFirst(false);
      setLoading(false);
    })();
  }, [page]);
  useEffect(() => {
    const handleScroll = () => {
      if (page >= 2) return;
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage(page + 1);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [page]);
  const theme = useTheme();
  const isBreakpointDown550 = useMediaQuery(theme.breakpoints.down(550));
  return (
    <Box
      sx={{
        width: "720px",
        maxWidth: "720px",
        padding: isBreakpointDown550 ? "24px 48px" : "24px 12px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
          color: "#fff",
        }}
      >
        {loadingFirst
          ? Array.from(new Array(10)).map((item, index) => (
              <Skeleton
                sx={{
                  transform: "unset",
                  width: "100%",
                  height: "300px",
                  borderRadius: "8px",
                }}
                key={index}
              ></Skeleton>
            ))
          : users.length > 0 &&
            users.map((item) => (
              <VideoCard
                key={`${item.id}${item.nickname}`}
                user={item}
              ></VideoCard>
            ))}
      </Box>
      {loading && (
        <Box
          sx={{
            margin: "50px 0",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <LoadingTiktok />
        </Box>
      )}
    </Box>
  );
};

export default FollowingPage;
