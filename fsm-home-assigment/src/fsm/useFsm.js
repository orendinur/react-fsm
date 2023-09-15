import { useState } from "react";

export const useFsm = (machine) => {
  console.log("useFsm Render with currentState");
  const [currentState, setCurrentState] = useState(machine?.initialState);
  console.log("oren useFsm Render with currentState", currentState);

  const transition = (name) => {
    if (!machine || !machine.states || !currentState) return;

    console.log("oren currentState within useFsm is", currentState);
    console.log("oren 1 name", name);

    const currentDefinition = machine.states[currentState];
    console.log("oren 2 currentDefinition", currentDefinition);
    console.log("oren 2.5 currentState", currentState);
    if (!currentDefinition) return;

    if (currentDefinition.isFinalState) {
      setCurrentState(null);
    }

    const destinationTransition =
      currentDefinition.onTransition && currentDefinition.onTransition[name];
    console.log(
      "oren 3 destinationTransition, currentDefinition.onTransition",
      destinationTransition,
      currentDefinition.onTransition
    );
    if (!destinationTransition) return;

    console.log("oren 4", destinationTransition.targetState);

    if (destinationTransition.targetState) {
      console.log("oren 4.5");
      setCurrentState(destinationTransition.targetState);
    }
  };

  return [currentState, transition];
};
