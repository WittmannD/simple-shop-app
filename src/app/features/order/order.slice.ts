import {createSlice} from "@reduxjs/toolkit";
import {placeOrder} from "./order.thunk.ts";
import {OrderType} from "../../api/types/order.type.ts";

export interface OrderState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  order?: OrderType
  errorMessage?: string
}

const initialState: OrderState = {
  loading: 'idle',
  order: undefined,
  errorMessage: undefined,
}

const orderSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(placeOrder.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.loading = 'failed'
      state.errorMessage = String(action.payload)
    })
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.loading = 'succeeded'
      state.order = action.payload as OrderType
    })
  }
})

export default orderSlice.reducer;
