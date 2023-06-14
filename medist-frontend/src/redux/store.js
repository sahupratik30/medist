import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cart-slice";
import { authReducer } from "./slices/auth-slice";
import { productsReducer } from "./slices/products-slice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import persistStore from "redux-persist/es/persistStore";
import { pharmacyReducer } from "./slices/pharmacies-slice";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: authReducer,
  pharmacies: pharmacyReducer,
});

const persistConfig = {
  key: "root",
  keyPrefix: "",
  storage,
  stateReconciler: hardSet,
  blacklist: [""],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
