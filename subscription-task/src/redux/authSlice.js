import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, token: null, userId: null },

    reducers: {
      setUser: (state, action) => {
        state.user = action.payload.user;
        state.userId = action.payload.userId
        state.token = action.payload.token;
      },
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.userId = null;
      },
    },
  });
  export const { setUser, logout } = authSlice.actions;
  export default authSlice.reducer;