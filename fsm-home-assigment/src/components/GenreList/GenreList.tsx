import { MouseEventHandler } from "react";
import { GENRES } from "../../utils/constants";
import styles from "./GenreList.module.css";

interface GenreListProps {
  onClick: MouseEventHandler;
}

export const GenreList = (props: GenreListProps) => {
  const { onClick } = props;

  return (
    <ul className={styles.list}>
      {GENRES.map((genre, index) => (
        <li key={index} className={styles.item}>
          <div className={styles.genre} onClick={onClick}>
            {genre}
          </div>
        </li>
      ))}
    </ul>
  );
};
