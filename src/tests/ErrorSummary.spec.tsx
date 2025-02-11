import { render, screen, fireEvent, act } from "@testing-library/react";
import ErrorSummary from "./TestComponents/ErrorSummary";
import { Provider } from "react-redux";
import { store } from "../store";

describe("ErrorSummary Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders error count and buttons when there are errors", async () => {
    render(
      <Provider store={store}>
        <ErrorSummary />
      </Provider>
    );

    await act(async () => {
      store.dispatch({
        type: "formErrors/setError",
        payload: { field: "field1", message: "Field 1 is required", ref: null },
      });

      store.dispatch({
        type: "formErrors/setError",
        payload: { field: "field2", message: "Field 2 is required", ref: null },
      });
    });
    expect(screen.getByText("Errors: 2")).toBeTruthy();
    expect(screen.getByText("Jump to first error")).toBeTruthy();
    expect(screen.getByText("Next error")).toBeTruthy();
  });

  it("does not render when there are no errors", () => {
    render(
      <Provider store={store}>
        <ErrorSummary />
      </Provider>
    );

    expect(screen.queryByText("Errors:")).toBeNull();
  });
});
