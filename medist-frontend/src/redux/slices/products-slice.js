import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../../http/http-calls";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (payload, thunkApi) => {
    const data = await fetchAllProducts();
    return data;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const productsReducer = productsSlice.reducer;
