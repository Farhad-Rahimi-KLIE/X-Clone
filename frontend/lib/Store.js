import { configureStore } from '@reduxjs/toolkit'
import  authSlice  from './features/authentecation/authSlice'
import  maindataReducer   from './features/MainData/maindata.Slice'
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth : authSlice,
      maindata : maindataReducer
    },
  })
}