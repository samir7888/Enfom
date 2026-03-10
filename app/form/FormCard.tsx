"use client";
import React, { useState } from "react";
import { normalizeField } from "@/lib/validation";
import { useFormEngine } from "@/lib/useFormEngine";
import SuccessOverlay from "./SuccessOverlay";
import FormFieldComponent from "./FormFieldComponent";
import { FormConfig } from "../config/forms";
import { useAppMutation } from "@/hooks/useAppMutation";
import { useUser } from "@/contexts/userContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, CreditCard, Landmark } from "lucide-react";

interface Props {
  config: FormConfig;
}

export default function FormCard({ config }: Props) {
  const { user } = useUser();
  const { mutate, isPending } = useAppMutation();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const isDefault = config.isStyle === false;

  // Support both fields and templateFields for backward compatibility
  const rawFields = config.fields || (config as any).templateFields || [];
  const fields = rawFields.map(normalizeField);

  const { state, handleChange, handleFileChange, handleSubmit: validate, reset } =
    useFormEngine(fields);

  const handleSubmit = (paymentMethod: string = "Direct") => {
    const payload = {
      formTemplateId: config.id,
      userId: user?.sub || "anonymous",
      formData: JSON.stringify(state.values),
      isPaid: config.isPaid ?? false,
      submittedAt: new Date().toISOString(),
    };

    mutate({
      endpoint: "FormSubmission",
      method: "post",
      data: payload,
      onSuccess: () => {
        toast.success("Form submitted successfully!");
        setShowPaymentDialog(false);
      },
      onError: (err) => {
        console.error("Submission error:", err);
        toast.error("Failed to submit form. Please try again.");
      },
    });
  };

  const handleInitialSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    if (config.isCashAvailable) {
      setShowPaymentDialog(true);
    } else {
      handleSubmit("Direct");
    }
  };

  return (
    <div
      className="w-full max-w-[440px] animate-fadeUp rounded-[18px] bg-white p-8 shadow-[0_8px_40px_rgba(79,70,229,0.11)]"
    >

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
          onSubmit={handleInitialSubmit}
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
              onSubmit={handleInitialSubmit}
            />
          ))}
        </form>
      </>


      {/* Payment Method Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md bg-white border-2 border-indigo-100 rounded-3xl p-8 shadow-2xl overflow-hidden">
          {/* Vibrant Top Accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>

          <DialogHeader className="mb-6">
            <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 ring-8 ring-emerald-50/50">
              <Landmark className="w-8 h-8 text-emerald-600" />
            </div>
            <DialogTitle className="text-2xl font-black text-slate-900 text-center tracking-tight">
              Payment Required
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-center mt-2 font-medium">
              This form requires a payment of <span className="text-indigo-600 font-bold">Rs. {config.price}</span> to complete the submission.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* eSewa Option */}
            <Button
              onClick={() => handleSubmit("eSewa")}
              disabled={isPending}
              className="w-full group relative h-16 bg-white hover:bg-emerald-50 border-2 border-slate-100 hover:border-emerald-200 text-slate-700 rounded-2xl flex items-center gap-4 transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 bg-[#60bb46] rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-110 transition-transform">
                <span className="text-white font-black text-xs">e</span>
              </div>
              <div className="flex flex-col items-start translate-y-[1px]">
                <span className="text-[15px] font-bold text-slate-800">eSewa Mobile Wallet</span>
                <span className="text-[11px] text-slate-400 font-medium">Fast and secure digital payment</span>
              </div>
              <Wallet className="ml-auto w-5 h-5 text-slate-300 group-hover:text-emerald-500 pr-2 transition-colors" />
            </Button>

            {/* Khalti Option */}
            <Button
              onClick={() => handleSubmit("Khalti")}
              disabled={isPending}
              className="w-full group relative h-16 bg-white hover:bg-purple-50 border-2 border-slate-100 hover:border-purple-200 text-slate-700 rounded-2xl flex items-center gap-4 transition-all duration-200 active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              <div className="w-10 h-10 bg-[#5c2d91] rounded-xl flex items-center justify-center shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">
                <span className="text-white font-black text-xs">k</span>
              </div>
              <div className="flex flex-col items-start translate-y-[1px]">
                <span className="text-[15px] font-bold text-slate-800">Khalti Digital Wallet</span>
                <span className="text-[11px] text-slate-400 font-medium">Simple and reliable payments</span>
              </div>
              <CreditCard className="ml-auto w-5 h-5 text-slate-300 group-hover:text-purple-500 pr-2 transition-colors" />
            </Button>
          </div>

          <DialogFooter className="mt-8">
            <p className="text-[10px] text-slate-400 text-center w-full font-medium tracking-wide uppercase">
              Securely powered by Enfom Payment Gateway
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface IPaymentProps {
  method: PaymentMethod;
  config: FormConfig;
}

type PaymentMethod = "eSewa" | "Khalti";

const handlePayment = (props: IPaymentProps) => {

}