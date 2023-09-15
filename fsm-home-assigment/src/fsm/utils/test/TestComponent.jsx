import { useEffect } from "react";
import { TRANSITIONS } from "../../../light.machine";
import { useFsm } from "../../useFsm";

export const TestComponent = ({ machine }) => {
  const [currentValue, transition] = useFsm(machine);

  const handleClick = () => {
    console.log("oren started timeout.. current state is", currentValue);
    transition(TRANSITIONS.TIMER);
  };
  useEffect(() => {
    console.log("oren current value changed to", currentValue);
  }, [currentValue]);

  return (
    <>
      <button onClick={handleClick}>Click to transition</button>
      <div>{currentValue}</div>
    </>
  );
};
