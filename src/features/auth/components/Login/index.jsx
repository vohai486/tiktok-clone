import React, { useState } from "react";
import userApi from "../../../../api/userApi";
import LoginForm from "../LoginForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { login } from "../../../../redux/user/userSlice";
const Login = ({ handleClose }) => {
  const navigate = useNavigate("/");
  const dispatch = useDispatch();
  const handleLogin = async (values) => {
    try {
      const resultAction = await dispatch(login(values));
      const user = unwrapResult(resultAction);
      handleClose();
      window.location.reload(true);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return <LoginForm handleLogin={handleLogin}></LoginForm>;
};

export default Login;
