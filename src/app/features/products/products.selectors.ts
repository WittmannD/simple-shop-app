import {RootState} from "../../store.ts";
import {createDraftSafeSelector} from "@reduxjs/toolkit";

export const selectProducts = (state: RootState) => state.products.items

export const selectProductById = createDraftSafeSelector(
  (state: RootState) => state.products.items,
  (_state: RootState, productId: string) => productId,
  (items, productId) => {
    return items.find(o => o.id === productId)
  }
)