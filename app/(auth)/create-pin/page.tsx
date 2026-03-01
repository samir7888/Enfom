'use client';

import { useState } from 'react';

export default function CreatePin() {
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!/^\d{6}$/.test(newPin)) {
      setError('PIN must be exactly 6 digits.'); return;
    }
    if (newPin !== confirmPin) {
      setError('PINs do not match.'); return;
    }

    setLoading(true);
    try {
      // TODO: await api.setPin(newPin)
      await new Promise(r => setTimeout(r, 1000));
      setSuccess('PIN set successfully!');
      setNewPin(''); setConfirmPin('');
    } catch (err) {
      setError((err instanceof Error ? err.message : 'Failed to set PIN. Please try again.') || 'Failed to set PIN. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .create-pin-section {
          min-height: 100vh;
          background: #f5f5f0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          font-family: 'DM Sans', sans-serif;
        }

        .pin-reset-container {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: 20px;
          padding: 44px 40px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08);
          animation: cardIn 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .pin-reset-container h2 {
          font-size: 1.6rem;
          font-weight: 700;
          color: #0f0f0f;
          margin: 0 0 10px;
          letter-spacing: -0.4px;
        }

        .description {
          font-size: 0.875rem;
          color: #6b7280;
          line-height: 1.6;
          margin: 0 0 28px;
        }

        .pin-form { display: flex; flex-direction: column; gap: 18px; }

        .input-group { display: flex; flex-direction: column; gap: 7px; }

        .input-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #374151;
          letter-spacing: 0.01em;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          background: #fafafa;
          transition: all 0.2s ease;
          overflow: hidden;
        }
        .input-wrapper:focus-within {
          border-color: #0f0f0f;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(15,15,15,0.06);
        }
        .input-wrapper.has-error {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220,38,38,0.06);
        }

        .pin-input {
          width: 100%;
          padding: 12px 44px 12px 16px;
          border: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 0.3em;
          color: #0f0f0f;
          outline: none;
        }
        .pin-input::placeholder { color: #d1d5db; letter-spacing: 0.2em; }

        .icon {
          position: absolute;
          right: 14px;
          font-size: 1rem;
          color: #9ca3af;
          pointer-events: none;
          line-height: 1;
        }

        .error-msg {
          font-size: 0.78rem;
          color: #dc2626;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 9px 13px;
          font-weight: 500;
        }

        .success-msg {
          font-size: 0.78rem;
          color: #059669;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: 10px;
          padding: 9px 13px;
          font-weight: 500;
        }

        .submit-btn {
          width: 100%;
          padding: 13px;
          background: #0f0f0f;
          color: #fff;
          border: none;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
          letter-spacing: 0.01em;
        }
        .submit-btn:hover:not(:disabled) {
          background: #1f1f1f;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        .btn-spinner {
          width: 18px; height: 18px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 480px) {
          .pin-reset-container { padding: 32px 24px; }
        }
      `}</style>

      <section className="create-pin-section">
        <div className="pin-reset-container">
          <h2>Set Security PIN</h2>
          <p className="description">
            Enter a 6-digit numeric PIN to secure your dashboard access and protect your data.
          </p>

          <form className="pin-form" onSubmit={handleSubmit} noValidate>
            {/* New PIN */}
            <div className="input-group">
              <label htmlFor="new-pin">New PIN</label>
              <div className={`input-wrapper ${error && newPin.length !== 6 ? 'has-error' : ''}`}>
                <input
                  id="new-pin"
                  type="password"
                  className="pin-input"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="••••••"
                  value={newPin}
                  onChange={e => setNewPin(e.target.value.replace(/\D/g, ''))}
                />
                <span className="icon">◎</span>
              </div>
            </div>

            {/* Confirm PIN */}
            <div className="input-group">
              <label htmlFor="confirm-pin">Confirm New PIN</label>
              <div className={`input-wrapper ${error && confirmPin !== newPin ? 'has-error' : ''}`}>
                <input
                  id="confirm-pin"
                  type="password"
                  className="pin-input"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="\d*"
                  placeholder="••••••"
                  value={confirmPin}
                  onChange={e => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                />
                <span className="icon">◎</span>
              </div>
            </div>

            {/* Messages */}
            {error   && <p className="error-msg">{error}</p>}
            {success && <p className="success-msg">{success}</p>}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : 'Set PIN & Continue'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}