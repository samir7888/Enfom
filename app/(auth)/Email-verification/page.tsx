'use client';

import React, { useState } from 'react';

export default function VerifyEmail() {
    const [email, setEmail] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('/Auth/request-password-reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to send code');
            }

            console.log("Code sent successfully to:", email);
            // Optional: redirect to the verify-code page
            // window.location.href = '/verify-code';
        } catch (error) {
            console.error(error);
            alert("Failed to send verification code. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4">
            <div className="w-full max-w-[400px] text-center">
                {/* Header Section */}
                <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-2">
                    Verify Email
                </h1>
                <p className="text-[#7D7D7D] text-[15px] leading-relaxed mb-10 px-6">
                    Enter your registered login email address to receive a verification code
                </p>

                {/* Form Section */}
                <form onSubmit={handleSendCode} className="text-left">
                    <div className="mb-8">
                        <label className="block text-[15px] font-bold text-[#1A1A1A] mb-3 ml-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="example@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full h-[60px] px-5 rounded-[18px] border border-[#EAEAEA] text-[#1A1A1A] placeholder:text-[#CBCBCB] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                        />
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-[60px] bg-[#1A1A1B] text-white font-bold rounded-[18px] hover:bg-black active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all text-[16px]"
                    >
                        {isLoading ? 'Sending...' : 'Send Code'}
                    </button>
                </form>

                {/* Footer Link */}
                <p className="mt-8 text-[14px] text-[#7D7D7D]">
                    Remembered your password?{' '}
                    <a href="/login" className="text-black font-bold hover:underline">
                        Back to Login
                    </a>
                </p>
            </div>
        </div>
    );
}