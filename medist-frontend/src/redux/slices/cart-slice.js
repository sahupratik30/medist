import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, removeFromCart, updateCart } from "../../http/http-calls";

// async function to add item to cart
export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (payload, thunkAPI) => {
    const res = await addToCart(payload);
    return res;
  }
);

// async function to remove item from cart
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (payload, thunkAPI) => {
    const res = await removeFromCart(payload?.itemId, payload?.data);
    return res;
  }
);

// async function to update cart
export const updateCartData = createAsyncThunk(
  "cart/updateCartData",
  async (payload, thunkAPI) => {
    const res = await updateCart(payload?.itemId, payload?.data);
    return res;
  }
);

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData(state, action) {
      const { items, totalQuantity, totalAmount } = action.payload;
      state.items = items;
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },

    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          manufacturer: newItem.manufacturer,
          quantity: newItem.quantity,
          price: newItem.price,
          mrp: newItem.mrp,
          totalPrice: newItem.quantity * newItem.price,
          image: newItem.image,
        });
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.quantity * newItem.price;
      }
      state.totalQuantity += newItem.quantity;
      state.totalAmount += newItem.quantity * newItem.price;
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.items = state.items.filter((item) => item.id !== existingItem.id);
      state.totalQuantity -= existingItem.quantity;
      state.totalAmount -= existingItem.totalPrice;
    },

    resetCart() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(updateCartData.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalAmount = action.payload.totalAmount;
      });
  },
});

export const { resetCart, addItemToCart, removeItemFromCart, setCartData } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
