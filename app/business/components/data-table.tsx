'use client';

import React from 'react';
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, Eye, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Column {
    header: string;
    accessorKey: string;
    type?: 'text' | 'image' | 'date' | 'badge' | 'number';
}

interface DataTableProps {
    data: any[];
    columns?: Column[];
    onEdit?: (item: any) => void;
    onDelete?: (item: any) => void;
    onViewImage?: (url: string) => void;
}

export function DataTable({
    data,
    columns: manualColumns,
    onEdit,
    onDelete,
    onViewImage
}: DataTableProps) {
    // If no columns provided, infer from the first data item
    const columns: Column[] = manualColumns || (data.length > 0
        ? Object.keys(data[0])
            .filter(key => key !== 'id')
            .map(key => ({
                header: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
                accessorKey: key,
                type: 'text'
            }))
        : []);

    const handleViewImage = (url: string) => {
        if (onViewImage) {
            onViewImage(url);
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
            <Table>
                <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                    <TableRow className="hover:bg-transparent border-zinc-100 dark:border-zinc-800">
                        {columns.map((column) => (
                            <TableHead
                                key={column.accessorKey}
                                className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 py-4"
                            >
                                {column.header}
                            </TableHead>
                        ))}
                        <TableHead className="text-right text-[10px] uppercase font-bold tracking-widest text-zinc-400 py-4">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={columns.length + 1} className="h-24 text-center text-zinc-500">
                                No results found.
                            </TableCell>
                        </TableRow>
                    ) : (       
                        data.map((row, rowIndex) => (
                            <TableRow
                                key={row.id || rowIndex}
                                className="group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors border-zinc-100 dark:border-zinc-800"
                            >
                                {columns.map((column) => {
                                    const value = row[column.accessorKey];

                                    return (
                                        <TableCell key={column.accessorKey} className="py-4">
                                            {column.type === 'image' ? (
                                                <div className="flex items-center gap-2">
                                                    {value ? (
                                                        <div
                                                            className="relative h-10 w-10 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 cursor-pointer group/img"
                                                            onClick={() => handleViewImage(value)}
                                                        >
                                                            <img
                                                                src={value}
                                                                alt="Thumbnail"
                                                                className="h-full w-full object-cover transition-transform group-hover/img:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                                                                <ExternalLink className="h-3 w-3 text-white" />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-zinc-400 text-xs italic">No image</span>
                                                    )}
                                                </div>
                                            ) : column.type === 'badge' ? (
                                                <Badge variant="outline" className="rounded-lg text-[10px] font-bold border-zinc-200 dark:border-zinc-800">
                                                    {value}
                                                </Badge>
                                            ) : (
                                                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                    {value?.toString() || '-'}
                                                </span>
                                            )}
                                        </TableCell>
                                    );
                                })}
                                <TableCell className="text-right py-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white dark:hover:bg-zinc-800 rounded-lg">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-xl border-zinc-200 dark:border-zinc-800 shadow-xl w-40">
                                            <DropdownMenuLabel className="text-xs text-zinc-500 font-bold uppercase tracking-wider px-3">Actions</DropdownMenuLabel>
                                            <DropdownMenuItem
                                                className="rounded-lg cursor-pointer flex items-center gap-2"
                                                onClick={() => onEdit?.(row)}
                                            >
                                                <Edit className="h-4 w-4 text-indigo-500" />
                                                <span className="text-sm font-medium">Edit Response</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-red-600 rounded-lg cursor-pointer flex items-center gap-2"
                                                onClick={() => onDelete?.(row)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="text-sm font-medium">Delete Entry</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
