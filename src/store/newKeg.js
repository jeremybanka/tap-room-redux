import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
  isOpen: false,
  name: ``,
  brand: ``,
  price: 0,
  flavor: ``,
}

export const kegsSlice = createSlice({
  name: `newKeg`,
  initialState,
  reducers: {
    reset: () => initialState,
    edit: (state, action) => {
      const { key, value } = action.payload
      return { ...state, [key]: value }
    },
    toggleOpen: state => ({ ...state, isOpen: !state.isOpen }),
  },
})

export const select = state => state.newKeg

export const { edit, reset, toggleOpen } = kegsSlice.actions

export default kegsSlice.reducer
