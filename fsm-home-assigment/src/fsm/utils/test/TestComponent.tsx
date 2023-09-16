import { useFsm } from "../../useFsm";
import { FiniteStateMachine } from "../../types";
import { TRANSITIONS } from "./testMachine";

interface TestComponentProps {
  machine: FiniteStateMachine;
}
export const TestComponent = (props: TestComponentProps) => {
  const { machine } = props;

  const [currentMachineState, transition] = useFsm(machine);

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
