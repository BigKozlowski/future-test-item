import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BooksContainer from "../../components/BooksContainer/BooksContainer";
import withSpinner from "../../components/withSpinner/withSpinner";
import { addBooks, setIsFinal, setPreloadedBooks } from "../../redux/BooksList/BooksList";
import { setTotalResults } from "../../redux/SearchParameters/SearchParameters";
import { requestBooks } from "../../utils/APIUtils";

const BooksContainerWithSpinner = withSpinner(BooksContainer);

const Button = ({ onClick }) => {
  return <button onClick={onClick}>Load More</button>;
};

const ButtonWithSpinner = withSpinner(Button);

const SearchResultsPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const booksList = useSelector((state: State) => state.booksSlice.books);

  const dispatch = useDispatch();

  const searchQuery = useSelector((state: State) => state.searchSlice.searchQuery);

  const orderBy = useSelector((state: State) => state.searchSlice.sortingOrder);

  const selectedCategory = useSelector((state: State) => state.searchSlice.selectedCategory);

  const totalResults = useSelector((state: State) => state.searchSlice.totalResults);

  const isFinal = useSelector((state: State) => state.booksSlice.isFinal);

  const isLoading = useSelector((state: State) => state.navigationSlice.isLoading);

  const addNewBooks = async (
    searchQuery: string,
    selectedCategory: string,
    sortingOrder: string,
    startIndex
  ) => {
    setIsAdding(true);
    const { booksList, totalItems } = await requestBooks(
      searchQuery,
      selectedCategory,
      sortingOrder,
      startIndex + 30
    );

    setIsAdding(false);

    if (booksList.length === 0) {
      dispatch(setIsFinal(true));
    }

    dispatch(setTotalResults({ value: totalItems }));
    dispatch(addBooks());
    dispatch(setPreloadedBooks({ books: booksList }));
  };

  const loadNewBooks = () => {
    addNewBooks(searchQuery, selectedCategory, orderBy, booksList.length);
  };

  return (
    <Fragment>
      {/* Google books API в поле totalItems возвращает не точное общее количество результатов по запросу: 
      https://stackoverflow.com/questions/7266838/google-books-api-returns-json-with-a-seemingly-wrong-totalitem-value
      https://github.com/evdhiggins/book-inquiry - README, раздел "totalItems and calculating pagination".

      В качестве решения проблемы можно, например, полностью загружать список книг при первом поиске, но из-за большого количества запросов 
      есть возможность получить таймаут или бан ключа.
      */}
      {isFinal ? (
        <div>Found {booksList.length} results</div>
      ) : totalResults > 0 ? (
        <div>Found ~{totalResults} results</div>
      ) : null}
      <BooksContainerWithSpinner isLoading={isLoading} />
      {booksList.length > 0 && !isFinal ? (
        <ButtonWithSpinner isLoading={isAdding} onClick={loadNewBooks} />
      ) : null}
    </Fragment>
  );
};

export default SearchResultsPage;
