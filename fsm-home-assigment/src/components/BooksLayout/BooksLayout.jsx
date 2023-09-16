import { useCallback, useEffect, useState } from "react";
import { API_KEY, BASE_BOOKS_URL, GENRES } from "../../utils/constants";
import { BookList } from "../BookList/BookList";
import { useFsm } from "../../fsm";
import fetchMachine, { STATES, TRANSITIONS } from "../../utils/fetch.machine";
import { fetchData } from "../../utils/helpers";
import { CircleLoader } from "react-spinners";

import styles from "./BooksLayout.module.css";
import { debounce } from "lodash";
import { Error } from "../Error";

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
    }
  }, [error]);

  // validate that all fields that will be visible exist
  const getBooksWithFields = (books) => {
    return books.filter((bookInfo) => {
      return (
        bookInfo.imageLinks &&
        bookInfo.imageLinks.thumbnail &&
        bookInfo.title &&
        bookInfo.authors
      );
    });
  };

  const formatBooksShape = (books) => {
    return books.map((bookInfo) => {
      return {
        title: bookInfo.title,
        authors: bookInfo.authors,
        imageLink: bookInfo.imageLinks.thumbnail, //.replace("zoom=1", "zoom=2"),
      };
    });
  };

  const fetch = async (genre) => {
    try {
      const url = `${BASE_BOOKS_URL}subject:${genre}&maxResults=${40}&key=${API_KEY}&zoom=0`;
      const booksResponse = await fetchData(url);
      if (!booksResponse || !booksResponse.items) return;

      const books = booksResponse.items.map((item) => item.volumeInfo);
      if (!books) return;

      const filteredBooks = getBooksWithFields(books);
      const formattedBooks = formatBooksShape(filteredBooks);
      // Show 20 books
      setBooks(formattedBooks.slice(0, 20));
    } catch (error) {
      console.error("Error fetching books:", error);
      setError(error);
    }
  };

  const onClickingEnd = useCallback(
    debounce((genre) => {
      fetch(genre);
    }, 600),
    []
  );

  const onClick = (event) => {
    const genre = event.target.textContent;
    if (!event || !genre) return;
    transition(TRANSITIONS.LOAD);
    onClickingEnd(genre);
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

      <div className={styles.center}>
        {currentMachineState == STATES.LOADING && (
          <CircleLoader color="#dedede" size="120px" />
        )}
        {currentMachineState == STATES.FAILURE && <Error />}
      </div>

      {currentMachineState == STATES.SUCCESS && books && (
        <BookList books={books} />
      )}
    </>
  );
};
