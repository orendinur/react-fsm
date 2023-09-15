//@ts-nocheck
import { useEffect, useState } from "react";
import { fetchData } from "../../utils/helpers";
import { API_KEY, BASE_BOOKS_URL } from "../../utils/constants";

import { STATES } from "../../utils/fetch.machine";
import { CircleLoader } from "react-spinners";
import styles from "./BookList.module.css";

export const BookList = ({ books }) => {
  return (
    <div className={styles.gridContainer}>
      {books.map((book, index) => (
        <div key={index} className={styles.gridItem}>
          <img src={book.imageLink} alt={`Cover for ${book.title}`} />
        </div>
      ))}
    </div>
  );
};
