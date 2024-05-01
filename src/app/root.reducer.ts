import {combineSlices} from "@reduxjs/toolkit";
import productsReducer from "./features/products/products.slice.ts";
import cartReducer from "./features/cart/cart.slice.ts";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

const persistConfig = {
  key: 'root',
  whitelist: ['cart'],
  storage,
}

export const rootReducer = combineSlices({
  products: productsReducer,
  cart: cartReducer
})

export const persistedReducer = persistReducer(persistConfig, rootReducer);
