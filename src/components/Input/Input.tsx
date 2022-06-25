import { useSelector } from "react-redux";

import classes from "./Input.module.css";

const Input = ({ className, onChange, onSubmit, onSearch }) => {
  const searchQuery = useSelector((state: State) => state.searchSlice.searchQuery);

  return (
    <div className={classes.searchBarContainer}>
      <input
        className={className}
        onKeyPress={onSubmit}
        value={searchQuery}
        onChange={onChange}
      ></input>
      <button onClick={onSearch}>Search!</button>
    </div>
  );
};

export default Input;
