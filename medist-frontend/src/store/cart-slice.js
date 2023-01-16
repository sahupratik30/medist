import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const totalQuantity = localStorage.getItem("totalQuantity")
  ? JSON.parse(localStorage.getItem("totalQuantity"))
  : 0;
const totalAmount = localStorage.getItem("totalAmount")
  ? JSON.parse(localStorage.getItem("totalAmount"))
  : 0;

function setCartData(items, totalQuantity, totalAmount) {
  localStorage.setItem("cartItems", JSON.stringify(items.map((item) => item)));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
}

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: items,
    totalQuantity,
    totalAmount,
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
      setCartData(state.items, state.totalQuantity, state.totalAmount);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.items.map((item) => item))
      );
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
      localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.items = state.items.filter((item) => item.id !== existingItem.id);
      state.totalQuantity -= existingItem.quantity;
      state.totalAmount -= existingItem.totalPrice;
      setCartData(state.items, state.totalQuantity, state.totalAmount);
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
