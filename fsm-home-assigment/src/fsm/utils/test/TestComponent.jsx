import { useEffect } from "react";
import { TRANSITIONS } from "../../../utils/light.machine";
import { useFsm } from "../../useFsm";

export const TestComponent = ({ machine }) => {
  const [currentMachineState, transition] = useFsm(machine);

  const handleClick = () => {
    console.log("oren started timeout.. current state is", currentMachineState);
    transition(TRANSITIONS.TIMER);
  };
  useEffect(() => {
    console.log("oren current value changed to", currentMachineState);
  }, [currentMachineState]);

  return (
    <>
      <button onClick={handleClick}>Click to transition</button>
      <div>{currentMachineState}</div>
    </>
  );
};
