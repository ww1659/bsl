// dialogSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface DialogState {
  isOpen: boolean;
}

const initialState: DialogState = {
  isOpen: false,
};

const dialogSlice = createSlice({
  name: 'customerDetailsDialog',
  initialState,
  reducers: {
    openDialog(state) {
      state.isOpen = true;
    },
    closeDialog(state) {
      state.isOpen = false;
    },
    toggleDialog(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { openDialog, closeDialog, toggleDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
