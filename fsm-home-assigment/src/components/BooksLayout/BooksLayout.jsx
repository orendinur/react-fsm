import { useEffect, useState } from "react";
import { API_KEY, BASE_BOOKS_URL, GENRES } from "../../utils/constants";
import { BookList } from "../BookList/BookList";
import { useFsm } from "../../fsm";
import fetchMachine, { STATES, TRANSITIONS } from "../../utils/fetch.machine";
import { fetchData } from "../../utils/helpers";
import { CircleLoader } from "react-spinners";

import styles from "./BooksLayout.module.css";

export const BooksLayout = () => {
  const [genre, setGenre] = useState("");
  const [currentMachineState, transition] = useFsm(fetchMachine);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState(null);

  const fetch = async () => {
    try {
      const url = `${BASE_BOOKS_URL}subject:${genre}&maxResults=${40}&key=${API_KEY}`;
      const booksResponse = await fetchData(url);
      if (!booksResponse || !booksResponse.items) return;

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

      // Use the first 20 books
      setBooks(formattedBooks.slice(0, 20));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    console.log("oren book list use effect");
    fetch();
  }, [genre]);

  const onClick = (event) => {
    console.log("oren selected", event.target.textContent);
    if (!event || event.target.textContent === genre) return;
    transition(TRANSITIONS.LOAD);
    setGenre(event.target.textContent);
  };

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.list}>
          {GENRES.map((genre, index) => (
            <li key={index} className={styles.item}>
              <div className={styles.button} onClick={onClick}>
                {genre}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {
        /* {currentMachineState == STATES.LOADING && ( */
        <div className={styles.loader}>
          <CircleLoader color="#dedede" size="120" />
        </div>
      }

      {/* {books && ( //todo: state resolve
        <div className={styles.gridContainer}>{<BookList books={books} />}</div>
      )} */}
    </>
  );
};
