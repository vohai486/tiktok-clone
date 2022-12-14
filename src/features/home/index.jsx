import React, { useEffect } from "react";
import userApi from "../../api/userApi";
import LayoutAppSmall from "../../layout/LayoutAppSmall";
import HomePage from "./page/HomePage";

const HomeFeature = () => {
  useEffect(() => {
    (async () => {
      const res = await userApi.getCurrentUser();
    })();
  }, []);
  return (
    <>
      <LayoutAppSmall>
        <HomePage />
      </LayoutAppSmall>
    </>
  );
};

export default HomeFeature;
