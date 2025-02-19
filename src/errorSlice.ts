import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ErrorState {
  errors: Record<string, string>;
  uuids: Record<string, string>;
}

const initialState: ErrorState = {
  errors: {},
  uuids: {},
};

const errorSlice = createSlice({
  name: "formErrors",
  initialState,
  reducers: {
    setError(
      state,
      action: PayloadAction<{
        field: string;
        message: string;
        uuid: string;
      }>
    ) {
      const { field, message, uuid } = action.payload;
      state.errors[field] = message;
      state.uuids[field] = uuid;
    },
    clearError(state, action: PayloadAction<string>) {
      const field = action.payload;
      delete state.errors[field];
      delete state.uuids[field];
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
