import { useFsm } from "./fsm/useFsm";
import { useEffect } from "react";
import { TRANSITIONS, fetchMachine } from "./light.machine";

export default function App() {
  const [currentValue, transition] = useFsm(fetchMachine);

  const handleClick = () => {
    console.log("oren started timeout.. current state is", currentValue);
    transition(TRANSITIONS.TIMER);
  };
  useEffect(() => {
    console.log("oren current value changed to", currentValue);
  }, [currentValue]);

  return (
    <>
      <button onClick={handleClick}>Transition</button>
      <div>{currentValue}</div>
    </>
  );
}
