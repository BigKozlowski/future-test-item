import { useSelector } from "react-redux";
import "./App.css";

import SearchContainer from "./components/SearchContainer/SearchContainer";
import BookInfoPage from "./pages/BookInfoPage/BookInfoPage";
import SearchResultsPage from "./pages/SearchResultsPage/SearchResultsPage";

function App() {
  const currentPage = useSelector((state: State) => state.navigationSlice.currentPage);

  return (
    <div className="App">
      <SearchContainer />
      {currentPage === "search" && <SearchResultsPage />}
      {currentPage === "bookInfo" && <BookInfoPage />}
    </div>
  );
}

export default App;
