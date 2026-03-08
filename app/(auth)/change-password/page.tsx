'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function ChangePassword() {
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4">
            <div className="w-full max-w-[400px]">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-[28px] font-bold text-[#1A1A1A] mb-2">
                        Change Password
                    </h1>
                    <p className="text-[#7D7D7D] text-[15px] leading-relaxed px-4">
                        Create a strong password to keep your account secure
                    </p>
                </div>

                {/* Form Section */}
                <form className="space-y-6">

                    {/* Old Password */}
                    <div>
                        <label className="block text-[15px] font-bold text-[#1A1A1A] mb-3 ml-1">
                            Old Password
                        </label>
                        <div className="relative">
                            <input
                                type={showOld ? "text" : "password"}
                                placeholder="Enter current password"
                                className="w-full h-[60px] px-5 pr-12 rounded-[18px] border border-[#EAEAEA] text-[#1A1A1A] placeholder:text-[#CBCBCB] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowOld(!showOld)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D7D7D] hover:text-black"
                            >
                                {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-[15px] font-bold text-[#1A1A1A] mb-3 ml-1">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNew ? "text" : "password"}
                                placeholder="Enter new password"
                                className="w-full h-[60px] px-5 pr-12 rounded-[18px] border border-[#EAEAEA] text-[#1A1A1A] placeholder:text-[#CBCBCB] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D7D7D] hover:text-black"
                            >
                                {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="block text-[15px] font-bold text-[#1A1A1A] mb-3 ml-1">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                placeholder="Re-enter new password"
                                className="w-full h-[60px] px-5 pr-12 rounded-[18px] border border-[#EAEAEA] text-[#1A1A1A] placeholder:text-[#CBCBCB] focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D7D7D] hover:text-black"
                            >
                                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full h-[60px] bg-[#1A1A1B] text-white font-bold rounded-[18px] mt-4 hover:bg-black active:scale-[0.98] transition-all text-[16px]"
                    >
                        Update Password
                    </button>
                </form>

                {/* Optional Cancel/Back */}
                <button className="w-full mt-6 text-[#7D7D7D] font-medium hover:text-black transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    );
}