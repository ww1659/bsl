import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface GroupState {
  groupId: string | null;
}

const initialState: GroupState = {
  groupId: null,
}

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupId: (state, action: PayloadAction<string | null>) => {
      state.groupId = action.payload
    },
  },
})

export const { setGroupId } = groupSlice.actions
export default groupSlice.reducer
