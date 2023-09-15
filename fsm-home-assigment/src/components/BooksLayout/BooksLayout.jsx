import { useState } from "react";
import { GENRES } from "../../utils/constants";
import styles from "./BooksLayout.module.css";
import { BookList } from "../BookList/BookList";

export const BooksLayout = () => {
  const [genre, setGenre] = useState("");

  const onClick = (event) => {
    console.log("oren selected", event.target.textContent);
    if (!event || event.target.textContent === genre) return;
    setGenre(event.target.textContent);
  };

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.list}>
          {GENRES.map((genre, index) => (
            <li key={index} className={styles.item}>
              <div className={styles.button} onClick={onClick}>
                {genre}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {genre && <BookList genre={genre} />}
    </>
  );
};
