import styles from "./Book.module.css";

export const Book = ({ book }) => {
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
