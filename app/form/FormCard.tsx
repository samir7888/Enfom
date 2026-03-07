"use client";

import { normalizeField } from "@/lib/validation";
import { useFormEngine } from "@/lib/useFormEngine";
import SuccessOverlay from "./SuccessOverlay";
import FormFieldComponent from "./FormFieldComponent";
import { FormConfig } from "../config/forms";
import { useAppMutation } from "@/hooks/useAppMutation";
import { useUser } from "@/contexts/userContext";
import { toast } from "sonner";

interface Props {
  config: FormConfig;
}

export default function FormCard({ config }: Props) {
  const { user } = useUser();
  const { mutate, isPending } = useAppMutation();
  const isDefault = config.isStyle === false;

  // Support both fields and templateFields for backward compatibility
  const rawFields = config.fields || (config as any).templateFields || [];
  const fields = rawFields.map(normalizeField);

  const { state, handleChange, handleFileChange, handleSubmit: validate, reset } =
    useFormEngine(fields);

  const handleSubmit = () => {
    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    const payload = {
      formTemplateId: config.id,
      userId: user?.sub || "anonymous",
      formData: JSON.stringify(state.values),
      isPaid: config.isPaid ?? false,
      paymentMethod: "Direct",
      paidAmount: config.price ?? 0,
      submittedAt: new Date().toISOString(),
    };

    mutate({
      endpoint: "FormSubmission", // Updated to follow schema context
      method: "post",
      data: payload,
      onSuccess: () => {
        toast.success("Form submitted successfully!");
        // The useFormEngine already sets state.submitted to true via validate()
        // but we could also trigger a custom success state if needed.
      },
      onError: (err) => {
        console.error("Submission error:", err);
        toast.error("Failed to submit form. Please try again.");
      },
    });
  };




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
            {fields.map((field: any) => (
              <FormFieldComponent
                key={field.name}
                field={field}
                isDefault={isDefault}
                value={state.values[field.name] ?? ""}
                file={state.files[field.name] ?? null}
                error={state.errors[field.name] ?? ""}
                isPending={isPending}
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
