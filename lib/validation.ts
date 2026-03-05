import { FormField, StrengthResult, ValidationResult } from "@/app/config/forms";

// ── Field auto-resolver map ────────────────────────────────────────────
export const FIELD_MAP: Record<string, Partial<FormField>> = {
  name:     { label: "Full Name",  type: "text",     placeholder: "Enter your full name",    required: true  },
  age:      { label: "Age",        type: "number",   placeholder: "Enter your age",           required: true  },
  email:    { label: "Email",      type: "email",    placeholder: "Enter your email",         required: true  },
  phone:    { label: "Phone",      type: "tel",      placeholder: "Enter your phone number",  required: false },
  address:  { label: "Address",    type: "text",     placeholder: "Enter your address",       required: true  },
  country:  { label: "Country",    type: "text",     placeholder: "Enter your country",       required: true  },
  city:     { label: "City",       type: "text",     placeholder: "Enter your city",          required: false },
  zip:      { label: "ZIP Code",   type: "text",     placeholder: "Enter your ZIP code",      required: false },
  password: { label: "Password",   type: "password", placeholder: "Enter your password",      required: true, strengthMeter: true },
  username: { label: "Username",   type: "text",     placeholder: "Enter your username",      required: true  },
  message:  { label: "Message",    type: "text",     placeholder: "Write your message",       required: false },
  Button:   { label: "Submit",     type: "button" },
  button:   { label: "Submit",     type: "button" },
  submit:   { label: "Submit",     type: "button" },
};

export function normalizeField(f: FormField | string): FormField {
  if (typeof f === "object") return f;
  const def = FIELD_MAP[f] ?? { label: f, type: "text", placeholder: `Enter ${f}`, required: false };
  return { name: f, ...def } as FormField;
}

// ── Validators ─────────────────────────────────────────────────────────
type ValidatorFn = (value: string, label: string) => string | null;

const VALIDATORS: Record<string, ValidatorFn> = {
  text:     (v, n) => v.trim() ? null : `${n} is required.`,
  number:   (v, n) => {
    if (!v.trim())    return `${n} is required.`;
    if (isNaN(Number(v))) return `${n} must be a valid number.`;
    if (Number(v) <= 0)   return `${n} must be greater than 0.`;
    return null;
  },
  email:    (v, n) => {
    if (!v.trim()) return `${n} is required.`;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : "Enter a valid email address.";
  },
  tel:      (v)    => (!v.trim() || /^[\d\s+\-()]{7,15}$/.test(v)) ? null : "Enter a valid phone number.",
  password: (v)    => v.length >= 6 ? null : "Password must be at least 6 characters.",
};

export function validateField(field: FormField, value: string): ValidationResult {
  if (!field.required && !value.trim()) return { isValid: true };
  const fn = VALIDATORS[field.type] ?? VALIDATORS.text;
  const error = fn(value, field.label ?? field.name);
  return error ? { isValid: false, error } : { isValid: true };
}

export function validateFile(field: FormField, file: File | null): ValidationResult {
  if (!file) {
    return field.required
      ? { isValid: false, error: `${field.label} is required.` }
      : { isValid: true };
  }
  const maxBytes = (field.maxSizeMB ?? 5) * 1024 * 1024;
  if (file.size > maxBytes) {
    return { isValid: false, error: `File too large. Max size is ${field.maxSizeMB ?? 5}MB.` };
  }
  
  if (field.type === "image" && !file.type.startsWith("image/")) {
    return { isValid: false, error: "Only image files are allowed (JPG, PNG, WEBP)." };
  }

  if (field.accept) {
    const exts = field.accept.split(",").map((s) => s.trim().toLowerCase());
    const fileName = file.name.toLowerCase();
    const mime = file.type.toLowerCase();
    const ok = exts.some((ext) => {
      if (ext.startsWith(".")) return fileName.endsWith(ext);
      if (ext.includes("*"))   return mime.startsWith(ext.replace("*", ""));
      return mime === ext;
    });
    if (!ok) return { isValid: false, error: `Invalid file type. Allowed: ${field.accept}` };
  }

  return { isValid: true };
}

// ── Password strength ─────────────────────────────────────────────────
export function getStrength(pw: string): StrengthResult {
  let score = 0;
  if (pw.length >= 8)           score++;
  if (pw.length >= 12)          score++;
  if (/[A-Z]/.test(pw))         score++;
  if (/[0-9]/.test(pw))         score++;
  if (/[^A-Za-z0-9]/.test(pw))  score++;

  if (score <= 1) return { pct: 20,  color: "#ef4444", label: "Weak",       emoji: "🔴" };
  if (score === 2) return { pct: 45,  color: "#f97316", label: "Fair",       emoji: "🟠" };
  if (score === 3) return { pct: 65,  color: "#eab308", label: "Good",       emoji: "🟡" };
  if (score === 4) return { pct: 85,  color: "#22c55e", label: "Strong",     emoji: "🟢" };
  return               { pct: 100, color: "#10b981", label: "Very Strong",  emoji: "✅" };
}