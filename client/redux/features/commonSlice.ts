import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  collapsed: false,
  toggle: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    sidebar: (state, action) => {
      state.collapsed = action.payload?.collapsed;
      state.toggle = action.payload?.toggle;
    },
  },
});

export const { sidebar } = commonSlice.actions;
export default commonSlice.reducer;
