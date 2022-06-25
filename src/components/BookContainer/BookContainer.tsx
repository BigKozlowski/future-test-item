import { useDispatch } from "react-redux";
import { setSelectedBook } from "../../redux/BooksList/BooksList";
import { setCurrentPage } from "../../redux/Navigation/Navigation";
import classes from "./BookContainer.module.css";

type Props = {
  coverLink: string;
  title: string;
  authors: string[];
  categories: string[];
  index: number;
};

const BookContainer = ({ coverLink, title, authors, categories, index }: Props) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setSelectedBook(index));
    dispatch(setCurrentPage("bookInfo"));
  };
  return (
    <div className={classes.bookContainer} onClick={handleClick}>
      {coverLink ? (
        <img src={coverLink} alt={title} className={classes.imageContainer} />
      ) : (
        <div className={classes.imageContainer} />
      )}
      <p className={classes.titleContainer}>{title}</p>
      <p>{categories[0] ? categories[0] : ""}</p>
      <p>{authors}</p>
      <div></div>
    </div>
  );
};

export default BookContainer;
