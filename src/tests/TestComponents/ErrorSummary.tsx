import React from "react";
import { useErrorNavigation } from "../../index";

const ErrorSummary: React.FC = () => {
  const { errorCount, scrollToFirst, scrollToNext } = useErrorNavigation();

  if (errorCount === 0) return null;

  return (
    <div>
      <p>Errors: {errorCount}</p>
      <button onClick={scrollToFirst}>Jump to first error</button>
      <button onClick={scrollToNext}>Next error</button>
    </div>
  );
};

export default ErrorSummary;
