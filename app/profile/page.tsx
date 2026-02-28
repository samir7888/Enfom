"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
    Heart,
    MessageSquare,
    Share2,
    User,
    Bell,
    Lock,
    UserCog,
    Settings2,
    ArrowRight
} from "lucide-react"

export default function Profile() {
    return (
        <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 p-4 md:p-8 lg:p-12">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-800 shadow-xl">
                        <AvatarImage src="/alexandra-chen.png" alt="Alexandra Chen" />
                        <AvatarFallback className="text-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white">AC</AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-center md:text-left space-y-2">
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Alexandra Chen</h1>
                            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">UX Designer at Innovate Inc.</p>
                            <p className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">@alexandra.chen</p>
                        </div>

                    </div>


                </div>




                {/* Settings Sidebar */}
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Settings</h2>
                    <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
                        <CardContent className="p-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    { icon: User, label: "Edit Profile", desc: "Change your public profile info" },
                                    { icon: Lock, label: "Privacy Settings", desc: "Control your visibility" },
                                    { icon: Bell, label: "Notification Settings", desc: "Manage your alerts" },
                                    { icon: Lock, label: "Change Password", desc: "Update your security" },
                                    { icon: Settings2, label: "Account Management", desc: "Subscription and billing" },
                                    { icon: UserCog, label: "Switch to Business Account", desc: "Switch to business account" },
                                ].map((item, idx) => (
                                    <button
                                        key={idx}
                                        className="flex items-center gap-4 w-full p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group border-b border-slate-50 dark:border-slate-800 last:border-0"
                                    >
                                        <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 transition-colors">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    )
}
