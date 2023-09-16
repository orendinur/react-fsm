import { useState } from "react";
import { FiniteStateMachine, TransitionName } from "./types";

interface UseFsmProps {
  machine: FiniteStateMachine;
}

export const useFsm = (props: UseFsmProps) => {
  const { machine } = props;

  const [currentState, setCurrentState] = useState<string | null>(
    machine?.initialState
  );

  const transition = (name: TransitionName) => {
    if (!machine || !machine.states || !currentState) return;

    const currentDefinition = machine.states[currentState];
    if (!currentDefinition) return;

    if (currentDefinition.isFinalState) {
      setCurrentState(null);
    }

    const destinationTransition =
      currentDefinition.onTransition && currentDefinition.onTransition[name];
    if (!destinationTransition) return;

    if (destinationTransition.targetState) {
      setCurrentState(destinationTransition.targetState);
    }
  };

  return [currentState, transition];
};
