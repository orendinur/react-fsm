import { useState } from "react";
import { FiniteStateMachine, Transition, TransitionName } from "./types";

// The useFsm custom hook is designed to create and manage a Finite State Machine (FSM) within React components.
// It provides functionality to retrieve the current state of the FSM and trigger machine state transitions.

export const useFsm = (machine: FiniteStateMachine) => {
  const [currentMachineState, setCurrentMachineState] = useState<string | null>(
    machine?.initialState
  );

  const transition: Transition = (name: TransitionName) => {
    if (!machine || !machine.states || !currentMachineState) return;

    const currentDefinition = machine.states[currentMachineState];
    if (!currentDefinition) return;

    if (currentDefinition.isFinalState) {
      setCurrentMachineState(null);
    }

    const destinationTransition =
      currentDefinition.onTransition && currentDefinition.onTransition[name];
    if (!destinationTransition) return;

    if (destinationTransition.targetState) {
      setCurrentMachineState(destinationTransition.targetState);
    }
  };

  return { currentMachineState, transition };
};
