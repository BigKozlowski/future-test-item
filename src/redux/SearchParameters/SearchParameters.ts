import { createSlice } from "@reduxjs/toolkit";

export const SearchParameters = createSlice({
  name: "search",
  initialState: {
    searchQuery: "",
    selectedCategory: "all",
    sortingOrder: "relevance",
    totalResults: 0,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.value;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload.value;
    },
    setSortingOrder: (state, action) => {
      state.sortingOrder = action.payload.value;
    },
    setTotalResults: (state, action) => {
      state.totalResults = action.payload.value;
    },
  },
});

export const { setSearchQuery, setSelectedCategory, setSortingOrder, setTotalResults } =
  SearchParameters.actions;

export default SearchParameters.reducer;
