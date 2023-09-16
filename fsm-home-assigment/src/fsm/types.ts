export type StateName = string;
export type TransitionName = string;
export interface FinalStateInterface {
  isFinalState: boolean;
}

export interface FiniteStateMachine {
  initialState: StateName;
  states: Record<StateName, StateTransitions>;
}

export interface StateTransitions {
  onTransition?: Record<TransitionName, TargetState>;
  isFinalState?: boolean;
}

export interface TargetState {
  targetState: StateName;
}
