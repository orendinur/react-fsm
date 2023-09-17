import { FiniteStateMachine } from "../fsm/types";

export enum TRANSITIONS {
  LOAD = "load",
  RESOLVE = "resolve",
  REJECT = "reject",
}

export enum STATES {
  DEFAULT = "default",
  LOADING = "loading",
  SUCCESS = "success",
  FAILURE = "failure",
}

const fetchMachine: FiniteStateMachine = {
  initialState: STATES.DEFAULT,
  states: {
    [STATES.DEFAULT]: {
      onTransition: {
        [TRANSITIONS.LOAD]: {
          targetState: STATES.LOADING,
        },
      },
    },
    [STATES.LOADING]: {
      onTransition: {
        [TRANSITIONS.RESOLVE]: {
          targetState: STATES.SUCCESS,
        },
        [TRANSITIONS.REJECT]: {
          targetState: STATES.FAILURE,
        },
      },
    },
    [STATES.SUCCESS]: {
      onTransition: {
        [TRANSITIONS.LOAD]: {
          targetState: STATES.LOADING,
        },
      },
    },
    [STATES.FAILURE]: {
      onTransition: {
        [TRANSITIONS.LOAD]: {
          targetState: STATES.LOADING,
        },
      },
    },
  },
};

export default fetchMachine;
