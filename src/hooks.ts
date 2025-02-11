import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, clearError } from "./errorSlice";
import { RootState } from "./store";

export const useErrorHandler = (
  field: string,
  hasError: boolean,
  errorMessage?: string
) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const errors = useSelector((state: RootState) => state.formErrors.errors);

  useEffect(() => {
    if (hasError && errorMessage) {
      dispatch(setError({ field, message: errorMessage, ref: ref.current }));
    } else {
      dispatch(clearError(field));
    }

    return () => {
      dispatch(clearError(field));
    };
  }, [hasError, errorMessage, field, dispatch]);

  return ref;
};

export const useErrorNavigation = () => {
  const { errors, refs } = useSelector((state: RootState) => state.formErrors);
  const errorFields = Object.keys(errors);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToError = (index: number) => {
    const field = errorFields[index];
    const element = refs[field];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.focus();
    }
  };

  return {
    errorCount: errorFields.length,
    scrollToFirst: () => {
      setCurrentIndex(0);
      scrollToError(0);
    },
    scrollToNext: () => {
      const nextIndex = (currentIndex + 1) % errorFields.length;
      setCurrentIndex(nextIndex);
      scrollToError(nextIndex);
    },
  };
};
