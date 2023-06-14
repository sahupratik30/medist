import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const PharmacySlice = createSlice({
  name: "pharmacies",
  initialState,
  reducers: {
    setPharmacies(state, action) {
      state = action.payload;
    },

    resetPharmacies(state) {
      return initialState;
    },
  },
});

export const { setPharmacies, resetPharmacies } = PharmacySlice.actions;
export const pharmacyReducer = PharmacySlice.reducer;
