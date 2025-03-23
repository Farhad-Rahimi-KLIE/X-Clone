import { configureStore } from '@reduxjs/toolkit'
import  maindataSlice  from './features/MainData/maindata.Slice'
import  authSlice  from './features/authentecation/authSlice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      posts : maindataSlice,
      auth : authSlice,
    },
  })
}