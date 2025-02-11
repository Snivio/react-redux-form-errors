import { act, render, screen, waitFor } from "@testing-library/react";
import InputField from "./TestComponents/InputField";
import { Provider } from "react-redux";
import { store } from "../store";

describe("InputField Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("renders without error when there is no error", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <InputField name="testField" />
        </Provider>
      );
    });
    expect(screen.getByRole("textbox")).toBeTruthy();
  });

  it("displays an error message when passed error prop", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <InputField
            name="testField"
            error={{ message: "This field is required" }}
          />
        </Provider>
      );
    });
    await waitFor(() => {
      expect(screen.getByText("This field is required")).toBeTruthy();
    });
  });
});
