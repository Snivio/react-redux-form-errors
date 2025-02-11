import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ErrorState {
  errors: Record<string, string>;
  refs: Record<string, HTMLElement | null | any>;
}

const initialState: ErrorState = {
  errors: {},
  refs: {},
};

const errorSlice = createSlice({
  name: "formErrors",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{
        field: string;
        message: string;
        ref: HTMLElement | null;
      }>
    ) => {
      const { field, message, ref } = action.payload;
      state.errors[field] = message;
      state.refs[field] = ref;
    },
    clearError: (state, action: PayloadAction<string>) => {
      const field = action.payload;
      delete state.errors[field];
      delete state.refs[field];
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
