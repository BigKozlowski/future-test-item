import { createSlice } from "@reduxjs/toolkit";

export const BooksList = createSlice({
  name: "books",
  initialState: {
    books: [],
    preLoadedBooks: [],
    isFinal: false,
    selectedBook: 0,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = [...action.payload.books];
    },
    addBooks: (state) => {
      state.books = [...state.books, ...state.preLoadedBooks];
    },
    setPreloadedBooks: (state, action) => {
      console.log(action);
      state.preLoadedBooks = [...action.payload.books];
    },
    setIsFinal: (state, action) => {
      state.isFinal = action.payload;
    },
    setSelectedBook: (state, action) => {
      state.selectedBook = action.payload;
    },
  },
});

export const { setBooks, addBooks, setPreloadedBooks, setIsFinal, setSelectedBook } =
  BooksList.actions;

export default BooksList.reducer;
