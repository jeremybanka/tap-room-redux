import { configureStore } from '@reduxjs/toolkit'
import kegsReducer from './kegs'
import newKegReducer from './newKeg'

const store = configureStore({
  reducer: {
    kegs: kegsReducer,
    newKeg: newKegReducer,
  },
})

export default store
