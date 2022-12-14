import { Box, styled } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalEdit from "../../../components/modal/ModalEdit";
import { renderName } from "../../../constants/defaultUrlImage";
import LayoutAppFull from "../../../layout/LayoutAppFull";
import { userInfo } from "../../../redux/user/userSlice";
import AccountInfo from "../component/AccountInfo";
import TabDetails from "../component/TabDetails";

const BoxWrapper = styled(Box)({
  padding: "32px 24px",
  width: "100%",
  minHeight: "calc(100vh - 60px)",
  display: "flex",
  flexDirection: "column",
});

const DetailsUser = () => {
  const [open, setOpen] = useState(false);
  const { nickname } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const getUser = async (nickname, userCurrent) => {
    const resultAction = await dispatch(userInfo({ nickname, userCurrent }));
    const user = unwrapResult(resultAction);
  };
  useEffect(() => {
    (async () => {
      try {
        await getUser(nickname, false);
      } catch (error) {}
      setLoading(false);
    })();
  }, [nickname]);
  useEffect(() => {
    if (user.nickname === undefined) return;
    document.title = `${renderName(
      user.first_name,
      user.last_name,
      user.nickname
    )}(@${user.nickname}) Tiktok}`;
  }, [user]);
  return (
    <LayoutAppFull>
      <BoxWrapper>
        <AccountInfo setOpen={setOpen} loading={loading}></AccountInfo>
        <TabDetails loading={loading} />
        <ModalEdit setOpen={setOpen} open={open} getUser={getUser} />
      </BoxWrapper>
    </LayoutAppFull>
  );
};

export default DetailsUser;
