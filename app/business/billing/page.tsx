'use client';

import React, { useState } from 'react';
import { Check, X, Download, ArrowUpCircle } from 'lucide-react';

const ALL_PLANS = [
    { id: 'free', name: 'Free Tier', price: 0, current: false },
    { id: 'pro_portfolio', name: 'Pro Portfolio', price: 59, current: false },
    { id: 'pro_annual', name: 'Pro Annual', price: 199, current: true }, // Default
];

export default function BillingLogicPage() {
    // Logic: Default to the 'Pro Annual' plan (Current)
    const [selectedPlan, setSelectedPlan] = useState(ALL_PLANS.find(p => p.current));

    const handleCheckboxChange = (plan: typeof ALL_PLANS[0]) => {
        setSelectedPlan(plan);
    };

    const isUpgrading = selectedPlan?.id !== 'pro_annual';

    return (
        <div className="min-h-screen bg-[#F8F9FB] p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto">

                <div className="flex flex-col lg:flex-row gap-8 mb-12">

                    {/* Left Side: Plan Selection */}
                    <div className="flex-1 bg-white p-8 rounded-[24px] shadow-sm">
                        <h1 className="text-3xl font-bold text-[#1e1b4b] mb-2">Billing</h1>
                        <p className="text-gray-500 mb-8">Select a plan to compare or upgrade your account.</p>

                        <div className="space-y-4">
                            {ALL_PLANS.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`flex items-center justify-between p-5 border rounded-2xl transition-all cursor-pointer ${selectedPlan?.id === plan.id ? 'border-[#FF5F38] bg-orange-50/30' : 'border-gray-100'
                                        }`}
                                    onClick={() => handleCheckboxChange(plan)}
                                >
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedPlan?.id === plan.id}
                                            onChange={() => handleCheckboxChange(plan)}
                                            className="w-5 h-5 accent-[#FF5F38] cursor-pointer"
                                        />
                                        <div>
                                            <p className="font-bold text-[#1e1b4b]">
                                                {plan.name} {plan.current && <span className="ml-2 text-[10px] bg-green-100 text-green-600 px-2 py-1 rounded-full uppercase">Current</span>}
                                            </p>
                                            <p className="text-xs text-gray-400">Monthly billing available</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-[#1e1b4b]">${plan.price}.00</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Dynamic Card */}
                    <div className={`w-full lg:w-[350px] p-8 rounded-[32px] shadow-lg flex flex-col justify-between transition-colors duration-500 ${isUpgrading ? 'bg-[#1e1b4b]' : 'bg-[#FF5F38]'
                        }`}>
                        <div className="text-white">
                            <p className="text-sm opacity-80 mb-2 font-medium">
                                {isUpgrading ? 'Selected Plan' : 'Your plan'}
                            </p>
                            <h3 className="text-3xl font-bold mb-1">{selectedPlan?.name}</h3>
                            <p className="text-4xl font-black mt-4 mb-2">${selectedPlan?.price}<span className="text-sm font-normal">/yr</span></p>
                            <p className="text-sm opacity-70">Renews on Nov. 2026</p>
                        </div>

                        {/* Dynamic Button Logic */}
                        <div className="mt-8">
                            {isUpgrading ? (
                                <button className="w-full py-4 bg-[#FF5F38] text-white rounded-2xl font-bold hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                                    <ArrowUpCircle size={20} />
                                    Upgrade Plan
                                </button>
                            ) : (
                                <button className="w-full py-4 bg-white/10 border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all">
                                    Cancel Subscription
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Comparison Table */}
                <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-50">
                    <h2 className="text-2xl font-bold text-[#1e1b4b] mb-6">Plan Comparison</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="py-4 font-bold text-gray-400">Features</th>
                                    <th className="py-4 font-bold text-center text-gray-400 italic underline decoration-gray-200">Free</th>
                                    <th className="py-4 font-bold text-center text-[#FF5F38]">Premium (Pro)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <tr>
                                    <td className="py-5 text-gray-600">Advanced Analytics</td>
                                    <td className="py-5 text-center"><X className="mx-auto text-gray-300" size={18} /></td>
                                    <td className="py-5 text-center"><Check className="mx-auto text-[#FF5F38]" size={22} /></td>
                                </tr>
                                <tr>
                                    <td className="py-5 text-gray-600">Custom Branding</td>
                                    <td className="py-5 text-center"><span className="text-gray-300">No</span></td>
                                    <td className="py-5 text-center font-bold text-[#1e1b4b]">Yes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}