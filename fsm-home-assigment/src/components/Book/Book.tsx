import { Book as BookInterface } from "../../types/types";
import styles from "./Book.module.css";

// Displays information about a book, including its cover image, title, and authors.

interface BookProps {
  book: BookInterface;
}

export const Book = (props: BookProps) => {
  const { book } = props;

  return (
    <div data-testid={"book"}>
      <div className={styles.image}>
        <img src={book.imageLink} alt={`Cover for ${book.title}`} />
      </div>
      <div className={styles.content}>
        <h2>{book.title}</h2>
        <p>{book.authors}</p>
      </div>
    </div>
  );
};
