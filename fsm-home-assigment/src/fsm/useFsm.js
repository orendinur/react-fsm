import { useState } from "react";

export const useFsm = (machine) => {
  const [currentState, setCurrentState] = useState(machine?.initialState);

  const transition = (name) => {
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
