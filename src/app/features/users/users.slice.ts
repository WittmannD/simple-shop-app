import { createSlice } from '@reduxjs/toolkit'
import { fetchCurrentUser } from './users.thunk.ts'
import { UserType } from '../../api/types/user.type.ts'

export interface UserState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  currentUser?: Omit<UserType, 'cart'>
  errorMessage?: string
}

const initialState: UserState = {
  loading: 'idle',
  currentUser: undefined,
  errorMessage: undefined,
}

const usersSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      const user = action.payload

      if (!user) {
        state.errorMessage = 'User not found'
        state.loading = 'failed'
        return
      }

      state.currentUser = user
      state.loading = 'succeeded'
    })
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.loading = 'failed'
      state.errorMessage = String(action.payload)
    })
  },
})

export default usersSlice.reducer
