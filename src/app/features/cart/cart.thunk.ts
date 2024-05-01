import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/cart.api.ts'
import { RootState } from '../../store.ts'
import { selectProductById } from '../products/products.selectors.ts'
import productsApi from '../../api/products.api.ts'
import { ProductType } from '../../api/types/product.type.ts'
import { CartDocument } from '../../api/types/cart.type.ts'
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

const unwrapCartProducts = async (
  state: RootState,
  items: CartDocument['items']
) => {
  return await Promise.all(
    items.map(async (item) => {
      let product = selectProductById(state, item.product.id)

      if (!product) {
        const productDoc = await productsApi.getProduct(item.product.id)
        product = { id: productDoc.id, ...productDoc.data() } as ProductType
      }

      return { ...item, product }
    })
  )
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

    const unwraped = await unwrapCartProducts(state, items)

    console.log(unwraped, items)
    return unwraped
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
