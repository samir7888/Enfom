'use client';

import { useState } from 'react';
import { Check, ShieldCheck, Zap, Rocket, Building2, Crown, Info, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const PLANS = [
    {
        id: 'starter',
        name: 'Starter',
        price: 0,
        description: 'Perfect for individuals and side projects.',
        icon: Rocket,
        iconColor: 'text-blue-500',
        iconBg: 'bg-blue-500/10',
        features: [
            '1 Workspace',
            'Up to 5 Projects',
            'Basic Analytics',
            'Community Support',
            '2GB Storage',
        ],
    },
    {
        id: 'pro',
        name: 'Pro',
        price: 49,
        description: 'The best value with advanced features for growing teams.',
        icon: Crown,
        iconColor: 'text-indigo-500',
        iconBg: 'bg-indigo-500/10',
        popular: true,
        features: [
            'Unlimited Workspaces',
            'Unlimited Projects',
            'Advanced Analytics',
            'Priority Email Support',
            '100GB Storage',
            'Custom Branding',
        ],
    },
    {
        id: 'enterprise',
        name: 'Enterprise',
        price: 199,
        description: 'Bespoke solutions and security for large scale operations.',
        icon: Building2,
        iconColor: 'text-purple-500',
        iconBg: 'bg-purple-500/10',
        features: [
            'SSO & SAML Login',
            'Unlimited Team Members',
            'Dedicated Account Manager',
            '24/7 Phone Support',
            'Unlimited Storage',
            'SLA Guaranteed Uptime',
        ],
    },
];


export default function BillingPage() {
    const [selectedPlanId, setSelectedPlanId] = useState('pro');

    const selectedPlan = PLANS.find(p => p.id === selectedPlanId) || PLANS[1];

    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-zinc-950/50 p-6 md:p-10 space-y-8 animate-in fade-in duration-700">

            {/* Header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Plans & Billing</h1>
                <p className="text-zinc-500 dark:text-zinc-400">Select the right plan for your business and scale with confidence.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Side: Plans Selection */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        {PLANS.map((plan) => (
                            <Card
                                key={plan.id}
                                onClick={() => setSelectedPlanId(plan.id)}
                                className={cn(
                                    "relative cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:shadow-xl group",
                                    selectedPlanId === plan.id
                                        ? "border-indigo-500 bg-white dark:bg-zinc-900 shadow-indigo-500/5 shadow-lg"
                                        : "border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0">
                                        <div className="px-3 py-1 bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl shadow-lg">
                                            Most Popular
                                        </div>
                                    </div>
                                )}

                                <CardContent className="p-6">
                                    <div className="flex items-start gap-5">
                                        <div className={cn("p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm", plan.iconBg)}>
                                            <plan.icon className={cn("h-7 w-7", plan.iconColor)} />
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xl font-bold tracking-tight">{plan.name}</h3>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl font-black">${plan.price}</span>
                                                    <span className="text-xs text-zinc-400 font-medium">/month</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">{plan.description}</p>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 pt-6">
                                                {plan.features.slice(0, 4).map((feature, i) => (
                                                    <div key={i} className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
                                                        <Check className="h-4 w-4 text-emerald-500 stroke-[3px]" />
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Billing Info Footer Card */}
                    <Card className="bg-indigo-500/5 border-indigo-200/30 dark:border-indigo-500/20 rounded-3xl">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                                    <Info className="h-5 w-5" />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Need a custom plan?</p>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">For teams larger than 100+ members, contact our sales team.</p>
                                </div>
                            </div>
                            <Button variant="outline" className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-semibold text-xs">
                                Contact Sales
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Side: Sticky Selection Card */}
                <div className="lg:col-span-4 sticky top-10 space-y-6">
                    <Card className="border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-3xl shadow-2xl shadow-indigo-500/5 overflow-hidden border-t-4 border-t-indigo-500">
                        <CardHeader className="pb-4">
                            <Badge className="w-fit mb-2 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border-0 rounded-lg">
                                Selected Plan
                            </Badge>
                            <CardTitle className="text-2xl font-black">{selectedPlan.name}</CardTitle>
                            <CardDescription className="text-sm">Summary of your new subscription details</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <div className="bg-slate-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 space-y-4 shadow-inner">
                                <div className="flex items-center justify-between font-bold">
                                    <span className="text-zinc-500 uppercase tracking-widest text-[10px]">Monthly Subscription</span>
                                    <span className="text-xl">${selectedPlan.price}.00</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-semibold text-zinc-400">
                                    <span>Platform Fee</span>
                                    <span className="text-emerald-500">Included</span>
                                </div>
                                <Separator className="bg-zinc-200 dark:bg-zinc-800" />
                                <div className="flex items-center justify-between font-black text-lg">
                                    <span>Total due today</span>
                                    <span className="text-indigo-500 text-2xl">${selectedPlan.price}.00</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-wider pl-1">Includes:</p>
                                <div className="space-y-2">
                                    {selectedPlan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
                                            <ShieldCheck className="h-3.5 w-3.5 text-indigo-500 mt-0.5" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col gap-3 p-6 pt-0">
                            <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 group">
                                Confirm & Use {selectedPlan.name}
                            </Button>
                            <Button variant="ghost" className="w-full text-zinc-500 dark:text-zinc-400 font-bold text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl group">
                                <X className="h-3 w-3 mr-2 group-hover:scale-125 transition-transform" />
                                Cancel purchase
                            </Button>
                            <p className="text-[10px] text-center text-zinc-400 font-medium px-4">
                                By clicking "Confirm", you agree to our Terms of Service and Privacy Policy. You can cancel at any time.
                            </p>
                        </CardFooter>
                    </Card>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        <div className="flex items-center gap-1.5 grayscale">
                            <Zap className="h-4 w-4 fill-current" />
                            <span className="text-[10px] font-bold tracking-tighter uppercase italic">Stripe Secure</span>
                        </div>
                        <div className="flex items-center gap-1.5 grayscale">
                            <ShieldCheck className="h-4 w-4" />
                            <span className="text-[10px] font-bold tracking-tighter uppercase italic">AES-256 bits</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
