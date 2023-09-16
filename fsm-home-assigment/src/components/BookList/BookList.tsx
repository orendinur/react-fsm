import { Book as BookInterface } from "../../types";
import { Book } from "../Book";
import styles from "./BookList.module.css";

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
