import { createSlice } from "@reduxjs/toolkit";

export const FriendSlice = createSlice({
  name: "friends",
  initialState: {
    friendInfo: {},
  },
  reducers: {
    freindsAction: (state, action) => {
      state.friendInfo = action.payload;
    },
  },
});

export const { freindsAction } = FriendSlice.actions;

export default FriendSlice.reducer;
