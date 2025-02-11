import { render, screen } from "@testing-library/react";
import { useErrorHandler } from "../hooks";
import { Provider } from "react-redux";
import { store } from "../store";
import React from "react";

const TestComponent = ({ field, hasError, errorMessage }: any) => {
  const ref = useErrorHandler(field, hasError, errorMessage);
  return (
    <div>
      <input ref={ref} />
      {hasError && <div>{errorMessage}</div>}
    </div>
  );
};

describe("useErrorHandler hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call setError when there is an error", () => {
    const field = "testField";
    const errorMessage = "This field is required";

    render(
      <Provider store={store}>
        <TestComponent
          field={field}
          hasError={true}
          errorMessage={errorMessage}
        />
      </Provider>
    );

    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  it("should not call setError when there is no error", () => {
    const field = "testField";

    render(
      <Provider store={store}>
        <TestComponent field={field} hasError={false} errorMessage="" />
      </Provider>
    );

    expect(screen.queryByText("This field is required")).not.toBeTruthy();
  });
});
