import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },

    setUser(state, action) {
      state.user = action.payload;
    },

    resetAuthData() {
      return initialState;
    },
  },
});

export const { setAccessToken, setUser, resetAuthData } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
