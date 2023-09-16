import { Book } from "../Book/Book";
import styles from "./BookList.module.css";

export const BookList = ({ books }) => {
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
