import styles from "./BooksLayout.module.css";

const bookCategories = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Romance",
  "Biography",
];

export const BooksLayout = () => {
  const onClick = () => {};

  return (
    <ul className={styles.list}>
      {bookCategories.map((category, index) => (
        <li key={index} className={styles.item}>
          <div className={styles.button} onClick={onClick}>
            {category}
          </div>
        </li>
      ))}
    </ul>

    // <BookList genre={"fiction"} />;
  );
};
