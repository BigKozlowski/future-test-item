const APIkey = process.env.REACT_APP_API_KEY;

export const requestBooks = async (
  searchQuery: string,
  selectedCategory: string,
  sortingOrder: string,
  startIndex: number
) => {
  const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${
    selectedCategory !== "all" ? `+subject:${selectedCategory}:` : ""
  }&orderBy=${sortingOrder}&maxResults=30${
    startIndex > 0 ? `&startIndex=${startIndex}` : ""
  }&key=${APIkey}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
    });

    const responseBody = await response.json();

    if (!responseBody.items) {
      return { booksList: [], totalItems: responseBody.totalItems };
    }

    if (responseBody.items !== undefined) {
      const booksList: Book[] = [
        ...responseBody.items.map((el, index) => {
          return {
            id: `${el.id} ${index}`,
            coverLink: el.volumeInfo.imageLinks?.thumbnail
              ? el.volumeInfo.imageLinks.thumbnail
              : "",
            title: el.volumeInfo.title,
            categories: el.volumeInfo.categories,
            authors: el.volumeInfo.authors,
            description: el.volumeInfo.description,
          };
        }),
      ];
      return { booksList: booksList, totalItems: responseBody.totalItems };
    }
  } catch (error) {
    console.error(error);
  }
};
