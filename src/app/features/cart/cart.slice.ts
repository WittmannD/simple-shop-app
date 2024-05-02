import { createSlice } from '@reduxjs/toolkit'
import {addItem, emptyCart, removeItem, setCart, setItemQuantity} from './cart.thunk.ts'
import { ProductType } from '../../api/types/product.type.ts'

export interface CartState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  id?: string
  amount: number
  items: { product: ProductType; quantity: number }[]
  errorMessage?: string
}

const initialState: CartState = {
  loading: 'idle',
  id: undefined,
  amount: 0,
  items: [],
  errorMessage: undefined,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addItem.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(removeItem.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(setItemQuantity.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(setCart.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(emptyCart.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(addItem.rejected, (state, action) => {
      state.loading = 'failed'
      state.errorMessage = String(action.payload)
    })
    builder.addCase(removeItem.rejected, (state, action) => {
      state.loading = 'failed'
      state.errorMessage = String(action.payload)
    })
    builder.addCase(setItemQuantity.rejected, (state, action) => {
      state.loading = 'failed'
      state.errorMessage = String(action.payload)
    })
    builder.addCase(setCart.rejected, (state, action) => {
      state.loading = 'failed'
      state.errorMessage = String(action.payload)
    })
    builder.addCase(emptyCart.rejected, (state, action) => {
      state.loading = 'failed'
      state.errorMessage = String(action.payload)
    })
    builder.addCase(addItem.fulfilled, (state, action) => {
      const items = action.payload

      if (!items || !items.length) return

      state.items = items
      state.loading = 'succeeded'
    })
    builder.addCase(removeItem.fulfilled, (state, action) => {
      const items = action.payload

      if (!items) return

      state.items = items
      state.loading = 'succeeded'
    })
    builder.addCase(setItemQuantity.fulfilled, (state, action) => {
      const items = action.payload

      if (!items) return

      state.items = items
      state.loading = 'succeeded'
    })
    builder.addCase(setCart.fulfilled, (state, action) => {
      const cart = action.payload

      state.id = cart.id
      state.items = cart.items
      state.loading = 'succeeded'
    })
    builder.addCase(emptyCart.fulfilled, (state) => {
      state.items = []
      state.loading = 'succeeded'
    })
  },
})

export default cartSlice.reducer
