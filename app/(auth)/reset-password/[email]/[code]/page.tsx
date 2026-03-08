'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Optional: Install lucide-react for icons
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { API_BASE_URL } from '@/contants';
import { toast } from 'sonner';

export default function ResetPassword() {
    const params = useParams();
    const email = typeof params.email === 'string' ? decodeURIComponent(params.email) : params.email;
    const code = typeof params.code === 'string' ? decodeURIComponent(params.code) : params.code;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }



        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/Auth/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Assuming you'd have an email or token as well, adjust body as needed
                body: JSON.stringify({ newPassword: formData.password, email, verificationToken: code }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || "Failed to reset password.");
            }

            toast.success("Password reset successfully!");
            router.push('/login');
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while resetting the password.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4">
            <div className="w-full max-w-[400px] text-center">
                {/* Header Section */}
                <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-2">
                    Reset Password
                </h1>
                <p className="text-[#7D7D7D] text-[15px] leading-relaxed mb-10 px-6">
                    Enter your registered login email address to receive a secured link to set a new password
                </p>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="text-left space-y-6">

                    {/* New Password Field */}
                    <div className="relative">
                        <label className="block text-[15px] font-bold text-[#1A1A1A] mb-3 ml-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="Password"
                                className="w-full h-[60px] px-5 pr-12 rounded-[18px] border border-[#EAEAEA] text-[#1A1A1A] placeholder:text-[#CBCBCB] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D7D7D]"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="relative">
                        <label className="block text-[15px] font-bold text-[#1A1A1A] mb-3 ml-1">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                placeholder="Password"
                                className="w-full h-[60px] px-5 pr-12 rounded-[18px] border border-[#EAEAEA] text-[#1A1A1A] placeholder:text-[#CBCBCB] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D7D7D]"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-[60px] bg-[#1A1A1B] text-white font-bold rounded-[18px] mt-4 hover:bg-black active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all text-[16px]"
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}