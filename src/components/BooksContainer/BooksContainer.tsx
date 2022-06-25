import { useSelector } from "react-redux";
import BookContainer from "../BookContainer/BookContainer";

import classes from "./BooksContainer.module.css";

const BooksContainer = () => {
  const booksList = useSelector((state: State) => state.booksSlice.books);

  return (
    <div className={classes.booksContainer}>
      {booksList
        ? booksList.map((book, index) => (
            <BookContainer
              index={index}
              key={book.id}
              coverLink={book.coverLink}
              title={book.title}
              categories={book.categories ? book.categories : []}
              authors={book.authors}
            />
          ))
        : null}
    </div>
  );
};

export default BooksContainer;
