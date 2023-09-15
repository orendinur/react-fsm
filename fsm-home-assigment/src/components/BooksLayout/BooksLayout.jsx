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
    <div className={styles.container}>
      <ul className={styles.list}>
        {bookCategories.map((category, index) => (
          <li key={index} className={styles.item}>
            <div className={styles.button} onClick={onClick}>
              {category}
            </div>
          </li>
        ))}
      </ul>
    </div>

    // <BookList genre={"fiction"} />;
  );
};
