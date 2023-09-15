import { useFsm } from "../../fsm/useFsm";
import { useEffect } from "react";
import { TRANSITIONS, fetchMachine } from "../../light.machine";
import { BookList } from "../BookList/BookList";
import { Header } from "../Header";

import styles from "./App.module.css";

export default function App() {
  const [currentValue, transition] = useFsm(fetchMachine);

  return (
    <div className={styles.container}>
      <Header />
      <BookList genre={"fiction"} />
    </div>
  );
}
