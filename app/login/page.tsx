'use client';

import { useState } from 'react';

export default function LoginPage() {
  // UI State
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [showReset1, setShowReset1] = useState(false);
  const [showReset2, setShowReset2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  // Form State
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({ email: '', password: '' });

  // Reset Form State
  const [resetForm, setResetForm] = useState({ newPassword: '', confirmPassword: '' });
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  // Validation
  function validateEmail() {
    if (!form.email) { setErrors(e => ({ ...e, email: 'Email is required' })); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setErrors(e => ({ ...e, email: 'Enter a valid email address' })); return false; }
    setErrors(e => ({ ...e, email: '' })); return true;
  }

  function validatePassword() {
    if (!form.password) { setErrors(e => ({ ...e, password: 'Password is required' })); return false; }
    if (form.password.length < 6) { setErrors(e => ({ ...e, password: 'Password must be at least 6 characters' })); return false; }
    setErrors(e => ({ ...e, password: '' })); return true;
  }

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const valid = validateEmail() && validatePassword();
    if (!valid) return;
    setServerError('');
    setLoading(true);
    try {
      // TODO: replace with real auth API call
      // await authApi.login({ email: form.email, password: form.password })
      await delay(1200);
      // on success: router.push('/dashboard')
    } catch (err) {
      setServerError((err instanceof Error ? err.message : 'Invalid email or password. Please try again.') || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    try {
      // TODO: replace with real Google OAuth
      await delay(800);
    } catch (err) {
      setServerError('Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleFacebook() {
    setLoading(true);
    try {
      // TODO: replace with real Facebook OAuth
      await delay(800);
    } catch (err) {
      setServerError('Facebook sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');
    if (!resetForm.newPassword || resetForm.newPassword.length < 8) {
      setResetError('Password must be at least 8 characters'); return;
    }
    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setResetError('Passwords do not match'); return;
    }
    setResetLoading(true);
    try {
      // TODO: replace with real reset API
      await delay(1000);
      setResetSuccess('Password reset successfully!');
      setResetForm({ newPassword: '', confirmPassword: '' });
      setTimeout(() => { setShowForgot(false); setResetSuccess(''); }, 2000);
    } catch (err) {
      setResetError((err instanceof Error ? err.message : 'Reset failed. Please try again.') || 'Reset failed. Please try again.');
    } finally {
      setResetLoading(false);
    }
  }

  const EyeOpen = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#9ca3af" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="3" stroke="#9ca3af" strokeWidth="1.8"/>
    </svg>
  );

  const EyeClosed = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="1" y1="1" x2="23" y2="23" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-page {
          min-height: 100vh;
          background: #f5f5f0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .bg-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .bg-shape-1 {
          width: 500px; height: 500px;
          background: rgba(230,230,220,0.7);
          top: -150px; right: -100px;
        }
        .bg-shape-2 {
          width: 400px; height: 400px;
          background: rgba(200,200,195,0.5);
          bottom: -120px; left: -80px;
        }
        .auth-card {
          margin-top: 80px;
          width: 100%; max-width: 440px;
          background: #fff;
          border-radius: 20px;
          padding: 44px 40px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.07);
          position: relative; z-index: 1;
          animation: cardIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .auth-header { text-align: center; margin-bottom: 28px; }
        .auth-logo {
          display: inline-flex; align-items: center; justify-content: center;
          width: 48px; height: 48px;
          border-radius: 14px; background: #0f0f0f;
          margin-bottom: 20px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .auth-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.9rem; font-weight: 400;
          color: #0f0f0f; letter-spacing: -0.5px;
          margin: 0 0 8px;
        }
        .auth-subtitle {
          font-size: 0.875rem; color: #6b7280;
          line-height: 1.6; margin: 0;
        }
        .social-row { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
        .social-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 11px 16px;
          border: 1.5px solid #e5e7eb; border-radius: 12px;
          background: #fafafa;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 600; color: #1a1a1a;
          cursor: pointer; transition: all 0.2s ease;
        }
        .social-btn:hover:not(:disabled) {
          background: #f3f4f6; border-color: #d1d5db;
          transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .social-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .divider { display: flex; align-items: center; gap: 12px; margin-bottom: 24px; }
        .divider-line { flex: 1; height: 1px; background: #e5e7eb; }
        .divider-text { font-size: 0.78rem; color: #9ca3af; white-space: nowrap; font-weight: 500; }
        .field-group { margin-bottom: 18px; }
        .field-label { display: block; font-size: 0.8rem; font-weight: 600; color: #374151; margin-bottom: 7px; letter-spacing: 0.01em; }
        .label-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 7px; }
        .forgot-link { font-size: 0.78rem; font-weight: 600; color: #6b7280; cursor: pointer; transition: color 0.2s; }
        .forgot-link:hover { color: #0f0f0f; }
        .input-wrap {
          position: relative; display: flex; align-items: center;
          border: 1.5px solid #e5e7eb; border-radius: 12px; background: #fafafa;
          transition: all 0.2s ease; overflow: hidden;
        }
        .input-wrap.focused { border-color: #0f0f0f; background: #fff; box-shadow: 0 0 0 3px rgba(15,15,15,0.06); }
        .input-wrap.has-error { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220,38,38,0.06); }
        .input-icon { position: absolute; left: 14px; pointer-events: none; flex-shrink: 0; }
        .field-input {
          width: 100%; padding: 12px 42px 12px 40px;
          border: none; background: transparent;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; color: #0f0f0f; outline: none;
        }
        .field-input::placeholder { color: #c4c4c4; }
        .eye-btn {
          position: absolute; right: 12px;
          background: none; border: none; padding: 4px;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          border-radius: 6px; transition: background 0.2s;
        }
        .eye-btn:hover { background: #f3f4f6; }
        .error-msg { display: block; font-size: 0.75rem; color: #dc2626; margin-top: 5px; font-weight: 500; }
        .remember-row { margin-bottom: 20px; }
        .remember-label {
          display: flex; align-items: center; gap: 8px;
          font-size: 0.82rem; color: #6b7280; cursor: pointer; user-select: none; font-weight: 500;
        }
        .remember-check { display: none; }
        .check-custom {
          width: 17px; height: 17px;
          border: 1.5px solid #d1d5db; border-radius: 5px;
          display: inline-flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s; background: #fafafa;
        }
        .check-custom.checked { background: #0f0f0f; border-color: #0f0f0f; }
        .check-custom.checked::after {
          content: ''; width: 4px; height: 7px;
          border: 2px solid white; border-top: none; border-left: none;
          transform: rotate(45deg) translateY(-1px); display: block;
        }
        .server-error {
          display: flex; align-items: center; gap: 7px;
          font-size: 0.8rem; color: #dc2626;
          background: #fef2f2; border: 1px solid #fecaca;
          border-radius: 10px; padding: 10px 13px; margin-bottom: 14px; font-weight: 500;
        }
        .server-success {
          font-size: 0.8rem; color: #059669;
          background: #ecfdf5; border: 1px solid #a7f3d0;
          border-radius: 10px; padding: 10px 13px; font-weight: 500;
        }
        .submit-btn {
          width: 100%; padding: 13px;
          background: #0f0f0f; color: #fff;
          border: none; border-radius: 12px;
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 700;
          cursor: pointer; transition: all 0.25s ease;
          display: flex; align-items: center; justify-content: center; letter-spacing: 0.01em;
        }
        .submit-btn:hover:not(:disabled) { background: #1f1f1f; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }
        .btn-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
          border-radius: 50%; animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .auth-footer { text-align: center; margin-top: 22px; font-size: 0.82rem; color: #9ca3af; font-weight: 500; }
        .signup-link { color: #0f0f0f; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .signup-link:hover { opacity: 0.7; }
        .forgot-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.45); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 20px; z-index: 999;
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .forgot-card {
          width: 100%; max-width: 420px;
          background: #fff; border-radius: 20px; padding: 44px 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
          position: relative; text-align: center;
          animation: scaleIn 0.3s cubic-bezier(0.16,1,0.3,1);
        }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .close-btn {
          position: absolute; top: 16px; right: 16px;
          background: #f3f4f6; border: none; border-radius: 8px;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: background 0.2s;
        }
        .close-btn:hover { background: #e5e7eb; }
        @media (max-width: 480px) {
          .auth-card, .forgot-card { padding: 32px 24px; }
          .auth-title { font-size: 1.6rem; }
        }
      `}</style>

      <div className="auth-page">
        <div className="bg-shape bg-shape-1" />
        <div className="bg-shape bg-shape-2" />

        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="#0f0f0f"/>
                <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Enter your credentials to access your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} noValidate>
            {/* Email */}
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <div className={`input-wrap ${focused === 'email' ? 'focused' : ''} ${errors.email ? 'has-error' : ''}`}>
                <svg className="input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 3h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="#9ca3af" strokeWidth="1.3"/>
                  <path d="M1.5 4l6.5 5 6.5-5" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  type="email"
                  className="field-input"
                  placeholder="name@example.com"
                  onFocus={() => setFocused('email')}
                  onBlur={() => { setFocused(''); validateEmail(); }}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="field-group">
              <div className="label-row">
                <label className="field-label">Password</label>
                <span className="forgot-link" onClick={() => setShowForgot(true)}>Forgot password?</span>
              </div>
              <div className={`input-wrap ${focused === 'password' ? 'focused' : ''} ${errors.password ? 'has-error' : ''}`}>
                <svg className="input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="6" width="12" height="9" rx="1.5" stroke="#9ca3af" strokeWidth="1.3"/>
                  <path d="M5 6V4.5a3 3 0 0 1 6 0V6" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  type={showPassword ? 'text' : 'password'}
                  className="field-input"
                  placeholder="Password"
                  onFocus={() => setFocused('password')}
                  onBlur={() => { setFocused(''); validatePassword(); }}
                  autoComplete="current-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPassword(s => !s)} tabIndex={-1}>
                  {showPassword ? <EyeOpen /> : <EyeClosed />}
                </button>
              </div>
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>

            {/* Remember me */}
            <div className="remember-row">
              <label className="remember-label">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                  className="remember-check"
                />
                <span className={`check-custom ${form.remember ? 'checked' : ''}`} />
                Keep me signed in
              </label>
            </div>

            {/* Server error */}
            {serverError && (
              <div className="server-error">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5"/>
                  <path d="M8 5v4M8 11v.5" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                {serverError}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : <span>Sign In</span>}
            </button>
          </form>

          {/* Divider */}
          <div className="divider" style={{ marginTop: '24px' }}>
            <span className="divider-line" />
            <span className="divider-text">or sign in with email</span>
            <span className="divider-line" />
          </div>

          {/* Social Logins */}
          <div className="social-row">
            <button className="social-btn" onClick={handleGoogle} disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button className="social-btn" onClick={handleFacebook} disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M18 9C18 4.029 13.971 0 9 0S0 4.029 0 9c0 4.491 3.291 8.212 7.594 8.892V11.6H5.309V9h2.285V7.014c0-2.256 1.344-3.503 3.4-3.503.984 0 2.015.176 2.015.176V5.9h-1.135c-1.118 0-1.467.694-1.467 1.406V9h2.496l-.399 2.6H10.41v6.292C14.709 17.212 18 13.491 18 9z" fill="#1877F2"/>
                <path d="M12.504 11.6l.399-2.6H10.41V7.306c0-.712.349-1.406 1.467-1.406h1.135V3.687s-1.031-.176-2.016-.176c-2.055 0-3.4 1.247-3.4 3.503V9H5.31v2.6h2.285v6.292a9.073 9.073 0 0 0 2.812 0V11.6h2.098z" fill="white"/>
              </svg>
              Continue with Facebook
            </button>
          </div>

          {/* Footer */}
          <p className="auth-footer">
            Don&apos;t have an account?{' '}
            <span className="signup-link">Create one</span>
          </p>
        </div>

        {/* Forgot Password Overlay */}
        {showForgot && (
          <div className="forgot-overlay" onClick={e => { if (e.target === e.currentTarget) setShowForgot(false); }}>
            <div className="forgot-card">
              <button className="close-btn" onClick={() => setShowForgot(false)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 2l14 14M16 2L2 16" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <h2 className="auth-title" style={{ fontSize: '1.5rem' }}>Reset Password</h2>
              <p className="auth-subtitle">Enter your registered login email address to receive a secured link to set a new password</p>

              <form onSubmit={handleReset} noValidate>
                <div className="field-group" style={{ marginTop: '20px', textAlign: 'left' }}>
                  <label className="field-label">New Password</label>
                  <div className={`input-wrap ${resetError ? 'has-error' : ''}`}>
                    <input
                      value={resetForm.newPassword}
                      onChange={e => setResetForm(f => ({ ...f, newPassword: e.target.value }))}
                      type={showReset1 ? 'text' : 'password'}
                      className="field-input"
                      placeholder="Password"
                      style={{ paddingLeft: '14px' }}
                    />
                    <button type="button" className="eye-btn" onClick={() => setShowReset1(s => !s)} tabIndex={-1}>
                      {showReset1 ? <EyeOpen /> : <EyeClosed />}
                    </button>
                  </div>
                </div>

                <div className="field-group" style={{ marginTop: '16px', textAlign: 'left' }}>
                  <label className="field-label">Confirm New Password</label>
                  <div className="input-wrap">
                    <input
                      value={resetForm.confirmPassword}
                      onChange={e => setResetForm(f => ({ ...f, confirmPassword: e.target.value }))}
                      type={showReset2 ? 'text' : 'password'}
                      className="field-input"
                      placeholder="Password"
                      style={{ paddingLeft: '14px' }}
                    />
                    <button type="button" className="eye-btn" onClick={() => setShowReset2(s => !s)} tabIndex={-1}>
                      {showReset2 ? <EyeOpen /> : <EyeClosed />}
                    </button>
                  </div>
                </div>

                {resetError && <div className="server-error" style={{ marginTop: '12px' }}>{resetError}</div>}
                {resetSuccess && <div className="server-success" style={{ marginTop: '12px' }}>{resetSuccess}</div>}

                <button type="submit" className="submit-btn" style={{ marginTop: '24px' }} disabled={resetLoading}>
                  {resetLoading ? <span className="btn-spinner" /> : <span>Reset Password</span>}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}