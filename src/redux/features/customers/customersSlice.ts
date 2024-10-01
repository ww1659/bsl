  import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CustomerState {
  customerId: string | null;
}

const initialState: CustomerState = {
  customerId: null,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerId: (state, action: PayloadAction<string | null>) => {
      state.customerId = action.payload;
    },
  },
});

export const { setCustomerId } = customerSlice.actions;
export default customerSlice.reducer;
