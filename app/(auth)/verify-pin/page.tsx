'use client';

import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';
import styles from './page.module.css';

export default function VerifyPin() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ── Handle single input change ─────────────────────────────────────────────
  function handleChange(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1); // only digits, 1 char
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (digit && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  // ── Handle backspace ───────────────────────────────────────────────────────
  function handleKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        // Clear current
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  // ── Handle paste (e.g. paste "1234" fills all boxes) ──────────────────────
  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pasted) return;
    const newOtp = ['', '', '', ''];
    pasted.split('').forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    // Focus last filled input
    const lastIndex = Math.min(pasted.length - 1, 3);
    inputRefs.current[lastIndex]?.focus();
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
// ...existing code...
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    const code = otp.join('');
    if (code.length < 4) {
      setError('Please enter the complete 4-digit code.');
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with real API call
      // await authApi.verifyOtp(code)
      await new Promise(r => setTimeout(r, 1200));
      setSuccess('Verified successfully! Redirecting...');
    } catch (err: unknown) {
      // narrow the unknown to an Error to safely access .message
      const message =
        err instanceof Error ? err.message : 'Invalid code. Please try again.';
      setError(message);
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }
// ...existing code...

  // ── Resend with cooldown timer ─────────────────────────────────────────────
  async function handleResend() {
    if (resendTimer > 0) return;
    setError('');
    setSuccess('');
    setOtp(['', '', '', '']);
    inputRefs.current[0]?.focus();

    try {
      // TODO: await authApi.resendOtp()
      await new Promise(r => setTimeout(r, 600));
      setSuccess('Code resent! Check your email.');
      // Start 30s cooldown
      setResendTimer(30);
      const interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) { clearInterval(interval); return 0; }
          return prev - 1;
        });
      }, 1000);
    } catch {
      setError('Failed to resend. Please try again.');
    }
  }

  const isFilled = otp.every(d => d !== '');

  return (
    <section className={styles.pinSection}>
      <div className={styles.pinContainer}>

        <h2 className={styles.title}>Verify PIN</h2>
        <p className={styles.subtitle}>
          Please enter the 4-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} noValidate>

          {/* OTP Inputs */}
          <div className={styles.pinInputs}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                pattern="\d*"
                value={digit}
                className={`${styles.otpInput} ${error ? styles.otpError : ''} ${digit ? styles.otpFilled : ''}`}
                onChange={e => handleChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={handlePaste}
                onFocus={e => e.target.select()}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {/* Error / Success */}
          {error   && <p className={styles.errorMsg}>{error}</p>}
          {success && <p className={styles.successMsg}>{success}</p>}

          {/* Submit */}
          <button
            type="submit"
            className={styles.btnVerify}
            disabled={loading || !isFilled}
          >
            {loading ? <span className={styles.spinner} /> : 'Verify & Proceed'}
          </button>

        </form>

        {/* Resend */}
        <p className={styles.resendText}>
          Didn&apos;t receive the code?{' '}
          <button
            type="button"
            className={`${styles.resendLink} ${resendTimer > 0 ? styles.resendDisabled : ''}`}
            onClick={handleResend}
            disabled={resendTimer > 0}
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
          </button>
        </p>

      </div>
    </section>
  );
}