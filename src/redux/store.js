import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
  whitelist: [],
};

const waterPersistConfig = {
  key: 'water',
  storage,
  whitelist: [],
};

const appReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  water: persistReducer(waterPersistConfig, waterReducer),
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout/fulfilled' || action.type === 'auth/logout/rejected') {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
