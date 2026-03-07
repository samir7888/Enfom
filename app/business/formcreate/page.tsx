"use client";

import { useState } from "react";
import {
  LayoutGrid, GitBranch, Table2, Calendar,
  Filter, ArrowUpDown, Zap, Maximize2, Plus,
  MoreHorizontal, MessageSquare, Paperclip, Eye, Pencil, FileText,
  ChevronDown, Circle, Clock, CheckCircle2, AlertCircle,
  X, Tag, User, Flag, CalendarDays, Share2
} from "lucide-react";
import Link from "next/link";
import { useFetchData } from "@/hooks/useFetchData";

interface CardData {
  id: string;
  formName: string;
  description: string;
  createdAt: string;
}



interface ResponseData {
  data: CardData[];
  success: string;
}




// ─── Form Card ──────────────────────────────────────────────────────────────

function FormCard({
  card,
}: {
  card: CardData;
}) {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Decorative Gradient Top */}

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
            <FileText size={22} strokeWidth={2.5} />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            <Clock size={12} strokeWidth={2.5} />
            {new Date(card.createdAt).toLocaleDateString()}
          </div>
        </div>

        <h4 className="text-[17px] font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
          {card.formName}
        </h4>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4 font-medium">
          {card.description || "No description provided for this form template."}
        </p>
      </div>

      {/* Footer with Edit and View buttons */}
      <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
        <Link
          href={`/business/form-response/${card.id}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95 shadow-sm group/view"
        >
          <Eye size={15} className="text-slate-400 group-hover/view:text-slate-600 transition-colors" />
          View
        </Link>
        <Link
          href={`/business/formedit?id=${card.id}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95 shadow-md shadow-blue-200 group/edit"
        >
          <Pencil size={15} className="text-blue-100 group-hover/edit:text-white transition-colors" />
          Edit Form
        </Link>
      </div>
    </div>
  );
}



// ─── Main Component ───────────────────────────────────────────────────────────

export default function FormDashboard() {
  const { data, isLoading, error } = useFetchData<ResponseData>({
    queryKey: ["formsResponse"],
    endpoint: "FormTemplates/GetMyFormTemplate"
  })
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error || !data) {
    return <div>{error?.message || "Error fetching forms"}</div>
  }





  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── Topbar ── */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Forms</h2>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Manage and organize your business forms</p>
        </div>

        <Link href="/business/addform"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-200"
        >
          <Plus size={16} strokeWidth={3} /> Create New
        </Link>
      </div>

      {/* ── Grid Layout ── */}
      <main className="flex-1 p-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.data.map(card => (
              <FormCard
                key={card.id}
                card={card}
              />
            ))}

            {/* Empty state / placeholder for adding more */}
            <Link href="/business/addform"
              className="h-full min-h-[220px] rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <Plus size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <span className="text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">Add New Form</span>
            </Link>
          </div>
        </div>
      </main>



    </div>
  );
}
