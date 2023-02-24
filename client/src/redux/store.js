import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import UserReducer from './slices/user'
import themeReducer from './slices/theme'
import { api } from './api'

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const rootReducer = persistReducer(persistConfig, UserReducer)

const store = configureStore({
  reducer: {
    user: rootReducer,
    theme: themeReducer,
    [api.reducerPath]: api.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware)
})
export let persistor = persistStore(store)
export default store
