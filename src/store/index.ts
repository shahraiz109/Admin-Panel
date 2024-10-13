import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { apiSlice } from '@/api/apiSlice';
import { rootReducer } from './rootReducer';
import { storageMethod } from './storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: storageMethod,
  whitelist: ['auth'], // Persist only specific slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);
