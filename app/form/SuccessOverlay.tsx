"use client";

interface Props {
  onReset: () => void;
}

export default function SuccessOverlay({ onReset }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <div className="mb-3 text-5xl">✅</div>
      <h3 className="mb-1.5 text-[18px] font-bold text-emerald-600">Submitted!</h3>
      <p className="text-[13px] text-gray-500">Your data was received successfully.</p>
      <button
        onClick={onReset}
        className="mt-5 rounded-full bg-indigo-600 px-6 py-2 text-[13px] font-semibold text-white transition-all hover:bg-indigo-700"
      >
        Fill again
      </button>
    </div>
  );
}