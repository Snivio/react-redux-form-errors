Here’s a `README.md` for your package:

---

# 📦 react-redux-form-errors

A lightweight, easy-to-use form error handling and navigation library using **React** and **Redux Toolkit**. This package helps manage form validation errors efficiently while allowing users to navigate through the errors in a sequential manner.

## 🚀 Features

✅ **Centralized error state management** with Redux Toolkit  
✅ **Automatic ref management** for error fields  
✅ **Smooth scrolling** to each error field  
✅ **Error summary display** with navigation  
✅ **TypeScript support**  
✅ **No external dependencies** beyond Redux Toolkit and React

---

## 📌 Installation

Install via npm:

```sh
npm install react-redux-form-errors
```

or using yarn:

```sh
yarn add react-redux-form-errors
```

## 🛠 Setup

### 1️⃣ Add the reducer to your Redux store:

```tsx
import { configureStore } from "@reduxjs/toolkit";
import { errorReducer } from "react-redux-form-errors";

export const store = configureStore({
  reducer: {
    formErrors: errorReducer,
  },
});
```

### 2️⃣ Wrap your app with Redux `Provider`:

```tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
```

---

## 📚 Usage

### **Handling Errors in Input Fields**

Use the `useErrorHandler` hook to manage errors for individual form fields.

```tsx
import React from "react";
import { useErrorHandler } from "react-redux-form-errors";

interface InputFieldProps {
  name: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, error }) => {
  const ref = useErrorHandler(name, !!error, error || "");

  return (
    <div>
      <input ref={ref} name={name} />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default InputField;
```

### **Displaying Error Summary & Navigation**

Use the `useErrorNavigation` hook to navigate through errors.

```tsx
import React from "react";
import { useErrorNavigation } from "react-redux-form-errors";

const ErrorSummary = () => {
  const { errorCount, scrollToFirst, scrollToNext, currentErrorMessage } =
    useErrorNavigation();

  if (errorCount === 0) return null;

  return (
    <div className="error-summary">
      <p>Errors: {errorCount}</p>
      <p>Cuurent Error Message: {currentErrorMessage}</p>
      <button onClick={scrollToFirst}>Jump to first error</button>
      <button onClick={scrollToNext}>Next error</button>
    </div>
  );
};

export default ErrorSummary;
```

---

## 🧪 Running Tests

This package includes tests for its hooks. To run the tests, use:

```sh
npm run test
```

or with yarn:

```sh
yarn test
```

---

## 📝 API Reference

### `useErrorHandler(field: string, hasError: boolean, errorMessage: string): React.RefObject<HTMLInputElement>`

Handles error management for an individual form field.

| Parameter      | Type      | Description                    |
| -------------- | --------- | ------------------------------ |
| `field`        | `string`  | The name of the form field     |
| `hasError`     | `boolean` | Whether the field has an error |
| `errorMessage` | `string`  | The error message to display   |

#### Example:

```tsx
const ref = useErrorHandler("email", true, "Email is required");
```

---

### `useErrorNavigation(): { errorCount: number, scrollToFirst: () => void, scrollToNext: () => void }`

Manages error navigation within the form.

| Property              | Type         | Description                            |
| --------------------- | ------------ | -------------------------------------- |
| `errorCount`          | `number`     | The total number of errors in the form |
| `scrollToFirst`       | `() => void` | Scrolls to the first error field       |
| `scrollToNext`        | `() => void` | Scrolls to the next error field        |
| `currentErrorMessage` | `string`     | Current index error message            |

#### Example:

```tsx
const { errorCount, scrollToFirst, scrollToNext } = useErrorNavigation();
```

---

## 🔗 Peer Dependencies

Ensure the following peer dependencies are installed in your project:

```json
{
  "peerDependencies": {
    "react": "^18.0.0",
    "@reduxjs/toolkit": "^2.0.0"
  }
}
```

---

## 📜 License

This package is licensed under the **MIT License**.

---

## 💡 Contributing

We welcome contributions! Feel free to submit issues or open a pull request.

---

## 📩 Support

If you have any issues or questions, feel free to open an issue on GitHub.

---

This `README.md` provides clear installation steps, usage examples, API references, and testing instructions. Let me know if you’d like any modifications! 🚀
