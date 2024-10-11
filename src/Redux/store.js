import { configureStore } from "@reduxjs/toolkit";
import FriendSlice from "../Redux/Features/FriendSlice";
export default configureStore({
  reducer: {
    friend: FriendSlice,
  },
});
