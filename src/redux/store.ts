import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./SearchParameters/SearchParameters";
import booksReducer from "./BooksList/BooksList";
import navigationReducer from "./Navigation/Navigation";

export default configureStore({
  reducer: {
    searchSlice: searchReducer,
    booksSlice: booksReducer,
    navigationSlice: navigationReducer,
  },
});
