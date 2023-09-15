import { useFsm } from "./fsm/useFsm";
import { useEffect } from "react";
import { TRANSITIONS, fetchMachine } from "./light.machine";
import { BookList } from "./components/BookList/BookList";

export default function App() {
  const [currentValue, transition] = useFsm(fetchMachine);

  // const handleClick = () => {
  //   console.log("oren started timeout.. current state is", currentValue);
  //   transition(TRANSITIONS.TIMER);
  // };
  // useEffect(() => {
  //   console.log("oren current value changed to", currentValue);
  // }, [currentValue]);

  return (
    <>
      <BookList genre={"fiction"} />
      {/* <button onClick={handleClick}>Transition</button>
      <div>{currentValue}</div> */}
    </>
  );
}
