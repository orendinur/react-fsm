import { useEffect, useState } from "react";
import { API_KEY, BASE_BOOKS_URL, GENRES } from "../../utils/constants";
import { BookList } from "../BookList/BookList";
import { useFsm } from "../../fsm";
import fetchMachine, { STATES, TRANSITIONS } from "../../utils/fetch.machine";
import { fetchData } from "../../utils/helpers";
import { CircleLoader } from "react-spinners";

import styles from "./BooksLayout.module.css";

export const BooksLayout = () => {
  const [currentMachineState, transition] = useFsm(fetchMachine);
  const [error, setError] = useState("");
  const [books, setBooks] = useState(null);

  useEffect(() => {
    if (books) {
      transition(TRANSITIONS.RESOLVE);
    }
  }, [books]);

  useEffect(() => {
    if (error) {
      transition(TRANSITIONS.REJECT);
      console.log("oren error");
    }
  }, [error]);

  const fetch = async (genre) => {
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
      console.log("interest fetch", currentMachineState);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(error);
    }
  };

  const onClick = (event) => {
    console.log("oren selected", event.target.textContent);
    const genre = event.target.textContent;
    if (!event || !genre) return;
    console.log("oren first transitrion ");
    transition(TRANSITIONS.LOAD);
    setTimeout(() => {
      fetch(genre);
    }, 1000);
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

      {currentMachineState == STATES.LOADING && (
        <div className={styles.loader}>
          <CircleLoader color="#dedede" size="120px" />
        </div>
      )}

      {currentMachineState == STATES.SUCCESS && books && (
        <div className={styles.gridContainer}>
          <BookList books={books} />
        </div>
      )}

      {currentMachineState == STATES.FAILURE && <div>Error</div>}
    </>
  );
};
