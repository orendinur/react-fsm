import { useEffect, useState } from "react";
import { fetchData } from "../utils/helpers";
import { API_KEY, BASE_BOOKS_URL } from "../utils/constants";

export const BookList = ({ genre }) => {
  const [books, setBooks] = useState(null);

  const fetch = async () => {
    try {
      const url = `${BASE_BOOKS_URL}subject:${genre}&maxResults=${40}&key=${API_KEY}`;
      console.log("oren url", url);
      const booksResponse = await fetchData(url);

      console.log("oren response", booksResponse);
      if (!booksResponse || !booksResponse.items) {
        return;
      }

      console.log("oren books3", booksResponse);
      const books = booksResponse.items.map((item) => item.volumeInfo);
      if (!books) return;

      console.log("oren books2", books);
      const filteredBooks = books.filter((bookInfo) => {
        return (
          bookInfo.imageLinks &&
          bookInfo.imageLinks.thumbnail &&
          bookInfo.title &&
          bookInfo.authors
        );
      });

      console.log("oren books1", filteredBooks);

      const formattedBooks = filteredBooks.map((bookInfo) => {
        return {
          title: bookInfo.title,
          authors: bookInfo.authors,
          imageLink: bookInfo.imageLinks.thumbnail,
        };
      });

      // Use the first 21 books
      console.log("oren booksL", books);
      setBooks(formattedBooks.slice(0, 21));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    console.log("oren book list use effect");
    fetch();
  }, [genre]);

  return (
    <div>
      <h1>Book List</h1>
      {books && (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <h2>{book.title}</h2>
              <p>Author(s): {book.authors}</p>
              <img src={book.imageLink} alt={`Cover for ${book.title}`} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
