import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/products.api.ts'
import {RootState} from "../../store.ts";
import {ProductType} from "../../api/types/product.type.ts";

export interface FetchProductsParams {
  limit?: number
}

export interface FetchSingleProductParams {
  id: string
}

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (params: FetchProductsParams, thunkAPI) => {
    const { limit = 20 } = params
    const state = thunkAPI.getState() as RootState;

    try {
      return await api.getProducts(limit, state.products.pagination.lastVisible)
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct',
  async (params: FetchSingleProductParams, thunkAPI) => {
    const { id } = params

    try {
      const data = await api.getSingleProduct(id)
      return { id: data.id, ...data.data() } as ProductType
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)
