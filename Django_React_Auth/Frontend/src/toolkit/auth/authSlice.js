import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,

  userInfo: {
    username: "",
    email: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: "",
  reducers: {},
  extraReducers: (builder) => {},
});
