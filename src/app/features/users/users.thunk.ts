import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/users.api.ts'

export interface FetchSingleUserParams {
  id: string
}

export const createUser = createAsyncThunk(
  'users/createUser',
  async (_params: void, thunkAPI) => {
    try {
      return await api.createUser()
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
