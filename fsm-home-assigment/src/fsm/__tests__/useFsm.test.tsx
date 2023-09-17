import { act, render, renderHook, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { describe, expect, it } from "vitest";
import {
  TRANSITIONS,
  endlessTestMachine,
  finalTestMachine,
  STATES,
} from "../utils/test/testMachine";
import { useFsm } from "../useFsm";
import { TestComponent } from "../utils/test/TestComponent";

// This test suite, contains tests to evaluate the behavior of a simple React component that uses the `useFsm` hook.

describe("TestComponent", () => {
  it("should get the initial state machine value", () => {
    render(<TestComponent machine={endlessTestMachine} />);
    expect(
      screen.getByText(endlessTestMachine.initialState)
    ).toBeInTheDocument();
  });
  it("should change state on transition", async () => {
    render(<TestComponent machine={endlessTestMachine} />);
    expect(screen.queryByText(STATES.YELLOW)).toBeNull();

    const button = screen.getByText("Click to transition");
    await userEvent.click(button);
    expect(await screen.findByText(STATES.YELLOW)).toBeInTheDocument();
  });
});

// This test suite, contains tests to evaluate the behavior of the `useFsm` custom hook.

describe("useFsm", () => {
  it("should stay on the same state on non-existing event", async () => {
    const { result } = renderHook(() => useFsm(endlessTestMachine));
    const { currentMachineState, transition } = result.current;
    act(() => {
      transition(TRANSITIONS.NONE);
    });

    const updatedValue = result.current.currentMachineState;
    expect(updatedValue).toBe(currentMachineState);
  });

  it("should return null after transitioning from a final state", () => {
    const { result } = renderHook(() => useFsm(finalTestMachine));
    const { transition } = result.current;
    act(() => {
      transition(TRANSITIONS.NONE);
    });
    const updatedValue = result.current.currentMachineState;
    expect(updatedValue).toBe(null);
  });
});
