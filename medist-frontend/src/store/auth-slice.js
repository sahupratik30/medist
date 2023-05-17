import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    user: "",
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },

    unsetAccessToken(state) {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, unsetAccessToken } = authSlice.actions;

export default authSlice;
