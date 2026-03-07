'use client';

import React, { useState, useEffect } from 'react';
import {
    TrendingUp,
    FileText,
    Users,
    Search,
    Download,
    Filter,
    Share2,
    Calendar,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/app/business/components/data-table';
import { cn } from "@/lib/utils";
import { useFetchData } from '@/hooks/useFetchData';
import { useParams } from 'next/navigation';

// Define types based on the API response structure
interface FormSubmission {
    id: string;
    formTemplateId: string;
    userId: string;
    formData: string; // JSON string
    status: string;
    isPaid: boolean;
    paymentMethod: string;
    paidAmount: number;
    submittedAt: string;
    [key: string]: any;
}

interface Column {
    header: string;
    accessorKey: string;
    type?: 'text' | 'image' | 'date' | 'badge' | 'number';
}

export default function FormResponsePage() {
    const params = useParams();
    const resolvedId = (params?.id as string) || "";

    const [responses, setResponses] = useState<any[]>([]);
    const [columns, setColumns] = useState<Column[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const { data, isLoading, error } = useFetchData<any>({
        queryKey: ["formResponse", resolvedId],
        endpoint: `FormSubmission/GetFormData/${resolvedId}`,
        options: {
            enabled: !!resolvedId
        }
    });

    useEffect(() => {
        const rawData = data?.data || data;
        if (rawData && Array.isArray(rawData) && rawData.length > 0) {
            // Process responses: Parse formData JSON
            const processed = rawData.map((item: FormSubmission) => {
                let parsedData = {};
                try {
                    parsedData = JSON.parse(item.formData);
                } catch (e) {
                    console.error("Error parsing formData:", e);
                }
                return {
                    ...item,
                    ...parsedData,
                    submittedAt: new Date(item.submittedAt).toLocaleString()
                };
            });
            setResponses(processed);

            // Generate Columns dynamically from the first item's formData
            try {
                const firstItemParsed = JSON.parse(rawData[0].formData);
                const dynamicCols: Column[] = Object.keys(firstItemParsed).map(key => ({
                    header: key.charAt(0).toUpperCase() + key.slice(1),
                    accessorKey: key,
                    type: isNaN(Number(firstItemParsed[key])) ? 'text' : 'number'
                }));

                const finalColumns: Column[] = [
                    ...dynamicCols,
                    { header: "Status", accessorKey: "status", type: "badge" },
                    { header: "Submitted At", accessorKey: "submittedAt", type: "text" },
                ];
                setColumns(finalColumns);
            } catch (e) {
                console.error("Error generating columns:", e);
                // Fallback columns
                setColumns([
                    { header: "Status", accessorKey: "status", type: "badge" },
                    { header: "Submitted At", accessorKey: "submittedAt", type: "text" },
                ]);
            }
        }
    }, [data]);


    const filteredResponses = responses.filter(resp => {
        const searchStr = searchQuery.toLowerCase();
        // Search through all properties including dynamic ones from formData
        return Object.values(resp).some(val =>
            String(val).toLowerCase().includes(searchStr)
        );
    });

    const handleEdit = (item: any) => {
        console.log("✏️ Editing response:", item.id);
        // Implement edit logic or navigation
    };

    const handleDelete = (item: any) => {
        if (confirm(`Are you sure you want to delete this response?`)) {
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
                                <div
                                    key={i}
                                    className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-zinc-950 bg-indigo-100 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-indigo-600 dark:text-indigo-400"
                                >
                                    {(r.Name || "U")[0]}
                                </div>
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
                                columns={columns}
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
