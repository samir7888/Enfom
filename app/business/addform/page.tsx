// app/forms/create/page.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useAppMutation } from "@/hooks/useAppMutation";
import { useRouter } from "next/navigation";

// Types
interface FormState {
  formName: string;
  formDescription: string;
  formTemplate: string;
  availableForm: number;
  loginUserOnly: boolean;
  autoCloseWhenFull: boolean;
  allowMultipleSubmission: boolean;
  paymentRequired: boolean;
  requiredPaymentAmount: number;
  imageFields: ImageField[];
  uploadedImages: UploadedImage[];
}

interface ImageField {
  type: string;
  name: string;
  icon: string;
  id: string;
}

interface UploadedImage {
  url: string;
  name: string;
  size: number;
}

interface PaymentDetails {
  amount: number;
  method: string;
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface CurrentForm {
  id: string;
  formFor: string;
  createdBy: string;
  createdAt: Date;
}

// Field Types Configuration
const FIELD_TYPES = [
  {
    type: "profile-photo",
    label: "Profile Photo",
    icon: "👤",
    svgIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
      </svg>
    ),
  },
  {
    type: "document",
    label: "Document",
    icon: "📄",
    svgIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M7 6.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V9.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V9s1.54-1.274 1.639-1.208M5 11h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1" />
      </svg>
    ),
  },
  {
    type: "id-card",
    label: "ID Card",
    icon: "🪪",
    svgIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6m5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1z" />
      </svg>
    ),
  },
  {
    type: "certificate",
    label: "Certificate",
    icon: "📜",
    svgIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
        <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
      </svg>
    ),
  },
  {
    type: "signature",
    label: "Signature",
    icon: "✍️",
    svgIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
      </svg>
    ),
  },
  {
    type: "custom",
    label: "Custom Image",
    icon: "🖼️",
    svgIcon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
        <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
        <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1z" />
      </svg>
    ),
  },
];

// Image Field Preview Component
const ImageFieldPreview: React.FC<{ field: ImageField }> = ({ field }) => {
  const [uploadedFile, setUploadedFile] = useState<{
    url: string;
    name: string;
    size: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      setUploadedFile({
        url: ev.target?.result as string,
        name: file.name,
        size: (file.size / 1024).toFixed(2),
      });
    };
    reader.readAsDataURL(file);
  };

  if (uploadedFile) {
    return (
      <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
          <Image
            src={uploadedFile.url}
            alt={uploadedFile.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-blue-900">
            {uploadedFile.name}
          </div>
          <div className="text-xs text-gray-600">{uploadedFile.size} KB</div>
        </div>
        <button
          onClick={() => setUploadedFile(null)}
          className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
        >
          Remove
        </button>
      </div>
    );
  }

  return (
    <div
      onClick={() => fileInputRef.current?.click()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="text-4xl mb-2">{field.icon}</div>
      <div className="text-sm text-gray-600">
        Click to upload {field.name.toLowerCase()}
      </div>
    </div>
  );
};

export default function FormCreate() {
  // State
  const [currentForm] = useState<CurrentForm>({
    id: "FORM001",
    formFor: "Student Registration",
    createdBy: "Admin",
    createdAt: new Date(),
  });

  const [formState, setFormState] = useState<FormState>({
    formName: "Student Registration",
    formDescription: "Admission form for new students",
    formTemplate: "Name,Age,City,Email,Phone,Address",
    availableForm: 0,
    loginUserOnly: false,
    autoCloseWhenFull: false,
    allowMultipleSubmission: false,
    paymentRequired: false,
    requiredPaymentAmount: 10.0,
    imageFields: [],
    uploadedImages: [],
  });

  const [payment, setPayment] = useState<PaymentDetails>({
    amount: 10.0,
    method: "credit_card",
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [activeTab, setActiveTab] = useState<"general" | "engine">("general");
  const [isDragOver, setIsDragOver] = useState(false);
  const [startTimeDisplay, setStartTimeDisplay] = useState("");

  const imageUploadInputRef = useRef<HTMLInputElement>(null);

  // Computed
  const templateFields = React.useMemo(
    () =>
      formState.formTemplate
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    [formState.formTemplate]
  );

  // Effects
  useEffect(() => {
    const updateStartTime = () => {
      const diffMs = Date.now() - currentForm.createdAt.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) setStartTimeDisplay("just now");
      else if (diffMins < 60) setStartTimeDisplay(`${diffMins}m ago`);
      else setStartTimeDisplay(`${Math.floor(diffMins / 60)}h ago`);
    };

    updateStartTime();
    const timer = setInterval(updateStartTime, 60000);
    return () => clearInterval(timer);
  }, [currentForm.createdAt]);

  // Handlers
  const getInputType = (fieldName: string): string => {
    const lower = fieldName.toLowerCase();
    if (lower.includes("email")) return "email";
    if (lower.includes("phone")) return "tel";
    if (lower.includes("age")) return "number";
    if (lower.includes("date")) return "date";
    return "text";
  };

  const addImageField = (type: string) => {
    const field = FIELD_TYPES.find((f) => f.type === type);
    if (!field) return;

    setFormState((prev) => ({
      ...prev,
      imageFields: [
        ...prev.imageFields,
        {
          type,
          name: field.label,
          icon: field.icon,
          id: `img_${Date.now()}`,
        },
      ],
    }));
  };

  const removeImageField = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      imageFields: prev.imageFields.filter((_, i) => i !== index),
    }));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormState((prev) => ({
          ...prev,
          uploadedImages: [
            ...prev.uploadedImages,
            {
              url: e.target?.result as string,
              name: file.name,
              size: file.size,
            },
          ],
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter((_, i) => i !== index),
    }));
  };

  const router = useRouter();
  const { mutate, isPending } = useAppMutation();

  const handlePublishForm = () => {
    // Combine text fields from template and names from image fields
    const allFields = [
      ...templateFields,
      ...formState.imageFields.map((field) => field.name),
    ];

    const config = {
      id: currentForm.id,
      formName: formState.formName,
      description: formState.formDescription,
      price: formState.requiredPaymentAmount,
      isCashAvailable: formState.paymentRequired,
      templateFields: JSON.stringify(allFields),
      createdAt: currentForm.createdAt.toISOString(),
      publishedAt: new Date().toISOString(),
      isStyle: false
    };

    const response = mutate({
      endpoint: "FormTemplates/CreateForm",
      method: "post",
      data: config,
      onSuccess: (res: any) => {
        router.push("/business/formcreate");
      },
      onError: (err) => {
        console.log(err);
      }
    });
  };
  const handleEditForm = () => {
    // Combine text fields from template and names from image fields
    const allFields = [
      ...templateFields,
      ...formState.imageFields.map((field) => field.name),
    ];

    const config = {
      id: currentForm.id,
      formName: formState.formName,
      description: formState.formDescription,
      price: formState.requiredPaymentAmount,
      isCashAvailable: formState.paymentRequired,
      templateFields: JSON.stringify(allFields),
      createdAt: currentForm.createdAt.toISOString(),
      publishedAt: new Date().toISOString(),
      isStyle: true
    };

    const response = mutate({
      endpoint: "FormTemplates/CreateForm",
      method: "post",
      data: config,
      onSuccess: (res: any) => {
        console.log(res.data.id,'id');
        router.push("/business/formedit?id=" + res.data.id);
      },
      onError: (err) => {
        console.log(err);
      }
    });
  };

  const formatCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    const formatted = value.match(/.{1,4}/g)?.join(" ") || value;
    setPayment((prev) => ({ ...prev, cardNumber: formatted }));
  };

  const formatExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2, 4);
    }
    setPayment((prev) => ({ ...prev, expiryDate: value }));
  };

  useEffect(() => {
    // Save formState to localStorage whenever it changes
    localStorage.setItem("formData", JSON.stringify(formState));
  }, [formState]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white pr-24 py-3  flex items-center justify-between z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/projects"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              fill="currentColor"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
              />
            </svg>
          </Link>
          <div className="text-sm font-medium">
            <span className="text-gray-400">Projects</span>
            <span className="text-gray-400 mx-1">›</span>
            <span className="text-gray-900">New Form</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleEditForm}
            className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Edit Form
          </button>
          <button
            disabled={isPending}
            onClick={handlePublishForm}
            className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
          >
            {isPending ? "Publishing..." : "Publish Form"}
          </button>
        </div>
      </nav>

      {/* Main Container */}
      <div className="pt-14  w-full  mx-auto flex  h-full">
        {/* Left Panel */}
        <div className="bg-white w-full  rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            <button
              className={`flex-1 px-5 py-4 text-sm font-medium transition-all relative ${activeTab === "general"
                ? "text-blue-600 bg-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              onClick={() => setActiveTab("general")}
            >
              General Details
              {activeTab === "general" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              className={`flex-1 px-5 py-4 text-sm font-medium transition-all relative ${activeTab === "engine"
                ? "text-blue-600 bg-white"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              onClick={() => setActiveTab("engine")}
            >
              Form Engine
              {activeTab === "engine" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* General Details Tab */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <div className="border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Form Create
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-emerald-600">
                    <span className="w-2 h-2 bg-emerald-600 rounded-full" />
                    <span>Started on • {startTimeDisplay}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Form Name
                    </label>
                    <input
                      type="text"
                      value={formState.formName}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          formName: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter form name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Form Description
                    </label>
                    <textarea
                      value={formState.formDescription}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          formDescription: e.target.value,
                        }))
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      placeholder="Enter description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Form Template
                    </label>
                    <input
                      type="text"
                      value={formState.formTemplate}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          formTemplate: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="e.g., Name,Age,Date..."
                    />
                    <div className="mt-2 p-3 bg-gray-50 rounded-md">
                      {templateFields.length > 0 ? (
                        templateFields.map((field) => (
                          <span
                            key={field}
                            className="inline-block px-2 py-1 mr-1 mb-1 text-xs font-medium text-blue-900 bg-blue-100 rounded"
                          >
                            {field}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">
                          No fields defined
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">
                      Available Form
                    </label>
                    <input
                      type="number"
                      value={formState.availableForm}
                      onChange={(e) =>
                        setFormState((prev) => ({
                          ...prev,
                          availableForm: parseInt(e.target.value) || 0,
                        }))
                      }
                      min="0"
                      className="w-24 px-3 py-2 text-center border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                      Visibility Access
                    </h4>

                    <div className="space-y-4">
                      <ToggleItem
                        label="Login User Only"
                        checked={formState.loginUserOnly}
                        onChange={(checked) =>
                          setFormState((prev) => ({
                            ...prev,
                            loginUserOnly: checked,
                          }))
                        }
                      />
                      <ToggleItem
                        label="Auto Close When Full"
                        checked={formState.autoCloseWhenFull}
                        onChange={(checked) =>
                          setFormState((prev) => ({
                            ...prev,
                            autoCloseWhenFull: checked,
                          }))
                        }
                      />
                      <ToggleItem
                        label="Allow Multiple Submission"
                        checked={formState.allowMultipleSubmission}
                        onChange={(checked) =>
                          setFormState((prev) => ({
                            ...prev,
                            allowMultipleSubmission: checked,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">
                      Payment Settings
                    </h4>

                    <ToggleItem
                      label="Enable Payment Required"
                      checked={formState.paymentRequired}
                      onChange={(checked) =>
                        setFormState((prev) => ({
                          ...prev,
                          paymentRequired: checked,
                        }))
                      }
                      highlight
                    />

                    {formState.paymentRequired && (
                      <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                        <label className="block text-sm font-semibold text-amber-800 mb-2">
                          💵 Payment Amount Required (USD)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-800">
                            $
                          </span>
                          <input
                            type="number"
                            value={formState.requiredPaymentAmount}
                            onChange={(e) =>
                              setFormState((prev) => ({
                                ...prev,
                                requiredPaymentAmount:
                                  parseFloat(e.target.value) || 0,
                              }))
                            }
                            step="0.01"
                            min="0"
                            className="w-full pl-8 pr-3 py-2 border border-amber-300 rounded-md bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                            placeholder="0.00"
                          />
                        </div>
                        <p className="mt-2 text-xs text-amber-700">
                          Users must pay this amount to fill the form
                        </p>
                      </div>
                    )}
                  </div>

                  
                </div>
              </div>
            )}

            {/* Form Engine Tab */}
            {activeTab === "engine" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    Image Upload Fields
                  </h4>
                  <p className="text-xs text-gray-600 mb-4">
                    Add image upload fields to your form
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {FIELD_TYPES.map((field) => (
                      <button
                        key={field.type}
                        onClick={() => addImageField(field.type)}
                        className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center group"
                      >
                        <div className="text-2xl mb-2 text-gray-600 group-hover:text-blue-600">
                          {field.icon}
                        </div>
                        <div className="text-xs font-medium text-gray-700 group-hover:text-blue-600">
                          {field.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {formState.imageFields.length > 0 && (
                  <div className="space-y-2">
                    {formState.imageFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{field.icon}</span>
                          <span className="text-sm font-medium text-gray-700">
                            {field.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeImageField(index)}
                          className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1 flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 0h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2 2 2 0 0 1-2 2H3a2 2 0 0 1-2-2h1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1H1a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1H3a2 2 0 0 1 2-2" />
                      <path d="M1 6v-.5a.5.5 0 0 1 1 0V6h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V9h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 2.5v.5H.5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H2v-.5a.5.5 0 0 0-1 0" />
                    </svg>
                    Upload Sample Images
                  </h4>
                  <p className="text-xs text-gray-600 mb-4">
                    Upload sample images to show in the preview
                  </p>

                  <div className="space-y-4">
                    <div
                      onClick={() => imageUploadInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                      }}
                      onDragLeave={() => setIsDragOver(false)}
                      onDrop={onDrop}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${isDragOver
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-gray-50 hover:border-blue-500 hover:bg-blue-50"
                        }`}
                    >
                      <div className="text-5xl mb-3 text-gray-400">📁</div>
                      <div className="text-sm text-gray-600 mb-1">
                        Click to upload or drag and drop
                      </div>
                      <div className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 5MB
                      </div>
                      <input
                        ref={imageUploadInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={onFileChange}
                        className="hidden"
                      />
                    </div>

                    {formState.uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {formState.uploadedImages.map((img, index) => (
                          <div
                            key={index}
                            className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50 group"
                          >
                            <Image
                              src={img.url}
                              alt={img.name}
                              fill
                              className="object-cover"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                              ×
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1 truncate">
                              {img.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="bg-gray-200 w-full rounded-lg shadow-sm p-8 overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Form Preview</h2>
            <p className="text-sm text-gray-600 mt-1">
              This is a live preview of your form.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white p-5">
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-8">
              {formState.formName || "Form Preview"}
            </h3>

            <div className="space-y-6">
              {/* Text Fields */}
              {templateFields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field}
                  </label>
                  <input
                    type={getInputType(field)}
                    placeholder={`Enter ${field.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled
                  />
                </div>
              ))}

              {/* Image Fields */}
              {formState.imageFields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.name}
                  </label>
                  <ImageFieldPreview field={field} />
                </div>
              ))}

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  disabled
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease;
        }
      `}</style>
    </div>
  );
}

// Toggle Item Component
const ToggleItem: React.FC<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  highlight?: boolean;
}> = ({ label, checked, onChange, highlight }) => {
  return (
    <div
      className={`flex items-center justify-between py-3 ${highlight
        ? "bg-amber-50 px-3 rounded-lg"
        : "border-b border-gray-100 last:border-0"
        }`}
    >
      <span
        className={`text-sm ${highlight ? "font-semibold text-amber-800" : "text-gray-700"
          }`}
      >
        {label}
      </span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-gray-300"
          }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${checked ? "transform translate-x-5" : ""
            }`}
        />
      </button>
    </div>
  );
};
