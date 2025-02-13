import { useRef, useEffect, useState, useCallback } from "react";
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
      dispatch(
        setError({
          field,
          message: errorMessage,
          ref: ref.current,
        })
      );
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const errorFields = Object.keys(errors);

  useEffect(() => {
    if (currentIndex >= errorFields.length) {
      setCurrentIndex(Math.max(0, errorFields.length - 1));
    }
  }, [errorFields.length, currentIndex]);

  const getCurrentFields = useCallback(() => {
    return errorFields.map((field) => ({
      field,
      message: errors[field],
      ref: refs[field],
    }));
  }, [errorFields, errors, refs]);

  const scrollToError = useCallback(
    (index: number) => {
      const fields = getCurrentFields();
      if (fields.length === 0) return;
      const adjustedIndex = Math.max(0, Math.min(index, fields.length - 1));
      const element = fields[adjustedIndex]?.ref;

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
        setCurrentIndex(adjustedIndex);
      }
    },
    [getCurrentFields]
  );

  const scrollToFirst = useCallback(() => {
    setCurrentIndex(0);
    scrollToError(0);
  }, [scrollToError]);

  const scrollToNext = useCallback(() => {
    const nextIndex =
      errorFields.length > 0 ? (currentIndex + 1) % errorFields.length : 0;
    scrollToError(nextIndex);
  }, [currentIndex, errorFields.length, scrollToError]);

  const scrollToErrorByField = useCallback(
    (fieldName: string) => {
      const index = errorFields.indexOf(fieldName);
      if (index >= 0) {
        scrollToError(index);
      }
    },
    [errorFields, scrollToError]
  );

  const currentErrorMessage = getCurrentFields()[currentIndex]?.message || "";

  return {
    errorCount: errorFields.length,
    errors: getCurrentFields(),
    currentErrorIndex: currentIndex,
    currentErrorMessage,
    scrollToFirst,
    scrollToNext,
    scrollToError: scrollToErrorByField,
  };
};
