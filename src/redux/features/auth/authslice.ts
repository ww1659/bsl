import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  session: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
    clearSession: (state) => {
      state.session = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSession, clearSession, setError } = authSlice.actions;
export default authSlice.reducer;
