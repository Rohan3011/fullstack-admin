import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: state => {
      return state.user
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: state => {
      state.user = null
    },
    isAuthenticated: state => {
      return !!state.user
    }
  }
})

export const { getUser, setUser, logout, isAuthenticated } = UserSlice.actions

export default UserSlice.reducer
