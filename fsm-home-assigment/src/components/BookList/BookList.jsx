import { useEffect, useState } from "react";
import { fetchData } from "../../utils/helpers";
import { API_KEY, BASE_BOOKS_URL } from "../../utils/constants";
// @ts-ignore
import styles from "./BookList.module.css";

export const BookList = ({ genre }) => {
  const [books, setBooks] = useState(null);

  const fetch = async () => {
    try {
      const url = `${BASE_BOOKS_URL}subject:${genre}&maxResults=${40}&key=${API_KEY}`;
      const booksResponse = await fetchData(url);
      if (!booksResponse || !booksResponse.items) {
        return;
      }

      const books = booksResponse.items.map((item) => item.volumeInfo);
      if (!books) return;

      const filteredBooks = books.filter((bookInfo) => {
        return (
          bookInfo.imageLinks &&
          bookInfo.imageLinks.thumbnail &&
          bookInfo.title &&
          bookInfo.authors
        );
      });

      const formattedBooks = filteredBooks.map((bookInfo) => {
        return {
          title: bookInfo.title,
          authors: bookInfo.authors,
          imageLink: bookInfo.imageLinks.thumbnail,
        };
      });

      // Use the first 21 books
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
      <div className={styles.gridContainer}>
        <h1>Book List</h1>
        {books && (
          <div className={styles.gridContainer}>
            {books.map((book, index) => (
              <div key={index} className={styles.gridItem}>
                <img src={book.imageLink} alt={`Cover for ${book.title}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// {
/* <div className={styles.gridContainer}>
  {items.map((item, index) => (
    <div key={index} className={styles.gridItem}>
      {item}
    </div>
  ))}
</div>; */
// }
// <ul>
//   {books.map((book, index) => (
//     <li key={index}>
//       <h2>{book.title}</h2>
//       <p>Author(s): {book.authors}</p>
//       <img src={book.imageLink} alt={`Cover for ${book.title}`} />
//     </li>
//   ))}
// </ul>
