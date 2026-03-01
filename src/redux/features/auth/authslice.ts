import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AuthApiError,Session } from "@supabase/supabase-js"

interface AuthState {
  session: Session | null;
  error: AuthApiError | null;
}

const initialState: AuthState = {
  session: null,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<Session | null>) => {
      state.session = action.payload
    },
    clearSession: (state) => {
      state.session = null
    },
    setError: (state, action: PayloadAction<AuthApiError | null>) => {
      state.error = action.payload
    },
  },
})

export const { setSession, clearSession, setError } = authSlice.actions
export default authSlice.reducer
