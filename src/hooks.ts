import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { clearError, setError } from "./errorSlice";
import { RootState } from "./store";

export const useErrorHandler = (
  field: string,
  hasError: boolean,
  errorMessage?: string
) => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement | null>(null);
  const [fieldUUID] = useState(() => uuidv4());

  useEffect(() => {
    if (hasError && errorMessage) {
      if (ref.current) {
        ref.current.setAttribute("data-error-id", fieldUUID);
      }

      dispatch(
        setError({
          field,
          message: errorMessage,
          uuid: fieldUUID,
        })
      );
    } else {
      if (ref.current) {
        ref.current.removeAttribute("data-error-id");
      }
      dispatch(clearError(field));
    }

    return () => {
      dispatch(clearError(field));
      if (ref.current) {
        ref.current.removeAttribute("data-error-id");
      }
    };
  }, [hasError, errorMessage, field, dispatch, fieldUUID]);

  return ref;
};

export const useErrorNavigation = () => {
  const { errors, uuids } = useSelector((state: RootState) => state.formErrors);
  const [currentIndex, setCurrentIndex] = useState(0);
  const errorFields = Object.keys(errors);

  const errorUUIDs = useMemo(
    () => errorFields.map((field) => uuids[field]),
    [errorFields, uuids]
  );

  const getElementByUUID = useCallback((uuid: string) => {
    return document.querySelector<HTMLElement>(`[data-error-id="${uuid}"]`);
  }, []);

  const getCurrentFields = useCallback(() => {
    return errorFields.map((field) => ({
      field,
      message: errors[field],
      ref: getElementByUUID(uuids[field]),
    }));
  }, [errorFields, errors, uuids, getElementByUUID]);

  const scrollToError = useCallback(
    (index: number) => {
      const uuid = errorUUIDs[index];
      if (!uuid) return;

      const element = getElementByUUID(uuid);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
        setCurrentIndex(index);
      }
    },
    [errorUUIDs, getElementByUUID]
  );

  const scrollToFirst = useCallback(() => {
    scrollToError(0);
  }, [scrollToError]);

  const scrollToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % errorFields.length;
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
