import { createSlice } from "@reduxjs/toolkit";

const apiSlice = createSlice({
  name: "api",
  initialState: { apis: [] },
  reducers: {
    setAPIs: (state, action) => {
      state.apis = action.payload;
    },
  },
});
export const { setAPIs } = apiSlice.actions;
export default apiSlice.reducer;
