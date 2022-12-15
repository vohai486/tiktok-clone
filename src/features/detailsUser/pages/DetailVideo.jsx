import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import videoApi from "../../../api/videoApi";
import BoxFeature from "../component/detailVideo/BoxFeature";
import BoxVideo from "../component/detailVideo/BoxVideo";

const BoxContainer = styled(Box)({
  position: "fixed",
  inset: 0,
  zIndex: 1000,
  display: "flex",
});

const DetailVideo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [video, setVideo] = useState({});

  const videos = useSelector((state) => state.user.videos);
  useEffect(() => {
    (async () => {
      try {
        const res = await videoApi.getVideo(searchParams?.get("q"));
        setVideo(res.data);
      } catch (error) {
        navigate("/notfound");
      }
    })();
  }, [location.search]);

  return (
    <BoxContainer>
      <BoxVideo video={video} />
      <BoxFeature video={video} />
    </BoxContainer>
  );
};

export default DetailVideo;
