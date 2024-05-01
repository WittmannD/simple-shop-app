import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/users.api.ts'
import { setCart } from '../cart/cart.thunk.ts'

export interface FetchSingleUserParams {
  id: string
}

export const createUser = createAsyncThunk(
  'users/createUser',
  async (_params: void, thunkAPI) => {
    try {
      const userRef = await api.createUser()
      return await api.getUser(userRef.id)
    } catch (error) {
      thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchSingleUser = createAsyncThunk(
  'users/fetchSingleUser',
  async (params: FetchSingleUserParams, thunkAPI) => {
    const { id } = params

    try {
      return await api.getUser(id)
    } catch (error) {
      thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchCurrentUser = createAsyncThunk(
  'users/setCurrentUser',
  async (_params: void, thunkAPI) => {
    const userId = window.localStorage.getItem('userId')

    try {
      let userDoc;

      if (userId) {
        userDoc = await api.getUser(userId)
      }

      if (!userId || !userDoc || !userDoc.exists()) {
        const userDocRef = await api.createUser()
        userDoc = await api.getUser(userDocRef.id)
      }

      window.localStorage.setItem('userId', userDoc.id)
      thunkAPI.dispatch(setCart({ cart: userDoc.data()!.cart! }))

      return { id: userDoc.id, ...userDoc.data() }
    } catch (error) {
      thunkAPI.rejectWithValue(error)
    }
  }
)
