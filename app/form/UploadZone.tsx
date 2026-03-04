"use client";

import { useCallback, useRef, useState } from "react";

import { validateFile } from "@/lib/validation";
import { FormField } from "../config/forms";


interface Props {
  field: FormField;
  isDefault: boolean;
  file: File | null;
  error: string;
  onChange: (file: File | null) => void;
}

export default function UploadZone({ field, isDefault, file, error, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = useCallback(
    (incoming: File) => {
      const result = validateFile(field, incoming);
      if (!result.isValid) return; // validation feedback handled via parent error state

      if (incoming.type.startsWith("image/")) {
        const url = URL.createObjectURL(incoming);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(null);
      }
      onChange(incoming);
    },
    [field, onChange]
  );

  const removeFile = () => {
    setPreviewUrl(null);
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const zoneStateClass = error
    ? "border-red-400 bg-red-50"
    : file
    ? "border-emerald-400 bg-emerald-50"
    : isDragging
    ? "border-indigo-500 bg-indigo-50"
    : "border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50/40";

  const customZoneStyle = field.styles
    ? { border: field.styles.border, background: field.styles.background }
    : undefined;

  return (
    <div className="mb-4">
      {/* Label */}
      <label
        className={
          isDefault
            ? "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-500"
            : "mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-gray-500"
        }
      >
        {field.label ?? field.name}
        {field.required && <span className="ml-1 text-red-400">*</span>}
      </label>

      {/* Drop zone */}
      <div
        className={`relative flex cursor-pointer flex-col items-center gap-1.5 rounded-[10px] border-2 border-dashed px-4 py-5 text-center transition-all duration-200 ${
          isDefault || !field.styles ? zoneStateClass : ""
        }`}
        style={!isDefault && field.styles ? customZoneStyle : undefined}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const dropped = e.dataTransfer.files[0];
          if (dropped) handleFile(dropped);
        }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          id={field.name}
          name={field.name}
          accept={field.accept ?? "*"}
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <span className="text-3xl leading-none">
          {field.icon ?? (field.type === "image" ? "🖼️" : "📎")}
        </span>
        <span className="text-[13px] font-semibold text-gray-600">
          Click or drag & drop to upload
        </span>
        <span className="text-[11px] text-gray-400">
          {field.hint ?? (field.type === "image" ? "Image files only" : "Any file")}
        </span>
      </div>

      {/* Preview */}
      {file && (
        <div className="mt-2.5 overflow-hidden rounded-lg border border-indigo-100">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="block h-40 w-full object-cover"
            />
          )}
          <div className="flex items-center gap-2 bg-indigo-50 px-3 py-2">
            <span className="text-sm">{previewUrl ? "🖼️" : "📄"}</span>
            <span className="flex-1 truncate text-[12px] font-semibold text-indigo-700">
              {file.name}&nbsp;({(file.size / 1024 / 1024).toFixed(2)}MB)
            </span>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeFile(); }}
              className="shrink-0 px-1 text-sm font-bold text-red-500 hover:text-red-700"
              aria-label="Remove file"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="mt-1 animate-shake text-[12px] font-semibold text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}