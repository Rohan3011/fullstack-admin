import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isLoggedIn: false
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: state => {
      return state.user
    },
    setUser: (state, action) => {
      state.user = {
        isLoggedIn: true,
        ...action.payload
      }
    },
    logout: state => {
      state.user = {
        isLoggedIn: false,
        user: null
      }
    }
  }
})

export const { getUser, setUser, logout } = UserSlice.actions

export default UserSlice.reducer
