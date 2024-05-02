import { createAsyncThunk } from '@reduxjs/toolkit'
import api, {unwrapCartProducts} from '../../api/cart.api.ts'
import { RootState } from '../../store.ts'
import {DocumentReference} from "../../api/firestore.ts";

export interface AddItemParams {
  productId: string
}

export interface RemoveItemParams {
  productId: string
}

export interface SetItemQuantityParams {
  productId: string
  quantity: number
}

export interface SetCartParams {
  cart: DocumentReference<'cart'>
}

export const addItem = createAsyncThunk(
  'cart/addItem',
  async (params: AddItemParams, thunkAPI) => {
    const { productId } = params
    const state = thunkAPI.getState() as RootState
    const cartId = state.cart.id

    console.log(cartId)

    if (!cartId) {
      thunkAPI.rejectWithValue('Cart not found')
      return
    }

    const items = await api.addItem(cartId, productId)

    return await unwrapCartProducts(state, items)
  }
)

export const removeItem = createAsyncThunk(
  'cart/removeItem',
  async (params: RemoveItemParams, thunkAPI) => {
    const { productId } = params
    const state = thunkAPI.getState() as RootState
    const cartId = state.cart.id

    if (!cartId) {
      thunkAPI.rejectWithValue('Cart not found')
      return
    }

    const items = await api.removeItem(cartId, productId)

    if (!items) return []

    return await unwrapCartProducts(state, items)
  }
)

export const setItemQuantity = createAsyncThunk(
  'cart/setItemQuantity',
  async (params: SetItemQuantityParams, thunkAPI) => {
    const { productId, quantity } = params
    const state = thunkAPI.getState() as RootState
    const cartId = state.cart.id

    if (!cartId) {
      thunkAPI.rejectWithValue('Cart not found')
      return
    }

    const items = await api.setItemQuantity(cartId, productId, quantity)

    if (!items) return []

    return await unwrapCartProducts(state, items)
  }
)

export const setCart = createAsyncThunk(
  'cart/setCart',
  async (params: SetCartParams, thunkAPI) => {
    const { cart } = params
    const state = thunkAPI.getState() as RootState

    const cartDoc = await api.getCart(cart.id)
    const cartDocData = cartDoc.data()

    const items = await unwrapCartProducts(state, cartDocData?.items || [])

    return { id: cartDoc.id, ...cartDocData, items }
  }
)

export const emptyCart = createAsyncThunk(
  'cart/emptyCart',
  async (_params: void, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    await api.emptyCart(state.cart.id!);
  }
)
