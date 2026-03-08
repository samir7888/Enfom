'use client';

import React, { useState, useRef, useEffect } from 'react';

export default function VerifyOTP() {
    const [otp, setOtp] = useState(['', '', '', '']); // Array for 4 digits
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Handle digit input and auto-focus next field
    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return; // Only allow numbers

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace to go to previous field
    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalCode = otp.join('');
        console.log("Verifying code:", finalCode);
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
                                className="w-16 h-16 text-center text-2xl font-bold border border-[#EAEAEA] rounded-[18px] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                            />
                        ))}
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        className="w-full h-[60px] bg-[#1A1A1B] text-white font-bold rounded-[18px] hover:bg-black active:scale-[0.98] transition-all text-[16px]"
                    >
                        Verify & Proceed
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