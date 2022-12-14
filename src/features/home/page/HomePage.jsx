import {
  Box,
  Button,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import videoApi from "../../../api/videoApi";
import LoadingTiktok from "../../../components/loading/LoadingTiktok";
import Video from "../components/Video";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingFirst, setLoadingFirst] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await videoApi.getListVideo({
          type: "for-you",
          page: page,
        });
        setVideos([...videos, ...res.data]);
        setLoading(false);
      } catch (error) {}
      setLoadingFirst(false);
    })();
  }, [page]);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage((page) => page + 1);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    document.title = "Tiktok - Make Your Day";
  }, []);
  const theme = useTheme();
  const isBreakpointDown585 = useMediaQuery(theme.breakpoints.down(585));
  const isBreakpointDown470 = useMediaQuery(theme.breakpoints.down(470));
  return (
    <Box
      sx={{
        maxWidth: "692px",
        width: "692px",
        padding: "24px 0",
        position: "relative",
        margin: "0 16px",
        overflow: "hidden",
      }}
    >
      {loadingFirst ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "20px 0",
            width: "100%",
            position: "relative",
          }}
        >
          <Skeleton variant="circular" sx={{ width: "56px", height: "56px" }} />
          <Box
            sx={{
              marginLeft: "12px",

              maxWidth: "624px",
            }}
          >
            <Skeleton
              sx={{
                width: !isBreakpointDown585 ? "150px" : "100px",
                marginBottom: "-5px",
              }}
              animation="wave"
            />
            <Skeleton
              sx={{
                width: !isBreakpointDown585 ? "150px" : "80px",
                marginBottom: "-5px",
              }}
              animation="wave"
            />
            {Array.from(new Array(2))
              .fill("")
              .map((item, index) => (
                <Skeleton
                  key={index}
                  sx={{
                    width: !isBreakpointDown585
                      ? "400px"
                      : "300px"
                      ? !isBreakpointDown470
                        ? "250px"
                        : "200px"
                      : "",
                    marginBottom: "-5px",
                  }}
                  animation="wave"
                />
              ))}
          </Box>
        </Box>
      ) : (
        <Box>
          {videos.length > 0 &&
            videos.map((item) => <Video key={item.uuid} video={item} />)}
        </Box>
      )}
      {!loading && (
        <Box
          sx={{
            height: "80px",
            width: "100%",
            bottom: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingTiktok />
        </Box>
      )}
    </Box>
  );
};

export default HomePage;
