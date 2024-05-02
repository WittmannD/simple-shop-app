import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../store.ts";
import api from "../../api/order.api.ts"
import userApi from "../../api/users.api.ts"
import cartApi, {unwrapCartProducts} from "../../api/cart.api.ts"
import {emptyCart} from "../cart/cart.thunk.ts";

export interface PlaceOrderParams {
  orderInformation: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
  }
}

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (params: PlaceOrderParams, thunkAPI) => {
    const { orderInformation } = params;

    const state = thunkAPI.getState() as RootState;
    const userId = state.users?.currentUser?.id

    if (!userId) {
      thunkAPI.rejectWithValue('User not found')
      return
    }

    const userDoc = await userApi.getUser(userId);

    if (!userDoc.exists()) {
      thunkAPI.rejectWithValue('User not found')
      return
    }

    const cartDoc = await cartApi.getCart(userDoc.data()!.cart!.id)
    const items = await unwrapCartProducts(state, cartDoc.data()!.items!)

    if (!items.length) {
      thunkAPI.rejectWithValue('Cart is empty')
      return
    }

    const orderDocRef = await api.createOrder(userId, items, orderInformation)
    const orderDoc = await api.getOrder(orderDocRef.id)

    await thunkAPI.dispatch(emptyCart())
    return { id: orderDoc.id, ...orderDoc.data() }
  }
)