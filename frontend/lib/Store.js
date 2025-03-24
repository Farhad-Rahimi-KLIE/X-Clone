import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './features/authentecation/authSlice'
import  MainData  from './features/MainData/maindata.Slice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth : authSlice,
      posts : MainData
    },
  })
}