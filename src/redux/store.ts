import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import groupReducer from './features/groups/groupSlice'
import customerReducer from './features/customers/customersSlice'
import updateCustomerReducer from './features/customers/updateCustomerSlice'
import authReducer from './features/auth/authslice'

// Create a persist config
const persistConfig = {
  key: 'root', // Key in storage
  storage, // Default is localStorage, can use sessionStorage or other options
  whitelist: ['group', 'customer', 'auth'], // Specify which reducers to persist
};

const rootReducer = combineReducers({  
  group: groupReducer,
  customer: customerReducer,
  customerDetailsDialog: updateCustomerReducer,
  auth: authReducer,
}) 

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/REGISTER',
        ],
        // Ignore paths in the state that may have non-serializable values
        ignoredPaths: ['_persist'],
      },
    }),
})

export const persistor = persistStore(store);

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>

export default store;


