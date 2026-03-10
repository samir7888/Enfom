'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // Optional: Install lucide-react for icons
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAppMutation } from '@/hooks/useAppMutation';

const CreatePin = () => {
    const [showPin, setShowPin] = useState(false);
    const [showConfirmPin, setShowConfirmPin] = useState(false);
    const [formData, setFormData] = useState({ Pin: '', confirmPin: '' });
    const { mutate, isPending } = useAppMutation();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.Pin !== formData.confirmPin) {
            toast.error("Pins do not match!");
            return;
        }
        mutate({
            endpoint: "Pin/set-pin",
            method: "post",
            data: { pin: formData.Pin, pinType: 0 },
            onSuccess: () => {
                toast.success("Pin reset successfully!");
                router.push('/login');
            },
            onError: (error) => {
                toast.error("An error occurred while resetting the Pin.");
            }
        })
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4">
            <div className="w-full max-w-[400px] text-center">
                {/* Header Section */}
                <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-2">
                    Reset Pin
                </h1>
                <p className="text-[#7D7D7D] text-[15px] leading-relaxed mb-10 px-6">
                    Enter your new 4 or 6 digits pin
                </p>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="text-left space-y-6">

                    {/* New Pin Field */}
                    <div className="relative">
                        <label className="block text-[15px] font-bold text-[#1A1A1A] mb-3 ml-1">
                            New Pin
                        </label>
                        <div className="relative">
                            <input
                                type={showPin ? "text" : "number"}
                                required
                                placeholder="Pin"
                                className="w-full h-[60px] px-5 pr-12 rounded-[18px] border border-[#EAEAEA] text-[#1A1A1A] placeholder:text-[#CBCBCB] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                onChange={(e) => setFormData({ ...formData, Pin: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPin(!showPin)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D7D7D]"
                            >
                                {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Pin Field */}
                    <div className="relative">
                        <label className="block text-[15px] font-bold text-[#1A1A1A] mb-3 ml-1">
                            Confirm New Pin
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPin ? "text" : "number"}
                                required
                                placeholder="Pin"
                                className="w-full h-[60px] px-5 pr-12 rounded-[18px] border border-[#EAEAEA] text-[#1A1A1A] placeholder:text-[#CBCBCB] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                                onChange={(e) => setFormData({ ...formData, confirmPin: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPin(!showConfirmPin)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D7D7D]"
                            >
                                {showConfirmPin ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Reset Button */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full h-[60px] bg-[#1A1A1B] text-white font-bold rounded-[18px] mt-4 hover:bg-black active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all text-[16px]"
                    >
                        {isPending ? 'Resetting...' : 'Reset Pin'}
                    </button>
                </form>
            </div>
        </div>
    );
};


export default CreatePin;