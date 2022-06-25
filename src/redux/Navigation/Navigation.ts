import { createSlice } from "@reduxjs/toolkit";

export const Navigation = createSlice({
  name: "search",
  initialState: {
    currentPage: "search",
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = Navigation.actions;

export default Navigation.reducer;
