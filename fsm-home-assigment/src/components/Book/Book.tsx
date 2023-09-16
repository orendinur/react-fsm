import { Book as BookType } from "../../types";
import styles from "./Book.module.css";

interface BookProps {
  book: BookType;
}

export const Book = (props: BookProps) => {
  const { book } = props;

  return (
    <>
      <div className={styles.image}>
        <img src={book.imageLink} alt={`Cover for ${book.title}`} />
      </div>
      <div className={styles.content}>
        <h2>{book.title}</h2>
        <p>{book.authors}</p>
      </div>
    </>
  );
};
