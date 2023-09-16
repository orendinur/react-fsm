import { Book as BookInterface } from "../../types/types";
import { Book } from "../Book";
import styles from "./BookList.module.css";

// Displays a list of books using the Book component.
// It takes an array of book objects (of type Book) as a prop, and renders them in a grid layout.

interface BookListProps {
  books: BookInterface[];
}
export const BookList = (props: BookListProps) => {
  const { books } = props;

  return (
    <div className={styles.gridContainer}>
      {books.map((book, index) => (
        <div key={index} className={styles.gridItem}>
          <Book book={book} />
        </div>
      ))}
    </div>
  );
};
