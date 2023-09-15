import { useFsm } from "./fsm/useFsm";
import { useEffect } from "react";
import { TRANSITIONS, fetchMachine } from "./light.machine";
import { BookList } from "./components/BookList/BookList";
import { Header } from "./components/Header";
import { BooksLayout } from "./components/BooksLayout/BooksLayout";

export default function App() {
  const [currentValue, transition] = useFsm(fetchMachine);

  return (
    <div>
      <Header />
      <BooksLayout />
    </div>
  );
}
