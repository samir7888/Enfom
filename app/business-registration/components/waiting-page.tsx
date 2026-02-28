"use client";

import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WaitingPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center space-y-6 border border-slate-100">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-25"></div>
                        <div className="relative bg-blue-50 p-4 rounded-full">
                            <Clock className="w-12 h-12 text-blue-600 animate-pulse" />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-slate-900">Registration Received!</h1>
                    <p className="text-slate-600">
                        Thank you for registering your business. Our team is currently reviewing your application to ensure all details are correct.
                    </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 text-left space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="mt-1 bg-green-100 rounded-full p-1">
                            <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800">Verification in progress</p>
                            <p className="text-xs text-slate-500">We typically verify businesses within 24-48 hours.</p>
                        </div>
                    </div>


                </div>

                <div className="pt-4">
                    <p className="text-sm text-slate-500 mb-6">
                        You'll receive an email notification once your business has been verified.
                        Please wait until your business is verified to access the dashboard.
                    </p>

                    <Button asChild className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all">
                        <Link href="/">
                            Return to Homepage
                        </Link>
                    </Button>
                </div>
            </div>

            <p className="mt-8 text-slate-400 text-xs">
                &copy; {new Date().getFullYear()} Your Business Platform. All rights reserved.
            </p>
        </div>
    );
}
