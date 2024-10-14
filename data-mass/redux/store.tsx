import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { customStrings } from './reducers/customstrings'
import { language } from './reducers/language'
import { pages } from './reducers/pages'
import { roles } from './reducers/roles'
import { modules } from './reducers/modules'
import { snackbar } from './reducers/snackbar'
import { name } from './reducers/name'
import { notification } from './reducers/notification'
import { intrface } from './reducers/interface'
import { persistStore, persistReducer } from 'redux-persist'
import * as tp from '@/types'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import { commonStrings } from './reducers/commonStrings'
import { guestStrings } from './reducers/guestStrings'
import { errorStrings } from './reducers/errorStrings'
import { relatedListConfig } from './reducers/relatedListConfig'

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === 'undefined'
    ? createNoopStorage()
    : createWebStorage('local')

const rootReducer = combineReducers<tp.RootState>({
  customStrings,
  language,
  pages,
  roles,
  modules,
  snackbar,
  notification,
  intrface,
  commonStrings,
  guestStrings,
  errorStrings,
  name,
  relatedListConfig
} as any)

const persistConfig = {
  key: 'root0',
  storage,
  blacklist: ['intrface', 'commonStrings', 'guestStrings', 'errorStrings', 'snackbar', 'relatedListConfig']
};

const persistedReducer = persistReducer<tp.RootState>(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    })
})

export const persistor = persistStore(store)
export default store
