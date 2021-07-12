import { createSlice } from "@reduxjs/toolkit"
import { specToHex } from "luum"
import initialState from "./initialState"

export const kegsSlice = createSlice({
  name: `kegs`,
  initialState,
  reducers: {
    create: (state, action) => {
      const { name, brand, price, flavor } = action.payload
      return [
        ...state,
        {
          name: `${name || `Unidentified`} Brew`,
          brand: `${brand || `Generic`} Brand`,
          price: price || 0,
          flavor: `${flavor || `Regular`} Flavor`,
          color: specToHex({
            hue: new Date().getSeconds() * 6,
            sat: 200,
            lum: 0.7,
            prefer: `lum`,
          }),
          total: 124,
          remaining: 124,
        },
      ]
    },
    decrement: (state, action) => state.map((keg, j) =>
      j === action.payload && keg.remaining
        ? { ...keg, remaining: keg.remaining - 1 }
        : keg
    ),
  },
})

export const select = state => state.kegs

export const { create, decrement } = kegsSlice.actions

export default kegsSlice.reducer
