import { useDispatch } from 'react-redux'
import authReducer from './authSlice'

import { configureStore, combineReducers, ThunkAction, Action   } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
// import thunkMiddleware from 'redux-thunk'
const rootReducer = combineReducers({
  account: authReducer
})


const store = configureStore({
  reducer: rootReducer,
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export  default store;
