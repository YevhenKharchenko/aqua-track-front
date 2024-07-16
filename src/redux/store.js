import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './auth/slice.js';
import { waterReducer } from './water/slice.js';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};

const waterPersistConfig = {
  key: 'water',
  storage,
  whitelist: [],
};

export const store = configureStore({
  reducer: {
    user: persistReducer(userPersistConfig, userReducer),
    water: persistReducer(waterPersistConfig, waterReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
