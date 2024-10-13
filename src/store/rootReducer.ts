import { apiSlice } from '@/api/apiSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  // Add other reducers as needed
});
