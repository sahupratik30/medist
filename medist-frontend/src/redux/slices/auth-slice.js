import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },

    setUserData(state, action) {
      state.user = action.payload;
    },

    resetAuthData() {
      return initialState;
    },
  },
});

export const { setAccessToken, setUserData, resetAuthData } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
