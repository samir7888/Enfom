'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import styles from './page.module.css';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Validation ─────────────────────────────────────────────────────────────
  function validate() {
    const newErrors = { newPassword: '', confirmPassword: '' };
    let valid = true;

    if (!newPassword) {
      newErrors.newPassword = 'Password is required';
      valid = false;
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'Must be at least 8 characters';
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      valid = false;
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
// …inside ResetPassword…

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setSuccess('');
  if (!validate()) return;

  setLoading(true);
  try {
    // await authApi.resetPassword(newPassword)
    await new Promise(r => setTimeout(r, 1200));
    setSuccess('Password reset successfully! Redirecting...');
    setNewPassword('');
    setConfirmPassword('');
  } catch (error: unknown) {          // ← no `any` here
    // narrow the unknown
    const msg =
      error instanceof Error
        ? error.message
        : 'Reset failed. Please try again.';

    setErrors(prev => ({ ...prev, newPassword: msg }));
  } finally {
    setLoading(false);
  }
}

  return (
    <section className={styles.resetSection}>
      <div className={styles.resetContainer}>

        <h2 className={styles.title}>Reset Password</h2>
        <p className={styles.subtitle}>
          Enter your registered login email address to receive a secured link to set a new password
        </p>

        <form onSubmit={handleSubmit} noValidate>

          {/* New Password */}
          <div className={styles.fieldGroup}>
            <label className={styles.formLabel}>New Password</label>
            <div className={`${styles.inputGroup} ${errors.newPassword ? styles.hasError : ''}`}>
              <input
                type={showNew ? 'text' : 'password'}
                className={styles.formControl}
                placeholder="Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                onBlur={validate}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowNew(s => !s)}
                tabIndex={-1}
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.newPassword && (
              <span className={styles.errorMsg}>{errors.newPassword}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div className={styles.fieldGroup}>
            <label className={styles.formLabel}>Confirm New Password</label>
            <div className={`${styles.inputGroup} ${errors.confirmPassword ? styles.hasError : ''}`}>
              <input
                type={showConfirm ? 'text' : 'password'}
                className={styles.formControl}
                placeholder="Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                onBlur={validate}
              />
              <button
                type="button"
                className={styles.eyeBtn}
                onClick={() => setShowConfirm(s => !s)}
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className={styles.errorMsg}>{errors.confirmPassword}</span>
            )}
          </div>

          {/* Success message */}
          {success && (
            <div className={styles.successMsg}>{success}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={styles.btnReset}
            disabled={loading}
          >
            {loading ? <span className={styles.spinner} /> : 'Reset Password'}
          </button>

        </form>
      </div>
    </section>
  );
}