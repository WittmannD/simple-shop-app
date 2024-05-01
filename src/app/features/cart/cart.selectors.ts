import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartItemsCount = createSelector(
  [(state: RootState) => state.cart.items],
  items => {
    return items.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0)
  }
)

export const selectCartItemsTotalPrice = createSelector(
  [(state: RootState) => state.cart.items],
  items => {
    return items.reduce((accumulator, currentValue) => accumulator + Number(currentValue.product.price) * currentValue.quantity, 0)
  }
)

export const selectIsProductInCart = createSelector(
  [
    (state: RootState) => state.cart.items,
    (_state: RootState, id: string) => id,
  ],
  (items, id) => {
    return Boolean(~items.findIndex(o => o.product.id === id))
  }
)
