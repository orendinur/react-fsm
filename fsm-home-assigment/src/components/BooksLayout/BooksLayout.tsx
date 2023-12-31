import { MouseEvent, useCallback, useEffect, useState } from "react";
import { API_KEY, BASE_BOOKS_URL, GENRES } from "../../utils/constants";
import { BookList } from "../BookList";
import { useFsm } from "../../fsm";
import fetchMachine, { STATES, TRANSITIONS } from "../../utils/fetchMachine";
import { fetchData } from "../../utils/helpers";
import { CircleLoader } from "react-spinners";
import { debounce } from "lodash";
import { Error } from "../Error";
import styles from "./BooksLayout.module.css";
import { GenreList } from "../GenreList/GenreList";

// Displays a list of books genres and a list of books based on the selected genre.
// It uses the Google Books API to fetch books data and transitions between loading, success, and failure states using a Finite State Machine (FSM)
// from the useFsm library.

export const BooksLayout = () => {
  const { currentMachineState, transition } = useFsm(fetchMachine);
  const [error, setError] = useState(null);
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
  const getBooksWithFields = (books: any) => {
    return books.filter((bookInfo: any) => {
      return (
        bookInfo.imageLinks &&
        bookInfo.imageLinks.thumbnail &&
        bookInfo.title &&
        bookInfo.authors
      );
    });
  };

  const formatBooksShape = (books: any) => {
    return books.map((bookInfo: any) => {
      return {
        title: bookInfo.title,
        authors: bookInfo.authors,
        imageLink: bookInfo.imageLinks.thumbnail,
      };
    });
  };

  const fetchBooks = async (genre: string) => {
    try {
      const url = `${BASE_BOOKS_URL}subject:${genre}&maxResults=${40}&key=${API_KEY}&langRestrict=en`;
      const booksResponse = await fetchData(url);
      if (!booksResponse || !booksResponse.items) return;

      const books = booksResponse.items.map((item: any) => item.volumeInfo);
      if (!books) return;

      const filteredBooks = getBooksWithFields(books);
      const formattedBooks = formatBooksShape(filteredBooks);
      // Show 20 books
      setBooks(formattedBooks.slice(0, 20));
    } catch (error: any) {
      console.error("Error fetching books:", error);
      setError(error);
    }
  };

  const onClickingEnd = useCallback(
    debounce((genre: string) => {
      fetchBooks(genre);
    }, 600),
    []
  );

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!event || !(event.target instanceof HTMLDivElement)) return;

    const genre = event.target.textContent;
    if (!genre) return;

    transition(TRANSITIONS.LOAD);
    onClickingEnd(genre);
  };

  return (
    <>
      <div className={styles.container}>
        <GenreList onClick={onClick} />
        <div className={styles.center}>
          {currentMachineState == STATES.LOADING && (
            <div data-testid={"loader"}>
              <CircleLoader color="#dedede" size="120px" />
            </div>
          )}
          {currentMachineState == STATES.FAILURE && (
            <div data-testid={"error"}>
              <Error />
            </div>
          )}
        </div>
        {currentMachineState == STATES.SUCCESS && books && (
          <div data-testid={"bookList"}>
            <BookList books={books} />
          </div>
        )}
      </div>
    </>
  );
};
