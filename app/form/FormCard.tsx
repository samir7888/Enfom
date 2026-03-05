"use client";

import { normalizeField } from "@/lib/validation";
import { useFormEngine } from "@/lib/useFormEngine";
import SuccessOverlay from "./SuccessOverlay";
import { FormConfig } from "../config/forms";
import FormFieldComponent from "./FormFieldComponent";

interface Props {
  config: FormConfig;
}

export default function FormCard({ config }: Props) {
  const isDefault = config.style === "default";
  const fields = config.fields.map(normalizeField);

  const { state, handleChange, handleFileChange, handleSubmit, reset } =
    useFormEngine(fields);

 

  return (
    <div
      className="w-full max-w-[440px] animate-fadeUp rounded-[18px] bg-white p-8 shadow-[0_8px_40px_rgba(79,70,229,0.11)]"
    >
      {state.submitted ? (
        <SuccessOverlay onReset={reset} />
      ) : (
        <>
          {/* Form Title */}
          <div
            className={
              isDefault
                ? "mb-5 border-b-2 border-indigo-100 pb-3 text-[21px] font-bold text-indigo-950"
                : "mb-5 text-[21px] font-bold text-indigo-950"
            }
          >
            {config.formTitle}
          </div>

          {/* Fields */}
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {fields.map((field) => (
              <FormFieldComponent
                key={field.name}
                field={field}
                isDefault={isDefault}
                value={state.values[field.name] ?? ""}
                file={state.files[field.name] ?? null}
                error={state.errors[field.name] ?? ""}
                onChange={handleChange}
                onFileChange={handleFileChange}
                onSubmit={handleSubmit}
              />
            ))}
          </form>
        </>
      )}
    </div>
  );
}
