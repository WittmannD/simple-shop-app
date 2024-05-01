import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {ProductType} from "../../api/types/product.type.ts";

export interface CartState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  items: { data: ProductType; quantity: number }[]
  errorMessage?: string
}

const initialState: CartState = {
  loading: 'idle',
  items: [],
  errorMessage: undefined,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ProductType>) {
      const itemId = action.payload.id
      const existed = state.items.find((o) => o.data.id === itemId)

      if (existed) {
        existed.quantity += 1
        return
      }

      state.items.push({
        data: action.payload,
        quantity: 1,
      })
    },

    removeItem(state, action: PayloadAction<string>) {
      const itemId = action.payload
      const existed = state.items.findIndex((o) => o.data.id === itemId)

      if (!~existed) return

      if (state.items[existed].quantity <= 1) {
        state.items.splice(existed, 1)
        return
      }

      state.items[existed].quantity -= 1
    },

    setAmount(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const { id: itemId, quantity } = action.payload
      const existed = state.items.findIndex((o) => o.data.id === itemId)

      if (!~existed) return

      if (quantity === 0) {
        state.items.splice(existed, 1)
        return
      }

      state.items[existed].quantity = quantity
    },
  },
})

export const { addItem, removeItem, setAmount } = cartSlice.actions

export default cartSlice.reducer
