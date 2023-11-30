import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistetion: (state, action) => {
      state.token = action.payload.token;
    },

    userLogin: (state, action) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },

    userLogOut: (state, action) => {
      (state.token = ""), (state.user = "");
    },
  },
});

export const { userRegistetion, userLogOut, userLogin } = authSlice.actions;
