import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import StorageKeys from "../../constants/storage-keys";

export const login = createAsyncThunk("user/login", async (payload) => {
  const res = await userApi.login(payload);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(res.data));
  localStorage.setItem(StorageKeys.TOKEN, res.meta.token);
  return res.data;
});
export const userInfo = createAsyncThunk("user/info", async (payload) => {
  const res = await userApi.getInfoUser(payload.nickname);
  if (payload.userCurrent) {
    localStorage.setItem(StorageKeys.USER, JSON.stringify(res.data));
  }
  return {
    user: res.data,
    userCurrent: payload.userCurrent,
  };
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    userInfo: {},
    modalLogin: false,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      state.current = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.current = action.payload;
    });
    builder.addCase(userInfo.fulfilled, (state, action) => {
      state.userInfo = action.payload.user;
      action.payload.userCurrent && (state.current = action.payload.user);
    });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
