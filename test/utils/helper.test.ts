import { vi } from "vitest";
import {debounce} from "~/utils/helpers.ts";

vi.useFakeTimers(); // Use fake timers to simulate passage of time

describe("debounce function", () => {
  it("should call the function after the specified delay", () => {
    const mockFunction = vi.fn();
    const debouncedFunction = debounce(mockFunction, 1000);

    // Call the debounced function with a delay
    debouncedFunction("arg1");
    debouncedFunction("arg2");

    // The function should not be called immediately
    expect(mockFunction).not.toHaveBeenCalled();

    // Simulate the passage of time
    vi.advanceTimersByTime(1000);

    // After 1000ms, the function should have been called
    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith("arg2"); // The last argument passed should be used
  });

  it("should call the function only once when called multiple times within the delay period", () => {
    const mockFunction = vi.fn();
    const debouncedFunction = debounce(mockFunction, 500);

    // Call the debounced function multiple times
    debouncedFunction("a");
    debouncedFunction("b");
    debouncedFunction("c");

    // The function should not have been called yet
    expect(mockFunction).not.toHaveBeenCalled();

    // Simulate the passage of time for the first 500ms
    vi.advanceTimersByTime(500);

    // The function should only be called once with the last argument
    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith("c");
  });
});
