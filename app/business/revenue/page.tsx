'use client';

import {
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    Download,
    Filter,
    MoreHorizontal,
    Eye,
    FileText,
    TrendingUp,
    CreditCard,
    History
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const FORMS_REVENUE = [
    {
        id: "FORM-7821",
        name: "Enterprise SaaS Survey",
        submissions: 1240,
        conversion: "12.4%",
        revenue: 45200,
        date: "Dec 12, 2023",
        status: "Active"
    },
    {
        id: "FORM-4590",
        name: "Product Feedback - Q4",
        submissions: 890,
        conversion: "8.1%",
        revenue: 12300,
        date: "Nov 28, 2023",
        status: "Active"
    },
    {
        id: "FORM-9012",
        name: "Customer Onboarding",
        submissions: 2100,
        conversion: "15.2%",
        revenue: 89400,
        date: "Oct 15, 2023",
        status: "Active"
    },
    {
        id: "FORM-3140",
        name: "Beta Feature Request",
        submissions: 450,
        conversion: "5.4%",
        revenue: 2150,
        date: "Sep 30, 2023",
        status: "Archived"
    },
    {
        id: "FORM-2150",
        name: "Professional Plan Checkout",
        submissions: 670,
        conversion: "22.8%",
        revenue: 134000,
        date: "Aug 12, 2023",
        status: "Active"
    },
];

export default function RevenuePage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-zinc-950/50 p-6 md:p-10 space-y-8 animate-in fade-in duration-700">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">Revenue Dashboard</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Monitor your earnings and manage payouts across all your forms.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-semibold shadow-sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export Data
                    </Button>
                    <Button className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-lg shadow-indigo-500/20">
                        <History className="mr-2 h-4 w-4" />
                        Payout History
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Available Balance Card */}
                <Card className="relative overflow-hidden border-0 bg-indigo-600 text-white shadow-2xl shadow-indigo-500/20">
                    <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                    <CardHeader className="pb-2">
                        <CardDescription className="text-indigo-100/80 font-medium uppercase tracking-wider text-[10px]">Total Available Balance</CardDescription>
                        <CardTitle className="text-4xl font-black tracking-tight">$12,450.00</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-2 text-indigo-100 text-xs font-medium">
                            <TrendingUp className="h-3.5 w-3.5" />
                            <span>+12.5% from last month</span>
                        </div>
                        <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl shadow-lg border-0 h-11">
                            <Wallet className="mr-2 h-4 w-4" />
                            Withdraw Funds
                        </Button>
                    </CardContent>
                </Card>

                {/* Paid Out Card */}
                <Card className="border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 rounded-3xl shadow-lg transition-all hover:shadow-xl group">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold">Total Paid Out</CardDescription>
                            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                                <ArrowUpRight className="h-5 w-5" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-black text-zinc-900 dark:text-zinc-100">$84,200.00</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-0 rounded-lg text-[10px] font-bold">
                                7 Payouts Completed
                            </Badge>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-[11px] text-zinc-400 font-medium">
                            <CreditCard className="h-3 w-3" />
                            <span>Last payout: Jan 24, 2024</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Card */}
                <Card className="border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 rounded-3xl shadow-lg transition-all hover:shadow-xl group">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardDescription className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold">Gross Revenue</CardDescription>
                            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-black text-zinc-900 dark:text-zinc-100">$96,650.00</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2 italic text-zinc-400 text-xs">
                            Across all published forms
                        </div>
                        <div className="mt-6 h-1 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 rounded-full w-[85%]" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Forms Table Section */}
            <Card className="border-zinc-200/50 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/50 rounded-3xl shadow-xl overflow-hidden backdrop-blur-sm">
                <CardHeader className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex flex-row items-center justify-between space-y-0">
                    <div>
                        <CardTitle className="text-xl font-bold">Forms Analysis</CardTitle>
                        <CardDescription className="text-xs">Revenue generated per individual form.</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="rounded-lg h-9 w-9 p-0 border border-zinc-200 dark:border-zinc-800">
                            <Filter className="h-4 w-4 text-zinc-500" />
                        </Button>
                    </div>
                </CardHeader>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-slate-50/50 dark:bg-zinc-900/50">
                            <TableRow className="hover:bg-transparent border-zinc-100 dark:border-zinc-800">
                                <TableHead className="w-[300px] text-[10px] uppercase font-bold tracking-widest text-zinc-400">Form Name</TableHead>
                                <TableHead className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Submissions</TableHead>
                                <TableHead className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Conv. Rate</TableHead>
                                <TableHead className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Revenue</TableHead>
                                <TableHead className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Status</TableHead>
                                <TableHead className="text-right text-[10px] uppercase font-bold tracking-widest text-zinc-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {FORMS_REVENUE.map((form) => (
                                <TableRow key={form.id} className="group hover:bg-slate-50 dark:hover:bg-zinc-900/50 transition-colors border-zinc-100 dark:border-zinc-800">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-black text-xs">
                                                {form.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div className="space-y-0.5">
                                                <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm line-clamp-1">{form.name}</p>
                                                <p className="text-[10px] text-zinc-400 font-medium">{form.id} • Created on {form.date}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-bold text-sm">{form.submissions.toLocaleString()}</span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg text-[10px] font-bold border-0">
                                            {form.conversion}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-black text-zinc-900 dark:text-zinc-100 text-sm italic">
                                            ${form.revenue.toLocaleString()}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "h-1.5 w-1.5 rounded-full ring-2 ring-offset-2 dark:ring-offset-zinc-900 shadow-sm",
                                                form.status === "Active" ? "bg-emerald-500 ring-emerald-500/20" : "bg-zinc-300 ring-zinc-300/20"
                                            )} />
                                            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                                                {form.status}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white dark:hover:bg-zinc-800 rounded-lg">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-xl border-zinc-200 dark:border-zinc-800 shadow-xl">
                                                <DropdownMenuLabel>Form Actions</DropdownMenuLabel>
                                                <DropdownMenuItem className="rounded-lg">
                                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="rounded-lg">
                                                    <Download className="mr-2 h-4 w-4" /> Download Report
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem className="text-red-600 rounded-lg">
                                                    <FileText className="mr-2 h-4 w-4" /> Archive Form
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-slate-50/30 flex items-center justify-between text-xs text-zinc-400 font-medium">
                    <p>Showing 5 of 120 forms entries</p>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 rounded-lg border-zinc-200 dark:border-zinc-800">Prev</Button>
                        <div className="flex items-center gap-1">
                            <Button variant="outline" size="sm" className="h-8 w-8 rounded-lg bg-indigo-600 text-white border-0 shadow-sm">1</Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg">2</Button>
                        </div>
                        <Button variant="outline" size="sm" className="h-8 rounded-lg border-zinc-200 dark:border-zinc-800">Next</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}