"use client";


import { FormField } from "../config/forms";
import PasswordStrengthBar from "./PasswordStrengthBar";
import UploadZone from "./UploadZone";

interface Props {
  field: FormField;
  isDefault: boolean;
  value: string;
  file: File | null;
  error: string;
  onChange: (name: string, value: string) => void;
  onFileChange: (name: string, file: File | null) => void;
  onSubmit: () => void;
}

export default function FormFieldComponent({
  field,
  isDefault,
  value,
  file,
  error,
  onChange,
  onFileChange,
  onSubmit,
}: Props) {
  // ── DISPLAY ────────────────────────────────────────────────────────
  if (field.type === "display") {
    return (
      <div style={field.styles as React.CSSProperties}>
        {field.label}
      </div>
    );
  }

  // ── BUTTON ─────────────────────────────────────────────────────────
  if (field.type === "button") {
    if (isDefault || !field.styles) {
      return (
        <button
          type="button"
          onClick={onSubmit}
          className="mt-1.5 w-full rounded-[10px] bg-indigo-600 py-3 text-[15px] font-bold text-white shadow-[0_4px_14px_rgba(79,70,229,0.28)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-[0_6px_20px_rgba(79,70,229,0.35)] active:translate-y-0"
        >
          {field.label ?? "Submit"}
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={onSubmit}
        style={field.styles as React.CSSProperties}
        className="transition-opacity hover:opacity-80"
      >
        {field.label ?? "Submit"}
      </button>
    );
  }

  // ── FILE / IMAGE ───────────────────────────────────────────────────
  if (field.type === "file" || field.type === "image") {
    return (
      <UploadZone
        field={field}
        isDefault={isDefault}
        file={file}
        error={error}
        onChange={(f) => onFileChange(field.name, f)}
      />
    );
  }

  // ── REGULAR INPUT ──────────────────────────────────────────────────
  const baseInputClass =
    "w-full rounded-[10px] border-[1.5px] border-gray-300 bg-gray-50 px-3 py-2.5 text-[15px] text-gray-900 outline-none transition-all duration-200 focus:border-indigo-500 focus:bg-white focus:shadow-[0_0_0_3px_rgba(79,70,229,0.12)] placeholder:text-gray-400";

  const errorInputClass =
    "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]";

  return (
    <div className="mb-4">
      {/* Label */}
      <label
        htmlFor={field.name}
        className={
          isDefault
            ? "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-500"
            : "mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500"
        }
      >
        {field.label ?? field.name}
        {field.required && <span className="ml-1 text-red-400">*</span>}
      </label>

      {/* Input */}
      <input
        id={field.name}
        name={field.name}
        type={field.type}
        placeholder={field.placeholder ?? ""}
        required={field.required}
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={
          isDefault || !field.styles
            ? `${baseInputClass} ${error ? errorInputClass : ""}`
            : undefined
        }
        style={
          !isDefault && field.styles
            ? ({
                ...field.styles,
                ...(error ? { border: "2px solid #ef4444" } : {}),
              } as React.CSSProperties)
            : undefined
        }
        aria-invalid={!!error}
        aria-describedby={error ? `${field.name}-error` : undefined}
      />

      {/* Password strength */}
      {field.type === "password" && field.strengthMeter && (
        <PasswordStrengthBar value={value} />
      )}

      {/* Error */}
      {error && (
        <p
          id={`${field.name}-error`}
          role="alert"
          className="mt-1 animate-shake text-[12px] font-semibold text-red-500"
        >
          {error}
        </p>
      )}
    </div>
  );
}