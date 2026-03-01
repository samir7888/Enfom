'use client';

import { useState, useEffect, useRef } from 'react';
import { string } from 'zod';

export default function RegisterPage() {
  const [focused, setFocused] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [serverSuccess, setServerSuccess] = useState('');

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    username: '', password: '', confirmPassword: '', terms: false,
  });

  const [errors, setErrors] = useState({
    firstName: '', lastName: '', email: '',
    username: '', password: '', confirmPassword: '', terms: '',
  });

  // Password strength
  const [strengthScore, setStrengthScore] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState('');
  const [strengthClass, setStrengthClass] = useState('');
  const [strengthWidth, setStrengthWidth] = useState('0%');

  // Username availability
  const [usernameStatus, setUsernameStatus] = useState(''); // '' | 'checking' | 'available' | 'taken'
  const usernameTimer = useRef<NodeJS.Timeout | null>(null);

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

  // Password strength checker
  function checkPasswordStrength(password: string) {
    let score = 0;
    if (password.length >= 8)  score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    setStrengthScore(score);
    if (!password) { setStrengthWidth('0%'); setStrengthLabel(''); return; }
    if (score <= 1) { setStrengthWidth('25%');  setStrengthLabel('Weak');   setStrengthClass('weak'); }
    else if (score <= 2) { setStrengthWidth('50%'); setStrengthLabel('Fair'); setStrengthClass('fair'); }
    else if (score <= 3) { setStrengthWidth('75%'); setStrengthLabel('Good'); setStrengthClass('good'); }
    else { setStrengthWidth('100%'); setStrengthLabel('Strong'); setStrengthClass('strong'); }
  }

  // Username watcher (replaces Vue watch)
  useEffect(() => {
    if (usernameTimer.current) clearTimeout(usernameTimer.current);
    if (!form.username || form.username.length < 3) { setUsernameStatus(''); return; }
    setUsernameStatus('checking');
    usernameTimer.current = setTimeout(async () => {
      await delay(600);
      // TODO: replace with real API: await authApi.checkUsername(form.username)
      setUsernameStatus(['admin', 'john', 'johndoe'].includes(form.username.toLowerCase()) ? 'taken' : 'available');
    }, 500);
    return () => {
      if (usernameTimer.current) clearTimeout(usernameTimer.current);
    };
  }, [form.username]);

  // Validators
  const validators: {
    firstName: (v: string) => string;
    lastName: (v: string) => string;
    email: (v: string) => string;
    username: (v: string) => string;
    password: (v: string, score: number) => string;
    confirmPassword: (v: string, pwd: string) => string;
  } = {
    firstName: (v: string) => !v.trim() ? 'First name is required' : v.trim().length < 2 ? 'Must be at least 2 characters' : '',
    lastName:  (v: string) => !v.trim() ? 'Last name is required'  : v.trim().length < 2 ? 'Must be at least 2 characters' : '',
    email:     (v: string) => !v ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email address' : '',
    username:  (v: string) => !v ? 'Username is required' : v.length < 3 ? 'Must be at least 3 characters' : !/^[a-zA-Z0-9_]+$/.test(v) ? 'Only letters, numbers and underscores' : usernameStatus === 'taken' ? 'This username is already taken' : '',
    password:  (v: string, score: number) => !v ? 'Password is required' : v.length < 8 ? 'Must be at least 8 characters' : score < 2 ? 'Please choose a stronger password' : '',
    confirmPassword: (v: string, pwd: string) => !v ? 'Please confirm your password' : v !== pwd ? 'Passwords do not match' : '',
  };

  function validateField(field : string) {
    let error = '';
    if (field === 'password') error = validators.password(form[field], strengthScore);
    else if (field === 'confirmPassword') error = validators.confirmPassword(form[field], form.password);
    else if (field === 'terms') error = !form.terms ? 'You must accept the terms to continue' : '';
    else if (field in validators) error = (validators[field as keyof typeof validators] as (v: string) => string)(form[field as keyof typeof form] as string);
    setErrors(e => ({ ...e, [field]: error }));
  }

  function validateAll() {
    const newErrors = {
      firstName: validators.firstName(form.firstName),
      lastName:  validators.lastName(form.lastName),
      email:     validators.email(form.email),
      username:  validators.username(form.username),
      password:  validators.password(form.password, strengthScore),
      confirmPassword: validators.confirmPassword(form.confirmPassword, form.password),
      terms: !form.terms ? 'You must accept the terms to continue' : '',
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(e => !e);
  }

  async function handleRegister(e :React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateAll()) return;
    setServerError(''); setServerSuccess('');
    setLoading(true);
    try {
      // TODO: await authApi.register({ ...form })
      await delay(1400);
      setServerSuccess('🎉 Account created! Redirecting...');
      // TODO: router.push('/dashboard')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setServerError(''); setLoading(true);
    try { await delay(900); }
    catch { setServerError('Google sign-up failed. Please try again.'); }
    finally { setLoading(false); }
  }

  async function handleFacebook() {
    setServerError(''); setLoading(true);
    try { await delay(900); }
    catch { setServerError('Facebook sign-up failed. Please try again.'); }
    finally { setLoading(false); }
  }

  const EyeOpen = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#9ca3af" strokeWidth="1.8"/>
      <circle cx="12" cy="12" r="3" stroke="#9ca3af" strokeWidth="1.8"/>
    </svg>
  );

  const EyeClosed = () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="1" y1="1" x2="23" y2="23" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );

  const inputWrapClass = (field : string) => {
    return `input-wrap ${focused === field ? 'focused' : ''} ${errors[field as keyof typeof errors] ? 'has-error' : ''}`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-page {
          min-height: 100vh; background: #f5f5f0;
          display: flex; align-items: center; justify-content: center;
          padding: 40px 16px;
          font-family: 'DM Sans', sans-serif;
          position: relative; overflow: hidden;
        }
        .bg-shape { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
        .bg-shape-1 { width: 500px; height: 500px; background: rgba(225,225,215,0.8); top: -180px; right: -100px; }
        .bg-shape-2 { width: 380px; height: 380px; background: rgba(200,200,192,0.5); bottom: -120px; left: -80px; }
        .bg-shape-3 { width: 260px; height: 260px; background: rgba(210,215,205,0.4); top: 40%; left: 60%; }

        .auth-card {
          margin-top: 60px; width: 100%; max-width: 480px;
          background: #fff; border-radius: 22px; padding: 44px 42px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.07);
          position: relative; z-index: 1;
          animation: cardIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cardIn { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

        .auth-header { text-align: center; margin-bottom: 26px; }
        .auth-logo {
          display: inline-flex; align-items: center; justify-content: center;
          width: 48px; height: 48px; border-radius: 14px; background: #0f0f0f;
          margin-bottom: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.15);
        }
        .auth-title { font-family: 'DM Serif Display', serif; font-size: 1.85rem; font-weight: 400; color: #0f0f0f; letter-spacing: -0.5px; margin: 0 0 8px; }
        .auth-subtitle { font-size: 0.875rem; color: #6b7280; line-height: 1.6; margin: 0; }

        .social-row { display: flex; flex-direction: column; gap: 10px; margin-bottom: 22px; }
        .social-btn {
          width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 11px 16px; border: 1.5px solid #e5e7eb; border-radius: 12px; background: #fafafa;
          font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 600; color: #1a1a1a;
          cursor: pointer; transition: all 0.2s ease;
        }
        .social-btn:hover:not(:disabled) { background: #f3f4f6; border-color: #d1d5db; transform: translateY(-1px); box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
        .social-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .divider { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
        .divider-line { flex: 1; height: 1px; background: #e5e7eb; }
        .divider-text { font-size: 0.78rem; color: #9ca3af; white-space: nowrap; font-weight: 500; }

        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .field-group { margin-bottom: 16px; }
        .field-label { display: block; font-size: 0.8rem; font-weight: 600; color: #374151; margin-bottom: 7px; letter-spacing: 0.01em; }

        .input-wrap {
          position: relative; display: flex; align-items: center;
          border: 1.5px solid #e5e7eb; border-radius: 12px; background: #fafafa;
          transition: all 0.2s ease; overflow: hidden;
        }
        .input-wrap.focused { border-color: #0f0f0f; background: #fff; box-shadow: 0 0 0 3px rgba(15,15,15,0.06); }
        .input-wrap.has-error { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220,38,38,0.06); }

        .input-icon { position: absolute; left: 13px; pointer-events: none; flex-shrink: 0; }
        .input-prefix { position: absolute; left: 13px; font-size: 0.875rem; font-weight: 600; color: #9ca3af; pointer-events: none; line-height: 1; }

        .field-input { width: 100%; padding: 12px 42px 12px 38px; border: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; color: #0f0f0f; outline: none; }
        .field-input-prefix { padding-left: 28px; }
        .field-input::placeholder { color: #c4c4c4; }

        .eye-btn { position: absolute; right: 11px; background: none; border: none; padding: 4px; cursor: pointer; display: flex; align-items: center; border-radius: 6px; transition: background 0.2s; }
        .eye-btn:hover { background: #f3f4f6; }

        .status-badge { position: absolute; right: 12px; display: flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; }
        .status-badge.available { background: #d1fae5; }
        .status-badge.taken { background: #fee2e2; }

        .mini-spinner { width: 14px; height: 14px; border: 2px solid #e5e7eb; border-top-color: #6b7280; border-radius: 50%; animation: spin 0.7s linear infinite; }

        .strength-bar-wrap { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
        .strength-bar { flex: 1; height: 4px; background: #e5e7eb; border-radius: 4px; overflow: hidden; }
        .strength-fill { height: 100%; border-radius: 4px; transition: width 0.4s ease, background 0.4s ease; }
        .strength-fill.weak   { background: #ef4444; }
        .strength-fill.fair   { background: #f97316; }
        .strength-fill.good   { background: #eab308; }
        .strength-fill.strong { background: #22c55e; }
        .strength-label { font-size: 0.72rem; font-weight: 700; width: 48px; text-align: right; letter-spacing: 0.02em; text-transform: uppercase; }
        .strength-label.weak   { color: #ef4444; }
        .strength-label.fair   { color: #f97316; }
        .strength-label.good   { color: #eab308; }
        .strength-label.strong { color: #22c55e; }

        .error-msg { display: block; font-size: 0.75rem; color: #dc2626; margin-top: 5px; font-weight: 500; }
        .success-hint { display: block; font-size: 0.75rem; color: #059669; margin-top: 5px; font-weight: 500; }

        .terms-row { margin-bottom: 18px; }
        .remember-label { display: flex; align-items: flex-start; gap: 9px; font-size: 0.82rem; color: #6b7280; cursor: pointer; user-select: none; font-weight: 500; line-height: 1.5; }
        .remember-check { display: none; }
        .check-custom { width: 17px; height: 17px; min-width: 17px; border: 1.5px solid #d1d5db; border-radius: 5px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; transition: all 0.2s; background: #fafafa; }
        .check-custom.checked { background: #0f0f0f; border-color: #0f0f0f; }
        .check-custom.checked::after { content: ''; width: 4px; height: 7px; border: 2px solid white; border-top: none; border-left: none; transform: rotate(45deg) translateY(-1px); display: block; }
        .terms-link { color: #0f0f0f; font-weight: 700; cursor: pointer; text-decoration: underline; text-underline-offset: 2px; }

        .server-error { display: flex; align-items: center; gap: 7px; font-size: 0.8rem; color: #dc2626; background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 10px 13px; margin-bottom: 14px; font-weight: 500; }
        .server-success { display: flex; align-items: center; gap: 7px; font-size: 0.8rem; color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 10px; padding: 10px 13px; margin-bottom: 14px; font-weight: 500; }

        .submit-btn { width: 100%; padding: 13px; background: #0f0f0f; color: #fff; border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 700; cursor: pointer; transition: all 0.25s ease; display: flex; align-items: center; justify-content: center; letter-spacing: 0.01em; }
        .submit-btn:hover:not(:disabled) { background: #1f1f1f; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .btn-spinner { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        .auth-footer { text-align: center; margin-top: 20px; font-size: 0.82rem; color: #9ca3af; font-weight: 500; }
        .login-link { color: #0f0f0f; font-weight: 700; cursor: pointer; transition: opacity 0.2s; }
        .login-link:hover { opacity: 0.7; }

        .step-dots { display: flex; justify-content: center; gap: 6px; margin-top: 18px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: #e5e7eb; transition: all 0.3s; }
        .dot-active { background: #0f0f0f; width: 20px; border-radius: 3px; }

        @media (max-width: 520px) {
          .auth-card { padding: 32px 22px; }
          .auth-title { font-size: 1.6rem; }
          .field-row { grid-template-columns: 1fr; gap: 0; }
        }
      `}</style>

      <div className="auth-page">
        <div className="bg-shape bg-shape-1" />
        <div className="bg-shape bg-shape-2" />
        <div className="bg-shape bg-shape-3" />

        <div className="auth-card">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="8" fill="#0f0f0f"/>
                <path d="M8 14h12M14 8v12" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
            <h1 className="auth-title">Create account</h1>
            <p className="auth-subtitle">Join thousands of people already using SocialHub</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} noValidate>

            {/* Name row */}
            <div className="field-row">
              {/* First Name */}
              <div className="field-group">
                <label className="field-label">First Name</label>
                <div className={inputWrapClass('firstName')}>
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke="#9ca3af" strokeWidth="1.3"/>
                    <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  <input
                    value={form.firstName}
                    onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
                    type="text" className="field-input" placeholder="John"
                    onFocus={() => setFocused('firstName')}
                    onBlur={() => { setFocused(''); validateField('firstName'); }}
                    autoComplete="given-name"
                  />
                </div>
                {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
              </div>

              {/* Last Name */}
              <div className="field-group">
                <label className="field-label">Last Name</label>
                <div className={inputWrapClass('lastName')}>
                  <svg className="input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke="#9ca3af" strokeWidth="1.3"/>
                    <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                  <input
                    value={form.lastName}
                    onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
                    type="text" className="field-input" placeholder="Doe"
                    onFocus={() => setFocused('lastName')}
                    onBlur={() => { setFocused(''); validateField('lastName'); }}
                    autoComplete="family-name"
                  />
                </div>
                {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
              </div>
            </div>

            {/* Email */}
            <div className="field-group">
              <label className="field-label">Email Address</label>
              <div className={inputWrapClass('email')}>
                <svg className="input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 3h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" stroke="#9ca3af" strokeWidth="1.3"/>
                  <path d="M1.5 4l6.5 5 6.5-5" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  type="email" className="field-input" placeholder="name@example.com"
                  onFocus={() => setFocused('email')}
                  onBlur={() => { setFocused(''); validateField('email'); }}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            {/* Username */}
            <div className="field-group">
              <label className="field-label">Username</label>
              <div className={inputWrapClass('username')}>
                <span className="input-prefix">@</span>
                <input
                  value={form.username}
                  onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                  type="text" className="field-input field-input-prefix" placeholder="johndoe"
                  onFocus={() => setFocused('username')}
                  onBlur={() => { setFocused(''); validateField('username'); }}
                  autoComplete="username" maxLength={30}
                />
                {usernameStatus === 'checking' && (
                  <span className="status-badge checking"><span className="mini-spinner" /></span>
                )}
                {usernameStatus === 'available' && (
                  <span className="status-badge available">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 6.5l3.5 3.5L11 3" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
                {usernameStatus === 'taken' && (
                  <span className="status-badge taken">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <path d="M2 2l9 9M11 2l-9 9" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </span>
                )}
              </div>
              {errors.username && <span className="error-msg">{errors.username}</span>}
              {!errors.username && usernameStatus === 'available' && <span className="success-hint">Username is available</span>}
              {!errors.username && usernameStatus === 'taken' && <span className="error-msg">This username is already taken</span>}
            </div>

            {/* Password */}
            <div className="field-group">
              <label className="field-label">Password</label>
              <div className={inputWrapClass('password')}>
                <svg className="input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="6" width="12" height="9" rx="1.5" stroke="#9ca3af" strokeWidth="1.3"/>
                  <path d="M5 6V4.5a3 3 0 0 1 6 0V6" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  value={form.password}
                  onChange={e => { setForm(f => ({ ...f, password: e.target.value })); checkPasswordStrength(e.target.value); }}
                  type={showPassword ? 'text' : 'password'}
                  className="field-input" placeholder="Min. 8 characters"
                  onFocus={() => setFocused('password')}
                  onBlur={() => { setFocused(''); validateField('password'); }}
                  autoComplete="new-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPassword(s => !s)} tabIndex={-1}>
                  {showPassword ? <EyeOpen /> : <EyeClosed />}
                </button>
              </div>
              {form.password && (
                <div className="strength-bar-wrap">
                  <div className="strength-bar">
                    <div className={`strength-fill ${strengthClass}`} style={{ width: strengthWidth }} />
                  </div>
                  <span className={`strength-label ${strengthClass}`}>{strengthLabel}</span>
                </div>
              )}
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="field-group">
              <label className="field-label">Confirm Password</label>
              <div className={inputWrapClass('confirmPassword')}>
                <svg className="input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="6" width="12" height="9" rx="1.5" stroke="#9ca3af" strokeWidth="1.3"/>
                  <path d="M5 6V4.5a3 3 0 0 1 6 0V6" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input
                  value={form.confirmPassword}
                  onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
                  type={showConfirm ? 'text' : 'password'}
                  className="field-input" placeholder="Repeat your password"
                  onFocus={() => setFocused('confirmPassword')}
                  onBlur={() => { setFocused(''); validateField('confirmPassword'); }}
                  autoComplete="new-password"
                />
                <button type="button" className="eye-btn" onClick={() => setShowConfirm(s => !s)} tabIndex={-1}>
                  {showConfirm ? <EyeOpen /> : <EyeClosed />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
            </div>

            {/* Terms */}
            <div className="terms-row">
              <label className="remember-label">
                <input
                  type="checkbox" checked={form.terms}
                  onChange={e => { setForm(f => ({ ...f, terms: e.target.checked })); setErrors(e2 => ({ ...e2, terms: '' })); }}
                  className="remember-check"
                />
                <span className={`check-custom ${form.terms ? 'checked' : ''}`} />
                <span>
                  I agree to the{' '}
                  <span className="terms-link">Terms of Service</span>
                  {' '}and{' '}
                  <span className="terms-link">Privacy Policy</span>
                </span>
              </label>
              {errors.terms && <span className="error-msg" style={{ marginTop: '4px', display: 'block' }}>{errors.terms}</span>}
            </div>

            {/* Server messages */}
            {serverError && (
              <div className="server-error">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5"/>
                  <path d="M8 5v4M8 11v.5" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                {serverError}
              </div>
            )}
            {serverSuccess && (
              <div className="server-success">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#059669" strokeWidth="1.5"/>
                  <path d="M5 8l2.5 2.5L11 5.5" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {serverSuccess}
              </div>
            )}

            {/* Submit */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : <span>Create Account</span>}
            </button>
          </form>

          {/* Divider */}
          <div className="divider" style={{ marginTop: '24px' }}>
            <span className="divider-line" />
            <span className="divider-text">or register with email</span>
            <span className="divider-line" />
          </div>

          {/* Social Buttons */}
          <div className="social-row">
            <button className="social-btn" onClick={handleGoogle} disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
                <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>
            <button className="social-btn" onClick={handleFacebook} disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M18 9C18 4.029 13.971 0 9 0S0 4.029 0 9c0 4.491 3.291 8.212 7.594 8.892V11.6H5.309V9h2.285V7.014c0-2.256 1.344-3.503 3.4-3.503.984 0 2.015.176 2.015.176V5.9h-1.135c-1.118 0-1.467.694-1.467 1.406V9h2.496l-.399 2.6H10.41v6.292C14.709 17.212 18 13.491 18 9z" fill="#1877F2"/>
                <path d="M12.504 11.6l.399-2.6H10.41V7.306c0-.712.349-1.406 1.467-1.406h1.135V3.687s-1.031-.176-2.016-.176c-2.055 0-3.4 1.247-3.4 3.503V9H5.31v2.6h2.285v6.292a9.073 9.073 0 0 0 2.812 0V11.6h2.098z" fill="white"/>
              </svg>
              Sign up with Facebook
            </button>
          </div>

          {/* Footer */}
          <p className="auth-footer">
            Already have an account?{' '}
            <span className="login-link">Sign in</span>
          </p>

          {/* Step dots */}
          <div className="step-dots">
            <span className="dot dot-active" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      </div>
    </>
  );
}