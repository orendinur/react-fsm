import { FiniteStateMachine } from "../../types";

export enum TRANSITIONS {
  TIMER = "timer",
  NONE = "none",
}

export enum STATES {
  RED = "red",
  YELLOW = "yellow",
  GREEN = "green",
}

export const endlessTestMachine: FiniteStateMachine = {
  initialState: STATES.RED,
  states: {
    red: {
      onTransition: {
        [TRANSITIONS.TIMER]: {
          targetState: STATES.YELLOW,
        },
      },
    },
    yellow: {
      onTransition: {
        [TRANSITIONS.TIMER]: {
          targetState: STATES.GREEN,
        },
      },
    },
    green: {
      onTransition: {
        [TRANSITIONS.TIMER]: {
          targetState: STATES.RED,
        },
      },
    },
  },
};

export const finalTestMachine = {
  initialState: STATES.RED,
  states: {
    red: {
      isFinalState: true,
    },
  },
};

export default endlessTestMachine;
