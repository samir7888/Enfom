"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { JSX } from "react/jsx-runtime";

interface FormState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface VisibilityState {
  oldPassword: boolean;
  newPassword: boolean;
  confirmPassword: boolean;
}

interface FieldError {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const EyeIcon = ({ open }: { open: boolean }): JSX.Element =>
  open ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

// Password strength checker
function getStrength(password: string): { score: number; label: string; color: string } {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "bg-red-400" };
  if (score === 2) return { score, label: "Fair", color: "bg-yellow-400" };
  if (score === 3) return { score, label: "Good", color: "bg-blue-400" };
  return { score, label: "Strong", color: "bg-green-500" };
}

export default function ChangePasswordPage(): JSX.Element {
  const [form, setForm] = useState<FormState>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState<VisibilityState>({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState<FieldError>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const strength = getStrength(form.newPassword);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const toggleVisibility = (field: keyof VisibilityState): void => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validate = (): boolean => {
    const newErrors: FieldError = {};
    if (!form.oldPassword) newErrors.oldPassword = "Old password is required.";
    if (!form.newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (form.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters.";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password.";
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 w-full max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Password Changed!</h2>
          <p className="text-sm text-gray-500 mb-6">Your password has been updated successfully.</p>
          <button
            onClick={() => { setSubmitted(false); setForm({ oldPassword: "", newPassword: "", confirmPassword: "" }); }}
            className="w-full bg-gray-900 hover:bg-gray-700 text-white font-semibold py-3.5 rounded-2xl text-sm transition-all"
          >
            Back to Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Change Password</h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Enter your old password and choose a new secured<br />password to update your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Old Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Old Password
            </label>
            <div className="relative">
              <input
                type={visibility.oldPassword ? "text" : "password"}
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                placeholder="Enter your old password"
                className={`w-full border rounded-2xl px-4 py-3.5 pr-12 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 transition ${
                  errors.oldPassword
                    ? "border-red-300 focus:ring-red-300"
                    : "border-gray-200 focus:ring-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => toggleVisibility("oldPassword")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <EyeIcon open={visibility.oldPassword} />
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.oldPassword}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={visibility.newPassword ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
                className={`w-full border rounded-2xl px-4 py-3.5 pr-12 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 transition ${
                  errors.newPassword
                    ? "border-red-300 focus:ring-red-300"
                    : "border-gray-200 focus:ring-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => toggleVisibility("newPassword")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <EyeIcon open={visibility.newPassword} />
              </button>
            </div>

            {/* Strength meter */}
            {form.newPassword && (
              <div className="mt-2 space-y-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        i <= strength.score ? strength.color : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-400">
                  Strength:{" "}
                  <span
                    className={`font-semibold ${
                      strength.label === "Strong"
                        ? "text-green-600"
                        : strength.label === "Good"
                        ? "text-blue-600"
                        : strength.label === "Fair"
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    {strength.label}
                  </span>
                </p>
              </div>
            )}

            {errors.newPassword && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={visibility.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your new password"
                className={`w-full border rounded-2xl px-4 py-3.5 pr-12 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 transition ${
                  errors.confirmPassword
                    ? "border-red-300 focus:ring-red-300"
                    : form.confirmPassword && form.confirmPassword === form.newPassword
                    ? "border-green-300 focus:ring-green-300"
                    : "border-gray-200 focus:ring-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => toggleVisibility("confirmPassword")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                <EyeIcon open={visibility.confirmPassword} />
              </button>
            </div>

            {/* Match indicator */}
            {form.confirmPassword && form.confirmPassword === form.newPassword && !errors.confirmPassword && (
              <p className="text-xs text-green-600 mt-1.5 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Passwords match
              </p>
            )}
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Password requirements hint */}
          <div className="bg-gray-50 rounded-2xl px-4 py-3 space-y-1.5">
            <p className="text-xs font-semibold text-gray-500 mb-2">Password requirements:</p>
            {[
              { label: "At least 8 characters", met: form.newPassword.length >= 8 },
              { label: "One uppercase letter (A–Z)", met: /[A-Z]/.test(form.newPassword) },
              { label: "One number (0–9)", met: /[0-9]/.test(form.newPassword) },
              { label: "One special character (!@#$…)", met: /[^A-Za-z0-9]/.test(form.newPassword) },
            ].map((req) => (
              <div key={req.label} className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${req.met ? "bg-green-500" : "bg-gray-200"}`}>
                  {req.met && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-xs ${req.met ? "text-green-600 font-medium" : "text-gray-400"}`}>{req.label}</span>
              </div>
            ))}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-700 active:scale-95 text-white font-semibold py-3.5 rounded-2xl text-sm transition-all duration-200 mt-2"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}