import React from "react";
import userApi from "../../../../api/userApi";
import RegisterForm from "../RegisterForm";
import { toast } from "react-toastify";

const Register = ({ setMode }) => {
  const handleRegister = async (values) => {
    delete values["retypePassword"];
    values.type = "email";
    try {
      const res = await userApi.register(values);
      setMode();
      toast.success("Register is successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return <RegisterForm handleRegister={handleRegister}></RegisterForm>;
};

export default Register;
