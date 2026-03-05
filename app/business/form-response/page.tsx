'use client';

import React, { useState, useEffect } from 'react';
import {
    Table,
    TrendingUp,
    FileText,
    Users,
    Search,
    Download,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    MessageCircle,
    Copy,
    Share2,
    Calendar,
    Image as ImageIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/app/business/components/data-table';
import { cn } from "@/lib/utils";

// Mock data for form responses
const MOCK_DATA = [
    {
        id: "101",
        full_name: "Rahul Sharma",
        email: "rahul@example.com",
        age: 24,
        country: "India",
        status: "Completed",
        submitted_at: "2024-05-12 10:30 AM",
        profile_photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    },
    {
        id: "102",
        full_name: "John Doe",
        email: "john@example.com",
        age: 32,
        country: "USA",
        status: "Pending",
        submitted_at: "2024-05-12 11:15 AM",
        profile_photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop",
    },
    {
        id: "103",
        full_name: "Sophia Martinez",
        email: "sophia@example.com",
        age: 28,
        country: "Mexico",
        status: "Completed",
        submitted_at: "2024-05-13 09:45 AM",
        profile_photo: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop",
    },
    {
        id: "104",
        full_name: "Liam O'Connor",
        email: "liam@example.com",
        age: 26,
        country: "Ireland",
        status: "In Review",
        submitted_at: "2024-05-14 02:20 PM",
        profile_photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=2080&auto=format&fit=crop",
    },
    {
        id: "105",
        full_name: "Emma Wilson",
        email: "emma@example.com",
        age: 22,
        country: "UK",
        status: "Completed",
        submitted_at: "2024-05-15 04:10 PM",
        profile_photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    },
];

const COLUMNS = [
    { header: "Profile", accessorKey: "profile_photo", type: "image" as const },
    { header: "Full Name", accessorKey: "full_name", type: "text" as const },
    { header: "Email", accessorKey: "email", type: "text" as const },
    { header: "Age", accessorKey: "age", type: "number" as const },
    { header: "Country", accessorKey: "country", type: "text" as const },
    { header: "Status", accessorKey: "status", type: "badge" as const },
    { header: "Submitted At", accessorKey: "submitted_at", type: "date" as const },
];

export default function FormResponsePage() {
    const [responses, setResponses] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Here you would normally call your API:
                // const res = await apiClient.get('/form-responses/1');
                // setResponses(res.data);

                // For now, using mock data
                await new Promise(resolve => setTimeout(resolve, 800));
                setResponses(MOCK_DATA);
            } catch (error) {
                console.error("Failed to fetch form responses", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredResponses = responses.filter(resp =>
        resp.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resp.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resp.status?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (item: any) => {
        console.log("✏️ Editing response:", item.id);
        // Implement edit logic or navigation
    };

    const handleDelete = (item: any) => {
        if (confirm(`Are you sure you want to delete response from ${item.full_name}?`)) {
            setResponses(prev => prev.filter(r => r.id !== item.id));
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
            {/* Header section with Stats */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20">
                                <FileText className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase">Form Management</span>
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 italic">Form Responses</h1>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-lg">
                            Real-time data visualization of user submissions for your active forms. Track, manage, and analyze responses at a glance.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="outline" className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-bold shadow-sm transition-all hover:border-indigo-500">
                            <Download className="mr-2 h-4 w-4 text-indigo-500" />
                            Export CSV
                        </Button>
                        <Button className="rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]">
                            <Share2 className="mr-2 h-4 w-4" />
                            Share Report
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: "Total Submissions", value: responses.length, icon: Users, color: "text-indigo-600", bg: "bg-indigo-500/10" },
                        { label: "Unique Users", value: "842", icon: Search, color: "text-emerald-600", bg: "bg-emerald-500/10" },
                        { label: "Completion Rate", value: "92%", icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-500/10" },
                        { label: "Avg. Response Time", value: "2m 45s", icon: Calendar, color: "text-purple-600", bg: "bg-purple-500/10" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 p-4 rounded-3xl shadow-sm flex items-center justify-between group transition-all hover:shadow-md hover:border-indigo-200 dark:hover:border-zinc-700">
                            <div className="space-y-1">
                                <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">{stat.label}</p>
                                <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{stat.value}</p>
                            </div>
                            <div className={cn("p-3 rounded-2xl group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                                <stat.icon className="h-5 w-5" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Table Control Section */}
            <Card className="border-0 bg-transparent shadow-none">
                <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:w-96 group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 transition-colors group-focus-within:text-indigo-500" />
                        <Input
                            placeholder="Find specific responses..."
                            className="pl-10 h-11 rounded-2xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-3 overflow-hidden p-1 mr-2">
                            {responses.slice(0, 4).map((r, i) => (
                                <img
                                    key={i}
                                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-950 object-cover"
                                    src={r.profile_photo}
                                    alt="User"
                                />
                            ))}
                        </div>
                        <Button variant="ghost" size="sm" className="rounded-xl h-10 px-4 border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 font-bold">
                            <Filter className="mr-2 h-4 w-4" />
                            Advanced Filter
                        </Button>
                    </div>
                </div>

                <div className="relative">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center p-20 space-y-4">
                            <div className="w-12 h-12 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin"></div>
                            <p className="text-sm font-bold text-zinc-500 animate-pulse">Loading dynamic responses...</p>
                        </div>
                    ) : (
                        <div className="animate-in slide-in-from-bottom-4 duration-500">
                            <DataTable
                                data={filteredResponses}
                                columns={COLUMNS}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </div>
                    )}
                </div>

                {/* Pagination Placeholder */}
                {!isLoading && filteredResponses.length > 0 && (
                    <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-[11px] font-bold text-zinc-400 gap-4">
                        <p className="uppercase tracking-widest">Showing {filteredResponses.length} of {responses.length} Submissions</p>
                        <div className="flex items-center gap-1.5">
                            <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-bold shadow-sm disabled:opacity-50">Previous</Button>
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20">1</Button>
                                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800">2</Button>
                                <Button variant="ghost" size="sm" className="h-9 w-9 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800">3</Button>
                            </div>
                            <Button variant="outline" size="sm" className="h-9 px-4 rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-bold shadow-sm">Next</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
