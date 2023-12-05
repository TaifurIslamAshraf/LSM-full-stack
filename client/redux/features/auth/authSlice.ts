import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistetion: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },

    userLogin: (
      state,
      action: PayloadAction<{ accessToken: string; user: object }>
    ) => {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },

    userLogOut: (state, action) => {
      (state.token = ""), (state.user = "");
    },

    updateUser: (state, action: PayloadAction<{ user: object }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { userRegistetion, userLogOut, userLogin, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
