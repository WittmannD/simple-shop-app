import { createSlice } from '@reduxjs/toolkit'
import {addItem, removeItem, setCart, setItemQuantity} from './cart.thunk.ts'
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
    builder.addCase(addItem.fulfilled, (state, action) => {
      const items = action.payload
      console.log(items)
      if (!items || !items.length) return

      state.items = items
      state.loading = 'succeeded'
    })
    builder.addCase(removeItem.fulfilled, (state, action) => {
      const items = action.payload

      if (!items || !items.length) return

      state.items = items
      state.loading = 'succeeded'
    })
    builder.addCase(setItemQuantity.fulfilled, (state, action) => {
      const items = action.payload

      if (!items || !items.length) return

      state.items = items
      state.loading = 'succeeded'
    })
    builder.addCase(setCart.fulfilled, (state, action) => {
      const cart = action.payload

      state.id = cart.id
      state.items = cart.items
      state.loading = 'succeeded'
    })
  },
})

export default cartSlice.reducer
