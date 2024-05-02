import { combineSlices } from '@reduxjs/toolkit'
import productsReducer from './features/products/products.slice.ts'
import cartReducer from './features/cart/cart.slice.ts'
import usersReducer from './features/users/users.slice.ts'
import orderReducer from './features/order/order.slice.ts'

export const rootReducer = combineSlices({
  products: productsReducer,
  users: usersReducer,
  order: orderReducer,
  cart: cartReducer,
})
