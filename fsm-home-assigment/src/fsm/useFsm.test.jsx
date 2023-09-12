import { renderHook } from "@testing-library/react";
import { useFsm } from "./useFsm";
import fetchMachine from "../light.machine";

describe("useFsm", () => {
  test("should render the initial machine state", () => {
    const { result } = renderHook(() => useFsm(fetchMachine));
    expect(result.current[0]).toBe(fetchMachine.initialState);
  });
});
