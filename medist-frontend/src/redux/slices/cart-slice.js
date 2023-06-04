import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
});

export const { resetCart, addItemToCart, removeItemFromCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
