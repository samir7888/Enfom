export type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "tel"
  | "file"
  | "image"
  | "display"
  | "button";

export interface FieldStyles {
  background?: string;
  color?: string;
  border?: string;
  borderRadius?: string;
  padding?: string;
  width?: string;
  outline?: string;
  fontSize?: string;
  fontWeight?: string;
  textAlign?: string;
  marginBottom?: string;
  display?: string;
  cursor?: string;
  marginTop?: string;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  strengthMeter?: boolean;
  accept?: string;
  maxSizeMB?: number;
  hint?: string;
  icon?: string;
  styles?: FieldStyles;
}

export interface FormConfig {
  formTitle: string;
  style?: "default" | "custom";
  fields: (FormField | string)[];
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface StrengthResult {
  pct: number;
  color: string;
  label: string;
  emoji: string;
}

export interface FormState {
  values: Record<string, string>;
  files: Record<string, File | null>;
  errors: Record<string, string>;
  submitted: boolean;
}