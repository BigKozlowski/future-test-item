import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/Navigation/Navigation";

import classes from "./BookInfoPage.module.css";

const BookInfoPage = () => {
  const dispatch = useDispatch();
  const selectedBook = useSelector((state: State) => state.booksSlice.selectedBook);
  const books = useSelector((state: State) => state.booksSlice.books);
  const book = books[selectedBook];

  return (
    <div className={classes.bookInfoContainer}>
      <div className={classes.contentContainer}>
        {book.coverLink ? (
          <img src={book.coverLink} alt={book.title} className={classes.imageContainer} />
        ) : (
          <div className={classes.imageContainer} />
        )}
        <div className={classes.textContentContainer}>
          <p className={classes.titleContainer}>Title: {book.title}</p>
          {book.categories && <p>Categories: {book.categories.join(", ")}</p>}
          {book.authors && <p>Authors: {book.authors.join(", ")}</p>}
          {book.description?.trim().length > 0 && <p>Description: {book.description}</p>}
        </div>
      </div>

      <button onClick={() => dispatch(setCurrentPage("search"))}>Back to results</button>
    </div>
  );
};

export default BookInfoPage;
