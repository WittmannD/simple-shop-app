import { createSlice } from '@reduxjs/toolkit'
import { fetchAllProducts } from './products.thunk.ts'
import { QueryDocumentSnapshot } from 'firebase/firestore'
import {ProductDocument, ProductType} from "../../api/types/product.type.ts";

export interface ProductsState {
  pagination: {
    empty: boolean,
    lastVisible?: QueryDocumentSnapshot<Partial<ProductDocument>>
  }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  items: ProductType[]
  single?: ProductType
  errorMessage?: string
}

const initialState: ProductsState = {
  pagination: {
    empty: false,
    lastVisible: undefined,
  },
  loading: 'idle',
  items: [],
  single: undefined,
  errorMessage: undefined,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      const { docs, empty } = action.payload

      state.pagination.empty = empty;

      if (
        empty ||
        state.pagination.lastVisible?.id === docs[docs.length - 1].id
      )
        return

      state.pagination.lastVisible = docs[docs.length - 1]

      const items = docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Required<ProductType>[]
      state.items =
        state.pagination.lastVisible === undefined
          ? items
          : [...state.items, ...items]

      state.loading = 'succeeded'
    })
    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.loading = 'failed'
      state.errorMessage = String(action.payload)
    })
  },
})

export default productsSlice.reducer
