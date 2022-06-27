type Book = {
  id: string;
  coverLink: string | null;
  title: string | null;
  categories: string[] | null;
  authors: string[] | null;
  description: string;
};

type State = {
  searchSlice: {
    searchQuery: string;
    selectedCategory: string;
    sortingOrder: string;
    totalResults: number;
  };
  booksSlice: {
    books: Book[];
    preLoadedBooks: Book[];
    isFinal: boolean;
    selectedBook: number;
  };
  navigationSlice: {
    currentPage: string;
    isLoading: boolean;
  }
};
