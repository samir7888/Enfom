"use client";

import { getStrength } from "@/lib/validation";

interface Props {
  value: string;
}

export default function PasswordStrengthBar({ value }: Props) {
  if (!value) return null;
  const s = getStrength(value);
  return (
    <div className="mt-2">
      {/* bar track */}
      <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${s.pct}%`, background: s.color }}
        />
      </div>
      {/* label */}
      <p className="mt-1 text-[11px] font-semibold" style={{ color: s.color }}>
        {s.emoji}&nbsp;&nbsp;{s.label}
      </p>
    </div>
  );
}