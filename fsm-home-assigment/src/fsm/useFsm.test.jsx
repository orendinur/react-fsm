import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { TestComponent } from "./utils";
import { testMachine } from "./utils/testMachine";

describe("useFsm", () => {
  test("should get the initial machine state value", () => {
    render(<TestComponent machine={testMachine} />);
    screen.debug();
    expect(screen.getByText(testMachine.initialState)).toBeInTheDocument();
  });
});
// test("should stay on same state on non-existing event", () => {
//   render(<TestComponent />);

//   const { result } = renderHook(() => useFsm(fetchMachine));
//   const [initialValue, transition] = result.current;
//   console.log("oren initialValue", initialValue);
//   act(() => {
//     transition(TRANSITIONS.TIMER);
//   });

//   const [updateValue] = result.current;
//   console.log("oren updated value", updateValue);
//   expect(updateValue).toBe(initialValue);
// });
// }
// );
