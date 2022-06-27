import { createSlice } from "@reduxjs/toolkit";

export const Navigation = createSlice({
  name: "navigation",
  initialState: {
    currentPage: "search",
    isLoading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCurrentPage, setIsLoading } = Navigation.actions;

export default Navigation.reducer;
