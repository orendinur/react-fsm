import { Book } from "../Book/Book";
import styles from "./BookList.module.css";

export const BookList = ({ books }) => {
  return (
    <div className={styles.gridContainer}>
      {books.map((book, index) => (
        <div className={styles.gridItem}>
          <Book key={index} book={book} />
        </div>
      ))}
    </div>
  );
};
