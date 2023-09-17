import { useFsm } from "../../useFsm";
import { FiniteStateMachine } from "../../types";
import { TRANSITIONS } from "./testMachine";

// Test the functionality of the useFsm custom hook.
// It provides a simple button that triggers a state transition and displays the current state of the machine.

interface TestComponentProps {
  machine: FiniteStateMachine;
}

export const TestComponent = (props: TestComponentProps) => {
  const { machine } = props;

  const { currentMachineState, transition } = useFsm(machine);

  const handleClick = () => {
    transition(TRANSITIONS.TIMER);
  };

  return (
    <>
      <button onClick={handleClick}>Click to transition</button>
      <div>{currentMachineState}</div>
    </>
  );
};
