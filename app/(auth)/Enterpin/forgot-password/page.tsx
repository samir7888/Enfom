'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import styles from './page.module.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Validation ─────────────────────────────────────────────────────────────
  function validate() {
    if (!email) {
      setError('Email address is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess('');
    if (!validate()) return;

    setLoading(true);
    try {
      // TODO: replace with real API call
      // await authApi.forgotPassword(email)
      await new Promise(r => setTimeout(r, 1200));
      setSuccess(`A reset link has been sent to ${email}`);
      setEmail('');
    } catch (error: unknown) {
        const err = error instanceof Error ? error : null;
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className={styles.pageSection}>
      <div className={styles.card}>

        {/* Icon */}
        <div className={styles.iconWrap}>
          <Mail size={28} strokeWidth={1.8} />
        </div>

        <h2 className={styles.title}>Forgot Password?</h2>
        <p className={styles.subtitle}>
          Enter your email address and we&apos;ll send you a secure link to reset your password.
        </p>

        <form onSubmit={handleSubmit} noValidate>

          {/* Email field */}
          <div className={styles.fieldGroup}>
            <label className={styles.formLabel}>Email Address</label>
            <div className={`${styles.inputWrap} ${error ? styles.hasError : ''}`}>
              <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 3h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="#9ca3af" strokeWidth="1.3"/>
                <path d="M1.5 4l6.5 5 6.5-5" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input
                type="email"
                className={styles.formControl}
                placeholder="name@example.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError(''); }}
                onBlur={validate}
                autoComplete="email"
                autoFocus
              />
            </div>
            {error && <span className={styles.errorMsg}>{error}</span>}
          </div>

          {/* Success */}
          {success && (
            <div className={styles.successMsg}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="#059669" strokeWidth="1.5"/>
                <path d="M5 8l2.5 2.5L11 5.5" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={loading}
          >
            {loading ? <span className={styles.spinner} /> : 'Send Reset Link'}
          </button>

        </form>

        {/* Back to login */}
        <p className={styles.backText}>
          Remember your password?{' '}
          <a href="/login" className={styles.backLink}>Back to Sign In</a>
        </p>

      </div>
    </section>
  );
}