"use client";

import { FormConfig } from "../config/forms";



interface Props {
  db: FormConfig[];
}

export default function DBPanel({ db }: Props) {
  return (
    <details className="mx-auto mt-10 max-w-5xl rounded-2xl bg-indigo-950 px-6 py-5">
      <summary className="cursor-pointer select-none text-[13px] font-bold text-indigo-300">
        📦 Raw DB payload
      </summary>
      <pre className="mt-4 overflow-x-auto text-[11px] leading-relaxed text-indigo-200">
        {JSON.stringify(db, null, 2)}
      </pre>
    </details>
  );
}