// app/forms/edit/[id]/page.tsx
"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppMutation } from "@/hooks/useAppMutation";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useFetchData";

// Types
interface FormData {
  id: string;
  formFor: string;
  createdBy: string;
  createdAt: string;
  formFilled: string;
}

interface FormTemplateData {
  id: string;
  businessId: string;
  formImage: string;
  formName: string;
  templateFields: string;
  description: string;
  isPaid: boolean;
  price: number;
  isCashAvailable: boolean;
  availableSlots: number;
  isVisible: boolean;
  isStyle: boolean;
  needVerfication: boolean;
  createdAt: string;
  onlyFlowing: boolean;
  forAll: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

interface FormStyles {
  main: {
    padding: number;
    margin: number;
    backgroundColor: string;
    borderRadius: number;
  };
  titleColor: {
    textColor: string;
    fontSize: number;
    fontWeight: string;
    fontStyle: string;
    textAlign: string;
  };
  inputLabel: {
    display: string;
    color: string;
    fontSize: number;
    fontWeight: string;
    fontStyle: string;
    alignment: string;
  };
  entry: {
    backgroundColor: string;
    placeholderColor: string;
    placeholderDisplay: "visible" | "hidden";
    textColor: string;
    fontSize: number;
    borderRadius: number;
    borderWidth: number;
    borderColor: string;
  };
  button: {
    backgroundColor: string;
    textColor: string;
    fontSize: number;
    fontWeight: string;
    fontFamily: string;
    alignment: string;
    padding: number;
    height: number;
    width: number;
  };
}

interface ComponentItem {
  key: string;
  label: string;
  icon: string;
}

interface ToastState {
  visible: boolean;
  message: string;
  type: "success" | "error";
}

interface ConfirmDialogState {
  visible: boolean;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

// File Upload Component
const FileUploadField: React.FC<{ fieldName: string }> = ({ fieldName }) => {
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
      <div className="text-4xl mb-2">📁</div>
      <div className="text-sm text-gray-600">
        Click to upload {fieldName.toLowerCase()}
      </div>
    </div>
  );
};

// Toast Component
const Toast: React.FC<{ toast: ToastState; onClose: () => void }> = ({
  toast,
  onClose,
}) => {
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible, onClose]);

  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slideUp">
      <div
        className={`px-5 py-3 rounded-lg shadow-lg text-white font-medium ${toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
          }`}
      >
        {toast.message}
      </div>
    </div>
  );
};

// Confirm Dialog Component
const ConfirmDialog: React.FC<{
  dialog: ConfirmDialogState;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ dialog, onConfirm, onCancel }) => {
  if (!dialog.visible) return null;

  return (
    <div className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-xl p-8 max-w-sm w-full mx-4 shadow-2xl animate-scaleIn">
        <p className="text-gray-800 text-center mb-6">{dialog.message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors"
          >
            Yes, Remove
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to load data from localStorage
const loadFromLocalStorage = () => {
  if (typeof window === "undefined") return null;

  try {
    const savedData = localStorage.getItem("formEditData");
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return null;
  }
};

// Helper function to load form data from addform page
const loadFormDataFromAddForm = () => {
  if (typeof window === "undefined") return null;

  try {
    const formData = localStorage.getItem("formData");
    return formData ? JSON.parse(formData) : null;
  } catch (error) {
    console.error("Error loading formData from localStorage:", error);
    return null;
  }
};

// Default values
const defaultFormData: FormData = {
  id: "FORM001",
  formFor: "Student Registration",
  createdBy: "Admin",
  createdAt: new Date().toISOString(),
  formFilled: "Name,Age,City,Email,Phone,Address,Image,GPA",
};

const defaultStyles: FormStyles = {
  main: {
    padding: 40,
    margin: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  titleColor: {
    textColor: "#000000",
    fontSize: 20,
    fontWeight: "600",
    fontStyle: "normal",
    textAlign: "left",
  },
  inputLabel: {
    display: "block",
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
    fontStyle: "normal",
    alignment: "left",
  },
  entry: {
    backgroundColor: "#FFFFFF",
    placeholderColor: "#808080",
    placeholderDisplay: "visible",
    textColor: "#000000",
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d0d0d0",
  },
  button: {
    backgroundColor: "#1a7f7f",
    textColor: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "inherit",
    alignment: "right",
    padding: 12,
    height: 40,
    width: 100,
  },
};

// Main Component
export default function FormEdit() {
  // Load saved data from localStorage or use defaults
  const savedData = loadFormDataFromAddForm();
  // Static Data
  const [formData] = useState<FormData>(defaultFormData);

  const formId = useSearchParams().get("id");

  const { data, isLoading, error } = useFetchData<ApiResponse<FormTemplateData>>({
    queryKey: ["formdata", formId!],
    endpoint: `FormTemplates/GetFormById/${formId}`,
    options: {
      enabled: !!formId,
    }
  })

  useEffect(() => {
    if (data?.success && data.data.templateFields) {
      try {
        const fields = JSON.parse(data.data.templateFields);
        if (Array.isArray(fields)) {
          setFormFields(fields);
        }
      } catch (e) {
        console.error("Error parsing templateFields:", e);
      }
    }
  }, [data]);

  const [formFields, setFormFields] = useState<string[]>(() => {
    // First priority: Check for saved form edit data
    if (savedData?.formFields) {
      return savedData.formFields;
    }

    // Second priority: Check for form data from addform page
    const addFormData = loadFormDataFromAddForm();
    if (addFormData?.formTemplate) {
      return addFormData.formTemplate
        .split(",")
        .map((f: any) => f.trim())
        .filter(Boolean);
    }

    // Fallback: Use default form fields
    return defaultFormData.formFilled.split(",").map((f) => f.trim());
  });

  // Styles State - Load from localStorage or use defaults
  const [styles, setStyles] = useState<FormStyles>(() => {
    if (savedData?.styles) {
      return savedData.styles;
    }
    return defaultStyles;
  });

  // Component Panel Config
  const componentList: ComponentItem[] = [
    { key: "main", label: "Main", icon: "📄" },
    { key: "titlecolor", label: "TitleColor", icon: "🎨" },
    { key: "inputlabel", label: "InputLabel", icon: "🏷️" },
    { key: "entry", label: "Entry", icon: "📝" },
    { key: "button", label: "Button", icon: "🔘" },
  ];

  const alignOptions = [
    { value: "left", icon: "⬅️" },
    { value: "center", icon: "⬇️" },
    { value: "right", icon: "➡️" },
    { value: "justify", icon: "⚖️" },
  ];

  const alignmentMap: Record<string, string> = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
    justify: "space-between",
  };

  const colorPalette = [
    "#000000",
    "#808080",
    "#FF0000",
    "#FFA500",
    "#FFFF00",
    "#00FF00",
    "#0000FF",
    "#800080",
    "#FFFFFF",
    "#FFB6C1",
  ];

  // UI State
  const [currentComponent, setCurrentComponent] = useState("entry");
  const [savedLabel, setSavedLabel] = useState("Saved 2m ago");
  const [showAddField, setShowAddField] = useState(false);
  const [newFieldName, setNewFieldName] = useState("");
  const [addFieldError, setAddFieldError] = useState("");
  const newFieldInputRef = useRef<HTMLInputElement>(null);

  // Toast State
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    type: "success",
  });

  // Confirm Dialog State
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    visible: false,
    message: "",
  });

  // Computed
  const currentComponentLabel =
    componentList.find((c) => c.key === currentComponent)?.label || "";

  // Helper Functions
  const showToast = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      setToast({ visible: true, message, type });
    },
    []
  );

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  const confirm = useCallback((message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmDialog({
        visible: true,
        message,
        onConfirm: () => {
          setConfirmDialog((prev) => ({ ...prev, visible: false }));
          resolve(true);
        },
        onCancel: () => {
          setConfirmDialog((prev) => ({ ...prev, visible: false }));
          resolve(false);
        },
      });
    });
  }, []);

  const isImageField = (field: string): boolean => {
    const lower = field.toLowerCase();
    return (
      lower.includes("image") ||
      lower.includes("photo") ||
      lower.includes("upload")
    );
  };

  const getInputType = (field: string): string => {
    const lower = field.toLowerCase();
    if (lower.includes("email")) return "email";
    if (lower.includes("phone")) return "tel";
    if (lower.includes("age") || lower.includes("gpa")) return "number";
    return "text";
  };

  const updateField = async (index: number, newValue: string) => {
    const trimmed = newValue.trim();
    if (!trimmed) {
      showToast("Field name cannot be empty.", "error");
      return;
    }
    if (trimmed.length > 50) {
      showToast("Field name is too long. Maximum 50 characters.", "error");
      return;
    }
    const isDuplicate = formFields.some(
      (f, i) => i !== index && f.toLowerCase() === trimmed.toLowerCase()
    );
    if (isDuplicate) {
      showToast("A field with this name already exists.", "error");
      return;
    }
    setFormFields((prev) => {
      const updated = [...prev];
      updated[index] = trimmed;
      return updated;
    });
    showToast("Field updated.");
  };

  const removeField = async (index: number) => {
    if (formFields.length <= 1) {
      showToast("Cannot remove the last field.", "error");
      return;
    }
    const ok = await confirm(`Remove "${formFields[index]}"?`);
    if (ok) {
      setFormFields((prev) => prev.filter((_, i) => i !== index));
      showToast("Field removed.");
    }
  };

  const openAddField = async () => {
    setShowAddField(true);
    setAddFieldError("");
    setNewFieldName("");
    // Focus after render
    setTimeout(() => {
      newFieldInputRef.current?.focus();
    }, 100);
  };

  const confirmAddField = () => {
    setAddFieldError("");
    const trimmed = newFieldName.trim();
    if (!trimmed) {
      setAddFieldError("Field name cannot be empty.");
      return;
    }
    if (trimmed.length > 50) {
      setAddFieldError("Maximum 50 characters.");
      return;
    }
    if (formFields.some((f) => f.toLowerCase() === trimmed.toLowerCase())) {
      setAddFieldError("A field with this name already exists.");
      return;
    }
    setFormFields((prev) => [...prev, trimmed]);
    setNewFieldName("");
    setShowAddField(false);
    showToast("Field added.");
  };

  const saveDraft = () => {
    setSavedLabel("Saving...");
    setTimeout(() => {
      setSavedLabel("Saved just now");
      showToast("Draft saved.");
    }, 800);
  };
  const router = useRouter()
  const { mutate, isPending } = useAppMutation()

  const publishForm = () => {
    // Construct the fields array in the new format
    const fields: any[] = [
      {
        name: "title",
        label: data?.data?.formName || formData.formFor,
        type: "display",
        styles: {
          background: styles.main.backgroundColor,
          color: styles.titleColor.textColor,
          border: `1px solid ${styles.entry.borderColor}`,
          borderRadius: `${styles.main.borderRadius}px`,
          padding: "15px",
          fontSize: `${styles.titleColor.fontSize}px`,
          fontWeight: styles.titleColor.fontWeight,
          textAlign: styles.titleColor.textAlign,
          marginBottom: "20px",
          display: "block",
        },
      },
      ...formFields.map((field) => ({
        name: field.toLowerCase().replace(/\s+/g, "_"),
        label: field,
        type: isImageField(field) ? "image" : getInputType(field),
        placeholder: `Enter ${field.toLowerCase()}`,
        required: true,
        styles: {
          background: styles.entry.backgroundColor,
          color: styles.entry.textColor,
          border: `${styles.entry.borderWidth}px solid ${styles.entry.borderColor}`,
          borderRadius: `${styles.entry.borderRadius}px`,
          padding: "12px",
          width: "100%",
          outline: "none",
          fontSize: `${styles.entry.fontSize}px`,
        },
        ...(isImageField(field) ? {
          accept: "image/*",
          maxSizeMB: 2,
          hint: "JPG, PNG or WEBP — max 2MB",
          icon: "🖼️"
        } : {})
      })),
      {
        name: "Button",
        label: "Submit",
        type: "button",
        styles: {
          background: styles.button.backgroundColor,
          color: styles.button.textColor,
          border: `1px solid ${styles.button.backgroundColor}`,
          borderRadius: "8px",
          padding: `${styles.button.padding}px`,
          width: "100%",
          cursor: "pointer",
          fontSize: `${styles.button.fontSize}px`,
          fontWeight: styles.button.fontWeight,
          marginTop: "8px",
        },
      },
    ];

    const postData = {
      FormTemplateId: formId,
      DesignJson: JSON.stringify({
        version: "1.0",
        formTitle: data?.data?.formName || formData.formFor,
        fields: fields,
      }),
    };

    mutate({
      endpoint: "FormDesign",
      method: "post",
      data: postData,
      onSuccess: (res: any) => {
        router.push("/");
      },
    });
    showToast("Form published successfully!");
  };

  // Update style helper
  const updateStyle = useCallback(
    <K extends keyof FormStyles, P extends keyof FormStyles[K]>(
      section: K,
      property: P,
      value: FormStyles[K][P]
    ) => {
      setStyles((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [property]: value,
        },
      }));
    },
    []
  );

  // Save to localStorage when styles or formFields change
  useEffect(() => {
    const formEditData = {
      formFields,
      styles,
      lastModified: new Date().toISOString(),
    };
    localStorage.setItem("formEditData", JSON.stringify(formEditData));
  }, [formFields, styles]);

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white px-6 py-3 border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between">
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
              <span className="text-gray-900">Edit Form</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={saveDraft}
              className="px-4 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              disabled={isPending}
              onClick={publishForm}
              className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            >
              {isPending ? "Publishing..." : "Publish Form"}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="flex h-[calc(100vh-57px)] overflow-hidden">
        {/* Left Sidebar - Components */}
        <div className="w-72 bg-white border-r border-gray-200 p-6 overflow-y-auto flex-shrink-0">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            Form Editor
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Draft State
            </span>
            <span>•</span>
            <span>{savedLabel}</span>
          </div>

          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Components
          </h3>
          <div className="space-y-2">
            {componentList.map((comp) => (
              <button
                key={comp.key}
                onClick={() => setCurrentComponent(comp.key)}
                className={`w-full p-3 flex items-center gap-3 border rounded-lg transition-all ${currentComponent === comp.key
                  ? "border-2 border-gray-900 bg-white"
                  : "border-gray-200 hover:border-teal-600 hover:bg-gray-50"
                  }`}
              >
                <span className="text-xl">{comp.icon}</span>
                <span className="text-sm font-medium text-gray-700">
                  {comp.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Center Canvas */}
        <div
          className="flex-1 overflow-y-auto bg-gray-200 flex justify-center items-start transition-all"
          style={{ padding: styles.main.margin }}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-lg shadow-md transition-all"
            style={{
              padding: styles.main.padding,
              backgroundColor: styles.main.backgroundColor,
              borderRadius: styles.main.borderRadius,
            }}
          >
            <h2
              className="mb-6"
              style={{
                color: styles.titleColor.textColor,
                fontSize: styles.titleColor.fontSize,
                fontWeight: styles.titleColor.fontWeight,
                fontStyle: styles.titleColor.fontStyle,
                textAlign: styles.titleColor
                  .textAlign as React.CSSProperties["textAlign"],
              }}
            >
              {isLoading ? "Loading..." : (data?.data?.formName || formData.formFor)}
            </h2>

            {/* Form Fields */}
            <div className="space-y-5">
              {formFields.map((field, index) => {
                console.log(field, "filed");
                return (
                  <div key={index}>
                    <label
                      htmlFor={`field_${index}`}
                      className="block mb-2 text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity"
                      style={{
                        display: styles.inputLabel
                          .display as React.CSSProperties["display"],
                        color: styles.inputLabel.color,
                        fontSize: styles.inputLabel.fontSize,
                        fontWeight: styles.inputLabel.fontWeight,
                        fontStyle: styles.inputLabel.fontStyle,
                        textAlign: styles.inputLabel
                          .alignment as React.CSSProperties["textAlign"],
                      }}
                    >
                      {field}
                    </label>

                    {isImageField(field) ? (
                      <FileUploadField fieldName={field} />
                    ) : (
                      <>
                        <input
                          type={getInputType(field)}
                          className="w-full px-4 py-3 border rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                          placeholder={`Enter ${field.toLowerCase()}`}
                          id={`field_${index}`}
                          style={{
                            backgroundColor: styles.entry.backgroundColor,
                            color: styles.entry.textColor,
                            fontSize: styles.entry.fontSize,
                            borderRadius: styles.entry.borderRadius,
                            borderWidth: styles.entry.borderWidth,
                            borderColor: styles.entry.borderColor,
                          }}
                        />
                        <style jsx>{`
                          #field_${index}::placeholder {
                            color: ${styles.entry.placeholderColor};
                            opacity: ${styles.entry.placeholderDisplay ===
                            "visible"
                            ? 1
                            : 0};
                          }
                        `}</style>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Button */}
            <div
              className="mt-6 flex"
              style={{
                justifyContent:
                  alignmentMap[styles.button.alignment] || "flex-end",
              }}
            >
              <button
                className="rounded-lg transition-all hover:opacity-90"
                style={{
                  backgroundColor: styles.button.backgroundColor,
                  color: styles.button.textColor,
                  fontSize: styles.button.fontSize,
                  fontWeight: styles.button.fontWeight,
                  fontFamily: styles.button.fontFamily,
                  width: styles.button.width,
                  height: styles.button.height,
                  padding: `${styles.button.padding}px 28px`,
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Properties */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto flex-shrink-0">
          <h3 className="text-xs font-semibold text-gray-500 tracking-wider mb-5">
            PROPERTIES
          </h3>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {currentComponentLabel}
                </h4>
                <p className="text-xs text-gray-600">Form component</p>
              </div>
            </div>

            {/* MAIN Section */}
            {currentComponent === "main" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Padding:
                  </label>
                  <input
                    type="number"
                    value={styles.main.padding}
                    onChange={(e) =>
                      updateStyle(
                        "main",
                        "padding",
                        parseInt(e.target.value) || 0
                      )
                    }
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Margin:
                  </label>
                  <input
                    type="number"
                    value={styles.main.margin}
                    onChange={(e) =>
                      updateStyle(
                        "main",
                        "margin",
                        parseInt(e.target.value) || 0
                      )
                    }
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-gray-300 rounded-l-md">
                      <span className="text-gray-600">🎨</span>
                    </span>
                    <input
                      type="color"
                      value={styles.main.backgroundColor}
                      onChange={(e) =>
                        updateStyle("main", "backgroundColor", e.target.value)
                      }
                      className="w-full h-10 p-1 border border-gray-300 rounded-r-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Radius:
                  </label>
                  <input
                    type="number"
                    value={styles.main.borderRadius}
                    onChange={(e) =>
                      updateStyle(
                        "main",
                        "borderRadius",
                        parseInt(e.target.value) || 0
                      )
                    }
                    min="0"
                    max="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Form Fields:
                  </label>
                  <div className="bg-gray-50 p-3 rounded-md space-y-2">
                    {formFields.map((field, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          defaultValue={field}
                          onBlur={(e) => updateField(index, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.currentTarget.blur();
                            }
                          }}
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <button
                          onClick={() => removeField(index)}
                          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {formFields.length === 0 && (
                      <div className="text-xs text-gray-500 py-2">
                        No fields. Add one below.
                      </div>
                    )}
                  </div>

                  {showAddField ? (
                    <div className="mt-3">
                      <input
                        ref={newFieldInputRef}
                        type="text"
                        value={newFieldName}
                        onChange={(e) => setNewFieldName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") confirmAddField();
                          if (e.key === "Escape") {
                            setShowAddField(false);
                            setNewFieldName("");
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
                        placeholder="Field name..."
                        maxLength={50}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={confirmAddField}
                          className="flex-1 px-3 py-1.5 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => {
                            setShowAddField(false);
                            setNewFieldName("");
                          }}
                          className="flex-1 px-3 py-1.5 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                      {addFieldError && (
                        <div className="text-xs text-red-500 mt-1">
                          {addFieldError}
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={openAddField}
                      className="w-full mt-3 px-3 py-2 bg-teal-600 text-white text-sm rounded-md hover:bg-teal-700 transition-colors"
                    >
                      + Add Field
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TITLE COLOR Section */}
            {currentComponent === "titlecolor" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title Color
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-gray-300 rounded-l-md">
                      <span className="text-gray-600">🎨</span>
                    </span>
                    <input
                      type="color"
                      value={styles.titleColor.textColor}
                      onChange={(e) =>
                        updateStyle("titleColor", "textColor", e.target.value)
                      }
                      className="w-full h-10 p-1 border border-gray-300 rounded-r-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size:
                  </label>
                  <input
                    type="number"
                    value={styles.titleColor.fontSize}
                    onChange={(e) =>
                      updateStyle(
                        "titleColor",
                        "fontSize",
                        parseInt(e.target.value) || 14
                      )
                    }
                    min="10"
                    max="48"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Weight:
                  </label>
                  <select
                    value={styles.titleColor.fontWeight}
                    onChange={(e) =>
                      updateStyle("titleColor", "fontWeight", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="300">Light (300)</option>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi-Bold (600)</option>
                    <option value="700">Bold (700)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Style:
                  </label>
                  <select
                    value={styles.titleColor.fontStyle}
                    onChange={(e) =>
                      updateStyle("titleColor", "fontStyle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Alignment
                  </label>
                  <div className="flex gap-1">
                    {alignOptions.map((align) => (
                      <button
                        key={align.value}
                        onClick={() =>
                          updateStyle("titleColor", "textAlign", align.value)
                        }
                        className={`flex-1 px-3 py-2 border rounded-md text-sm transition-colors ${styles.titleColor.textAlign === align.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                      >
                        {align.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* INPUT LABEL Section */}
            {currentComponent === "inputlabel" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display:
                  </label>
                  <select
                    value={styles.inputLabel.display}
                    onChange={(e) =>
                      updateStyle("inputLabel", "display", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="block">Block</option>
                    <option value="inline-block">Inline-Block</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-gray-300 rounded-l-md">
                      <span className="text-gray-600">🎨</span>
                    </span>
                    <input
                      type="color"
                      value={styles.inputLabel.color}
                      onChange={(e) =>
                        updateStyle("inputLabel", "color", e.target.value)
                      }
                      className="w-full h-10 p-1 border border-gray-300 rounded-r-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size:
                  </label>
                  <input
                    type="number"
                    value={styles.inputLabel.fontSize}
                    onChange={(e) =>
                      updateStyle(
                        "inputLabel",
                        "fontSize",
                        parseInt(e.target.value) || 14
                      )
                    }
                    min="10"
                    max="24"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Weight:
                  </label>
                  <select
                    value={styles.inputLabel.fontWeight}
                    onChange={(e) =>
                      updateStyle("inputLabel", "fontWeight", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="300">Light (300)</option>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi-Bold (600)</option>
                    <option value="700">Bold (700)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Style:
                  </label>
                  <select
                    value={styles.inputLabel.fontStyle}
                    onChange={(e) =>
                      updateStyle("inputLabel", "fontStyle", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="italic">Italic</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alignment:
                  </label>
                  <select
                    value={styles.inputLabel.alignment}
                    onChange={(e) =>
                      updateStyle("inputLabel", "alignment", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
              </div>
            )}

            {/* ENTRY Section */}
            {currentComponent === "entry" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color:
                  </label>
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {colorPalette.map((color) => (
                      <button
                        key={color}
                        onClick={() =>
                          updateStyle("entry", "backgroundColor", color)
                        }
                        className={`w-7 h-7 rounded-full transition-all ${styles.entry.backgroundColor === color
                          ? "ring-2 ring-offset-2 ring-gray-900"
                          : ""
                          }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-gray-300 rounded-l-md">
                      <span className="text-gray-600">🎨</span>
                    </span>
                    <input
                      type="color"
                      value={styles.entry.textColor}
                      onChange={(e) =>
                        updateStyle("entry", "textColor", e.target.value)
                      }
                      className="w-full h-10 p-1 border border-gray-300 rounded-r-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Placeholder Color
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-gray-300 rounded-l-md">
                      <span className="text-gray-600">🎨</span>
                    </span>
                    <input
                      type="color"
                      value={styles.entry.placeholderColor}
                      onChange={(e) =>
                        updateStyle("entry", "placeholderColor", e.target.value)
                      }
                      className="w-full h-10 p-1 border border-gray-300 rounded-r-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Color
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-gray-300 rounded-l-md">
                      <span className="text-gray-600">🎨</span>
                    </span>
                    <input
                      type="color"
                      value={styles.entry.borderColor}
                      onChange={(e) =>
                        updateStyle("entry", "borderColor", e.target.value)
                      }
                      className="w-full h-10 p-1 border border-gray-300 rounded-r-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Placeholder Display:
                  </label>
                  <select
                    value={styles.entry.placeholderDisplay}
                    onChange={(e) =>
                      updateStyle(
                        "entry",
                        "placeholderDisplay",
                        e.target.value as "visible" | "hidden"
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="visible">Visible</option>
                    <option value="hidden">Hidden</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size:
                  </label>
                  <input
                    type="number"
                    value={styles.entry.fontSize}
                    onChange={(e) =>
                      updateStyle(
                        "entry",
                        "fontSize",
                        parseInt(e.target.value) || 14
                      )
                    }
                    min="10"
                    max="24"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Radius:
                  </label>
                  <input
                    type="number"
                    value={styles.entry.borderRadius}
                    onChange={(e) =>
                      updateStyle(
                        "entry",
                        "borderRadius",
                        parseInt(e.target.value) || 0
                      )
                    }
                    min="0"
                    max="30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Width:
                  </label>
                  <input
                    type="number"
                    value={styles.entry.borderWidth}
                    onChange={(e) =>
                      updateStyle(
                        "entry",
                        "borderWidth",
                        parseInt(e.target.value) || 0
                      )
                    }
                    min="0"
                    max="10"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* BUTTON Section */}
            {currentComponent === "button" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-gray-300 rounded-l-md">
                      <span className="text-gray-600">🎨</span>
                    </span>
                    <input
                      type="color"
                      value={styles.button.backgroundColor}
                      onChange={(e) =>
                        updateStyle("button", "backgroundColor", e.target.value)
                      }
                      className="w-full h-10 p-1 border border-gray-300 rounded-r-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center px-3 bg-gray-100 border border-gray-300 rounded-l-md">
                      <span className="text-gray-600">🎨</span>
                    </span>
                    <input
                      type="color"
                      value={styles.button.textColor}
                      onChange={(e) =>
                        updateStyle("button", "textColor", e.target.value)
                      }
                      className="w-full h-10 p-1 border border-gray-300 rounded-r-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Size:
                  </label>
                  <input
                    type="number"
                    value={styles.button.fontSize}
                    onChange={(e) =>
                      updateStyle(
                        "button",
                        "fontSize",
                        parseInt(e.target.value) || 14
                      )
                    }
                    min="10"
                    max="24"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Weight:
                  </label>
                  <select
                    value={styles.button.fontWeight}
                    onChange={(e) =>
                      updateStyle("button", "fontWeight", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="300">Light (300)</option>
                    <option value="400">Normal (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semi-Bold (600)</option>
                    <option value="700">Bold (700)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family:
                  </label>
                  <select
                    value={styles.button.fontFamily}
                    onChange={(e) =>
                      updateStyle("button", "fontFamily", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="inherit">Default</option>
                    <option value="Arial, sans-serif">Arial</option>
                    <option value="'Times New Roman', serif">
                      Times New Roman
                    </option>
                    <option value="'Courier New', monospace">
                      Courier New
                    </option>
                    <option value="Georgia, serif">Georgia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Width (px)
                  </label>
                  <input
                    type="number"
                    value={styles.button.width}
                    onChange={(e) =>
                      updateStyle(
                        "button",
                        "width",
                        parseInt(e.target.value) || 100
                      )
                    }
                    min="50"
                    max="800"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Height (px)
                  </label>
                  <input
                    type="number"
                    value={styles.button.height}
                    onChange={(e) =>
                      updateStyle(
                        "button",
                        "height",
                        parseInt(e.target.value) || 40
                      )
                    }
                    min="20"
                    max="200"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Button Alignment
                  </label>
                  <div className="flex gap-1">
                    {alignOptions.map((align) => (
                      <button
                        key={align.value}
                        onClick={() =>
                          updateStyle("button", "alignment", align.value)
                        }
                        className={`flex-1 px-3 py-2 border rounded-md text-sm transition-colors ${styles.button.alignment === align.value
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                      >
                        {align.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <Toast toast={toast} onClose={closeToast} />

      {/* Confirm Dialog */}
      <ConfirmDialog
        dialog={confirmDialog}
        onConfirm={() => confirmDialog.onConfirm?.()}
        onCancel={() => confirmDialog.onCancel?.()}
      />
    </div>
  );
}
