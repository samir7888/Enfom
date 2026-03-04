"use client";

import { useCallback, useReducer } from "react";

import { validateField, validateFile } from "@/lib/validation";
import { FormField, FormState } from "@/app/config/forms";

// ── Reducer ────────────────────────────────────────────────────────────
type Action =
  | { type: "SET_VALUE"; name: string; value: string }
  | { type: "SET_FILE";  name: string; file: File | null }
  | { type: "SET_ERROR"; name: string; error: string }
  | { type: "CLEAR_ERROR"; name: string }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "SUBMIT" }
  | { type: "RESET" };

const initialState: FormState = {
  values:    {},
  files:     {},
  errors:    {},
  submitted: false,
};

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_VALUE":
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value },
        errors: { ...state.errors, [action.name]: "" },
      };
    case "SET_FILE":
      return {
        ...state,
        files:  { ...state.files,  [action.name]: action.file },
        errors: { ...state.errors, [action.name]: "" },
      };
    case "SET_ERROR":
      return { ...state, errors: { ...state.errors, [action.name]: action.error } };
    case "CLEAR_ERROR":
      return { ...state, errors: { ...state.errors, [action.name]: "" } };
    case "SET_ERRORS":
      return { ...state, errors: { ...state.errors, ...action.errors } };
    case "SUBMIT":
      return { ...state, submitted: true };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
}

// ── Hook ───────────────────────────────────────────────────────────────
export function useFormEngine(fields: FormField[]) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = useCallback((name: string, value: string) => {
    dispatch({ type: "SET_VALUE", name, value });
  }, []);

  const handleFileChange = useCallback((name: string, file: File | null) => {
    dispatch({ type: "SET_FILE", name, file });
  }, []);

  const handleSubmit = useCallback((): boolean => {
    const errors: Record<string, string> = {};
    let hasError = false;

    fields.forEach((field) => {
      if (field.type === "button" || field.type === "display") return;

      if (field.type === "file" || field.type === "image") {
        const file = state.files[field.name] ?? null;
        const result = validateFile(field, file);
        if (!result.isValid) {
          hasError = true;
          errors[field.name] = result.error ?? "Invalid file.";
        }
        return;
      }

      const value = state.values[field.name] ?? "";
      const result = validateField(field, value);
      if (!result.isValid) {
        hasError = true;
        errors[field.name] = result.error ?? "Invalid value.";
      }
    });

    if (hasError) {
      dispatch({ type: "SET_ERRORS", errors });
      return false;
    }

    // Log collected data (replace with API call in production)
    const data: Record<string, string> = {};
    fields.forEach((f) => {
      if (f.type === "button" || f.type === "display") return;
      if (f.type === "file" || f.type === "image") {
        const file = state.files[f.name];
        if (file) data[f.name] = file.name;
      } else {
        data[f.name] = state.values[f.name] ?? "";
      }
    });
    console.log("📤 Form submitted:", data);

    dispatch({ type: "SUBMIT" });
    return true;
  }, [fields, state]);

  const reset = useCallback(() => {
    dispatch({ type: "RESET" });
  }, []);

  return { state, handleChange, handleFileChange, handleSubmit, reset };
}