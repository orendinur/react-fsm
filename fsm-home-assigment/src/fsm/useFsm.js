import { useState } from "react";

export const useFsm = (machine) => {
  const [currentValue, setCurrentValue] = useState(machine.initialState);

  const transition = (name) => {
    if (!machine.states || !currentValue) return;

    const currentDefinition = machine.states[currentValue];
    if (!currentDefinition) return;

    const destinationTransition =
      currentDefinition.onTransition && currentDefinition.onTransition[name];
    if (!destinationTransition) return;

    if (destinationTransition.targetState) {
      setCurrentValue(destinationTransition.targetState);
    }
  };

  return [currentValue, transition];
};
