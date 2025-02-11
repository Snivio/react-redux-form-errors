import React from "react";
import { useErrorHandler } from "../../index";

interface InputFieldProps {
  name: string;
  error?: { message: string };
}

const InputField: React.FC<InputFieldProps> = ({ name, error }) => {
  const ref = useErrorHandler(name, !!error, error?.message);

  return (
    <div>
      <input ref={ref} name={name} aria-describedby={name + "-error"} />
      {error && <div id={name + "-error"}>{error.message}</div>}
    </div>
  );
};

export default InputField;
