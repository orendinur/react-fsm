export const TRANSITIONS = {
  LOAD: "load",
  RESOLVE: "resolve",
  REJECT: "reject",
};

export const STATES = {
  DEFAULT: "default",
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

const fetchMachine = {
  initialState: STATES.DEFAULT,
  states: {
    default: {
      onTransition: {
        [TRANSITIONS.LOAD]: {
          targetState: STATES.LOADING,
        },
      },
    },
    loading: {
      onTransition: {
        [TRANSITIONS.RESOLVE]: {
          targetState: STATES.SUCCESS,
        },
        [TRANSITIONS.REJECT]: {
          targetState: STATES.FAILURE,
        },
      },
    },
    success: {
      onTransition: {
        [TRANSITIONS.LOAD]: {
          targetState: STATES.LOADING,
        },
      },
    },
    failure: {
      onTransition: {
        [TRANSITIONS.LOAD]: {
          targetState: STATES.LOADING,
        },
      },
    },
  },
};

export default fetchMachine;
