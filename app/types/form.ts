import { FormConfig } from "../config/forms";

/**
 * DATABASE CONFIG
 * Each object in this array renders one form card.
 * Add / remove / modify entries to change what forms appear.
 */
export const DB: FormConfig[] = [
  // ── Default-styled form ──────────────────────────────────────────────

  // ── Custom-styled form ───────────────────────────────────────────────
  {
    formTitle: "Personal Information",
    fields: [
      {
        name: "title",
        label: "Personal Information",
        type: "display",
        styles: {
          background: "#ffcccc",
          color: "#cc0000",
          border: "2px solid #ff9999",
          borderRadius: "10px",
          padding: "15px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
          display: "block",
        },
      },
      {
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
        styles: {
          background: "#ffe6e6",
          color: "#cc0000",
          border: "2px solid #ff9999",
          borderRadius: "8px",
          padding: "12px",
          width: "100%",
          outline: "none",
        },
      },
      {
        name: "age",
        label: "Age",
        type: "number",
        placeholder: "Enter your age",
        required: true,
        styles: {
          background: "#ffe6e6",
          color: "#cc0000",
          border: "2px solid #ff9999",
          borderRadius: "8px",
          padding: "12px",
          width: "100%",
          outline: "none",
        },
      },
      {
        name: "country",
        label: "Country",
        type: "text",
        placeholder: "Enter your country",
        required: true,
        styles: {
          background: "#ffe6e6",
          color: "#cc0000",
          border: "2px solid #ff9999",
          borderRadius: "8px",
          padding: "12px",
          width: "100%",
          outline: "none",
        },
      },
      {
        name: "address",
        label: "Address",
        type: "text",
        placeholder: "Enter your address",
        required: true,
        styles: {
          background: "#ffe6e6",
          color: "#cc0000",
          border: "2px solid #ff9999",
          borderRadius: "8px",
          padding: "12px",
          width: "100%",
          outline: "none",
        },
      },
      {
        name: "photo",
        label: "Profile Photo",
        type: "image",
        required: true,
        accept: "image/*",
        maxSizeMB: 2,
        hint: "JPG, PNG or WEBP — max 2MB",
        icon: "🖼️",
        styles: { border: "2px dashed #ff9999", background: "#fff5f5" },
      },
      {
        name: "citizenship",
        label: "Citizenship Document",
        type: "file",
        required: true,
        accept: ".pdf,.jpg,.jpeg,.png",
        maxSizeMB: 5,
        hint: "PDF or image — max 5MB",
        icon: "📄",
        styles: { border: "2px dashed #ff9999", background: "#fff5f5" },
      },
      {
        name: "Button",
        label: "Submit",
        type: "button",
        styles: {
          background: "#007bff",
          color: "#fff",
          border: "2px solid #007bff",
          borderRadius: "8px",
          padding: "13px",
          width: "100%",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "700",
          marginTop: "8px",
        },
      },
    ],
  },
];