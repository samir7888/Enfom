'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { API_BASE_URL } from '@/contants';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function VerifyOTP() {
    const params = useParams();
    const router = useRouter();
    const email = typeof params.email === 'string' ? decodeURIComponent(params.email) : params.email;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setIsLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Handle digit input and auto-focus next field
    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < otp.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle paste event to propagate to all fields
    const handlePaste = (e: React.ClipboardEvent) => {
        const data = e.clipboardData.getData('text').trim();
        if (!/^\d+$/.test(data)) return; // Only allow numeric strings

        const digits = data.split('').slice(0, otp.length);
        const newOtp = [...otp];

        digits.forEach((digit, i) => {
            newOtp[i] = digit;
        });

        setOtp(newOtp);

        // Focus the last filled input or the next empty one
        const focusIndex = Math.min(digits.length, otp.length - 1);
        inputRefs.current[focusIndex]?.focus();

        e.preventDefault();
    };

    // Handle backspace to go to previous field
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalCode = otp.join('');
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/Auth/verify-reset-code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code: finalCode }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to verify code');
            }
            const result = await response.json();
            console.log(result);

            const token = result.verificationToken || result.data || finalCode;

            toast.success("Verification code verified successfully!");
            router.push(`/reset-password/${email}/${encodeURIComponent(token)}`);

        } catch (error) {
            console.error(error);
            toast.error("Failed to send verification code. Please try again.");
        } finally {
            setIsLoading(false);
        }
        // Logic to verify and then push to the Reset Password page (your original image)
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4">
            <div className="w-full max-w-[400px] text-center">
                {/* Header Section */}
                <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-2">
                    Verify Code
                </h1>
                <p className="text-[#7D7D7D] text-[15px] leading-relaxed mb-10 px-6">
                    Please enter the 4-digit code sent to your email address
                </p>

                {/* Pin Input Section */}
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-4 mb-10">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                ref={(el) => { inputRefs.current[index] = el; }}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                                className="w-16 h-16 text-center text-2xl font-bold border border-[#EAEAEA] rounded-[18px] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                            />
                        ))}
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full h-[60px] bg-[#1A1A1B] text-white font-bold rounded-[18px] hover:bg-black active:scale-[0.98] transition-all text-[16px]"
                    >
                        {loading ? 'Verifying...' : 'Verify & Proceed'}
                    </button>
                </form>

                {/* Resend Option */}
                <div className="mt-8 text-[14px] text-[#7D7D7D]">
                    Didn't receive the code?{' '}
                    <button className="text-black font-bold hover:underline">
                        Resend Code
                    </button>
                </div>
            </div>
        </div>
    );
}