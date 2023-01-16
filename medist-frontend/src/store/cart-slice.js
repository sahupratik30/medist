import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  },
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
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
