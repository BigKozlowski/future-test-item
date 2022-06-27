import { useDispatch, useSelector } from "react-redux";
import { setBooks, setIsFinal, setPreloadedBooks } from "../../redux/BooksList/BooksList";
import { setCurrentPage, setIsLoading } from "../../redux/Navigation/Navigation";
import {
  setSearchQuery,
  setSelectedCategory,
  setSortingOrder,
  setTotalResults,
} from "../../redux/SearchParameters/SearchParameters";
import { requestBooks } from "../../utils/APIUtils";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";

import classes from "./SearchContainer.module.css";

const categoryOptions = [
  { value: "all", text: "all" },
  { value: "art", text: "art" },
  { value: "biography", text: "biography" },
  { value: "computers", text: "computers" },
  { value: "history", text: "history" },
  { value: "medical", text: "medical" },
  { value: "poetry", text: "poetry" },
];

const sortingOptions = [
  { value: "relevance", text: "relevance" },
  { value: "newest", text: "newest" },
];

const SearchContainer = () => {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state: State) => state.searchSlice.searchQuery);

  const selectedCategory = useSelector((state: State) => state.searchSlice.selectedCategory);

  const sortingOrder = useSelector((state: State) => state.searchSlice.sortingOrder);

  const fetchBooks = async (
    searchQuery: string,
    selectedCategory: string,
    sortingOrder: string
  ) => {
    dispatch(setIsLoading(true));
    dispatch(setIsFinal(false));
    const { booksList, totalItems } = await requestBooks(
      searchQuery,
      selectedCategory,
      sortingOrder,
      0
    );

    dispatch(setIsLoading(false));

    if (booksList.length === 0) {
      dispatch(setIsFinal(true));
      return;
    }

    dispatch(setCurrentPage("search"));
    dispatch(setTotalResults({ value: totalItems }));
    dispatch(setBooks({ books: [...booksList] }));
  };

  const preFetchBooks = async (
    searchQuery: string,
    selectedCategory: string,
    sortingOrder: string
  ) => {
    const { booksList } = await requestBooks(searchQuery, selectedCategory, sortingOrder, 30);
    if (booksList.length === 0) {
      dispatch(setIsFinal(true));
    }
    dispatch(setPreloadedBooks({ books: [...booksList] }));
  };

  const selectCategory = (event) => {
    event.preventDefault();
    const category = event.target.value;
    dispatch(setSelectedCategory({ value: category }));
    if (searchQuery.length > 0) {
      fetchBooks(searchQuery, category, sortingOrder);
      preFetchBooks(searchQuery, category, sortingOrder);
    }
  };

  const selectSortingOrder = (event) => {
    event.preventDefault();
    const sorting = event.target.value;
    dispatch(setSortingOrder({ value: sorting }));
    if (searchQuery.length > 0) {
      fetchBooks(searchQuery, selectedCategory, sorting);
      preFetchBooks(searchQuery, selectedCategory, sortingOrder);
    }
  };

  const handleInput = (event) => {
    event.preventDefault();
    dispatch(setSearchQuery({ value: event.target.value }));
  };

  const submitHandler = (e) => {
    if (e.key === "Enter") {
      fetchBooks(searchQuery, selectedCategory, sortingOrder);
      preFetchBooks(searchQuery, selectedCategory, sortingOrder);
    }
  };

  const handleSearchButton = (e) => {
    e.preventDefault();
    fetchBooks(searchQuery, selectedCategory, sortingOrder);
    preFetchBooks(searchQuery, selectedCategory, sortingOrder);
  };

  return (
    <div className={classes.searchContainer}>
      <Input
        className={classes.searchInput}
        onChange={handleInput}
        onSubmit={submitHandler}
        onSearch={handleSearchButton}
      />
      <div className={classes.controlsContainer}>
        <div>
          <span>Categories</span>
          <Dropdown value={selectedCategory} onChange={selectCategory} options={categoryOptions} />
        </div>
        <div>
          <span>Sorting by</span>
          <Dropdown value={sortingOrder} onChange={selectSortingOrder} options={sortingOptions} />
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
