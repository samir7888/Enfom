'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export default function PinLogin() {
  const [pin, setPin] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits and limit to 6 characters
    const val = e.target.value.replace(/\D/g, '');
    setPin(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length === 6) {
      alert(`PIN Submitted: ${pin}`);
    }
  };

  return (
    <section className={styles.pinLoginSection}>
      <div className={styles.pinLoginContainer}>
        <h2>Enter PIN</h2>
        <p className={styles.description}>
          Please enter your 6-digit security code to access your dashboard.
        </p>

        <form className={styles.pinForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="login-pin">Security PIN</label>
            <div className={styles.inputWrapper}>
              <input
                type="password"
                id="login-pin"
                maxLength={6}
                inputMode="numeric"
                autoComplete="one-time-code"
                placeholder="••••••"
                value={pin}
                onChange={handleInputChange}
                autoFocus
              />
              <span className={styles.icon}>◎</span>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Unlock Dashboard
          </button>

          <div className={styles.footerLinks}>
            <a href="#">Forgot PIN?</a>
          </div>
        </form>
      </div>
    </section>
  );
}