import { configureStore } from '@reduxjs/toolkit'
import groupReducer from './features/groups/groupSlice'
import customerReducer from './features/customers/customersSlice'

export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument
  reducer: {
    group: groupReducer,
    customer: customerReducer
  },
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>

export default store;


