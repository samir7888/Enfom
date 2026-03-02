"use client";

import { useState } from "react";
import {
  LayoutGrid, GitBranch, Table2, Calendar,
  Filter, ArrowUpDown, Zap, Maximize2, Plus,
  MoreHorizontal, MessageSquare, Paperclip, Eye, Pencil,
  ChevronDown, Circle, Clock, CheckCircle2, AlertCircle,
  X, Tag, User, Flag, CalendarDays, Share2
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = "Urgent" | "High" | "Medium" | "Low";

interface CardData {
  id: string;
  tag: string;
  tagNum: number;
  priority: Priority;
  title: string;
  subtitle: string;
  views: number;
  shares: number;
  avatars: string[];
  due: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PRIORITY_STYLES: Record<Priority, { bg: string; text: string; dot: string }> = {
  Urgent: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
  High: { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
  Medium: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  Low: { bg: "bg-sky-100", text: "text-sky-700", dot: "bg-sky-500" },
};

const INITIAL_CARDS: CardData[] = [
  {
    id: "c1", tag: "WEB", tagNum: 21, priority: "Urgent",
    title: "Partone Consultancy Website", subtitle: "New Homepage",
    views: 120, shares: 45, avatars: ["AB", "CD", "EF"],
    due: "March 21, 25",
  },
  {
    id: "c2", tag: "WEB", tagNum: 8, priority: "Medium",
    title: "Design Wireframes - Homepage", subtitle: "New Homepage",
    views: 85, shares: 12, avatars: ["GH"],
    due: "Jan 02, 25",
  },
  {
    id: "c3", tag: "WEB", tagNum: 28, priority: "Urgent",
    title: "Modify Content for Homepage", subtitle: "New Homepage",
    views: 240, shares: 89, avatars: ["IJ", "KL"],
    due: "May 23, 25",
  },
  {
    id: "c4", tag: "WEB", tagNum: 12, priority: "Low",
    title: "MTC Design Approval", subtitle: "New Homepage",
    views: 56, shares: 8, avatars: ["MN", "OP", "QR"],
    due: "March 21, 25",
  },
  {
    id: "c5", tag: "WEB", tagNum: 37, priority: "Medium",
    title: "Nasa Components Revision", subtitle: "UI - Design System",
    views: 312, shares: 156, avatars: ["ST"],
    due: "March 29, 25",
  },
  {
    id: "c6", tag: "WEB", tagNum: 89, priority: "Urgent",
    title: "V0.1 Components Design System", subtitle: "New Components and Elements",
    views: 92, shares: 24, avatars: ["UV", "WX", "YZ"],
    due: "March 06, 25",
  },
];

const AVATAR_COLORS = [
  "bg-blue-500", "bg-violet-500", "bg-pink-500", "bg-emerald-500",
  "bg-amber-500", "bg-rose-500", "bg-cyan-500", "bg-indigo-500",
];

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditModal({ card, onClose, onSave }: {
  card: CardData;
  onClose: () => void;
  onSave: (updated: CardData) => void;
}) {
  const [draft, setDraft] = useState<CardData>({ ...card });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{draft.tag}-{draft.tagNum}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors">
            <X size={15} className="text-slate-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Task Title</label>
            <input value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Subtitle / Category</label>
            <input value={draft.subtitle} onChange={e => setDraft(d => ({ ...d, subtitle: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
          </div>

          {/* Priority */}
          <div>
            <label className=" text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Flag size={10} />Priority</label>
            <select value={draft.priority} onChange={e => setDraft(d => ({ ...d, priority: e.target.value as Priority }))}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
              {(["Urgent", "High", "Medium", "Low"] as Priority[]).map(p => <option key={p}>{p}</option>)}
            </select>
          </div>

          {/* Due date */}
          <div>
            <label className=" text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><CalendarDays size={10} />Due Date</label>
            <input value={draft.due} onChange={e => setDraft(d => ({ ...d, due: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
          </div>

          {/* Tag */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tag</label>
              <input value={draft.tag} onChange={e => setDraft(d => ({ ...d, tag: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Tag Number</label>
              <input type="number" value={draft.tagNum} onChange={e => setDraft(d => ({ ...d, tagNum: Number(e.target.value) }))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">
            Cancel
          </button>
          <button onClick={() => onSave(draft)}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── View Modal ───────────────────────────────────────────────────────────────

function ViewModal({ card, onClose, onEdit }: {
  card: CardData;
  onClose: () => void;
  onEdit: () => void;
}) {
  const p = PRIORITY_STYLES[card.priority];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-black bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md tracking-widest uppercase">{card.tag}-{card.tagNum}</span>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${p.bg} ${p.text}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />{card.priority}
              </span>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              <X size={15} className="text-slate-400" />
            </button>
          </div>

          <h2 className="text-lg font-black text-slate-900 leading-tight mb-1">{card.title}</h2>
          <p className="text-sm text-slate-500 mb-5">{card.subtitle}</p>

          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
              <p className="text-sm font-bold text-slate-700">{card.due}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Views</p>
              <p className="text-sm font-bold text-slate-700">{card.views}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Shares</p>
              <p className="text-sm font-bold text-slate-700">{card.shares}</p>
            </div>
          </div>

          {/* Assignees */}
          <div className="mb-5">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Assignees</p>
            <div className="flex items-center gap-1.5">
              {card.avatars.map((av, i) => (
                <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black ${AVATAR_COLORS[i % AVATAR_COLORS.length]} ring-2 ring-white`}>
                  {av}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Close</button>
            <button onClick={onEdit} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
              <Pencil size={13} /> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Form Card ──────────────────────────────────────────────────────────────

function FormCard({
  card,
  onView,
  onEdit,
}: {
  card: CardData;
  onView: (c: CardData) => void;
  onEdit: (c: CardData) => void;
}) {
  const p = PRIORITY_STYLES[card.priority];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group overflow-hidden flex flex-col h-full">
      {/* Card body */}
      <div className="p-4 flex-1">
        {/* Tag + Priority */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase bg-slate-100 px-2 py-0.5 rounded-md">
            {card.tag} - {card.tagNum}
          </span>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.bg} ${p.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />{card.priority}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1">{card.title}</h4>
        <p className="text-[12px] text-slate-400 mb-4">{card.subtitle}</p>

        {/* Form Stats (Views + Shares) */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold bg-slate-100/50 px-2 py-1 rounded-lg">
              <Eye size={12} strokeWidth={2.5} className="text-blue-500" /> {card.views || 0}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-slate-500 font-bold bg-slate-100/50 px-2 py-1 rounded-lg">
              <Share2 size={12} strokeWidth={2.5} className="text-indigo-500" /> {card.shares || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Due date footer */}
      <div className="px-4 py-3 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <CalendarDays size={12} className="text-slate-400" />
          <span className="text-[11px] text-slate-400 font-medium">{card.due}</span>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onView(card)} className="p-1.5 text-slate-400 hover:text-blue-600 cursor-pointer hover:bg-blue-50 border-2 border-neutral-200 rounded-lg transition-all" title="View"> View</button>
          <button onClick={() => onEdit(card)} className="p-1.5 text-slate-400 hover:text-blue-600 cursor-pointer hover:bg-blue-50 border-2 border-neutral-200 rounded-lg transition-all" title="Edit"> Edit</button>
        </div>
      </div>
    </div>
  );
}

// ─── New Card Modal ───────────────────────────────────────────────────────────

function NewCardModal({ onClose, onCreate }: {
  onClose: () => void;
  onCreate: (card: CardData) => void;
}) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [due, setDue] = useState("");

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate({
      id: `c${Date.now()}`,
      tag: "FORM",
      tagNum: Math.floor(Math.random() * 100) + 1,
      priority,
      title: title.trim(),
      subtitle: subtitle.trim() || "Form Description",
      comments: 0,
      attachments: 0,
      avatars: [],
      due: due || "TBD",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Create New Form</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-200 transition-colors">
            <X size={14} className="text-slate-500" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Form Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Customer Satisfaction Survey"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all font-semibold" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Description</label>
            <input value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Brief description of the form"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Priority Level</label>
              <select value={priority} onChange={e => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
                {(["Urgent", "High", "Medium", "Low"] as Priority[]).map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Due Date</label>
              <input value={due} onChange={e => setDue(e.target.value)} placeholder="March 01, 25"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleCreate} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-sm shadow-blue-200">Create</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FormDashboard() {
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [viewing, setViewing] = useState<CardData | null>(null);
  const [editing, setEditing] = useState<CardData | null>(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const handleSaveEdit = (updated: CardData) => {
    setCards(prev => prev.map(c => c.id === updated.id ? updated : c));
    setEditing(null);
  };

  const handleCreate = (card: CardData) => {
    setCards(prev => [...prev, card]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── Topbar ── */}
      <div className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-30">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Forms</h2>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">Manage and organize your business forms</p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-all active:scale-95 shadow-lg shadow-blue-200"
        >
          <Plus size={16} strokeWidth={3} /> Create New
        </button>
      </div>

      {/* ── Grid Layout ── */}
      <main className="flex-1 p-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map(card => (
              <FormCard
                key={card.id}
                card={card}
                onView={setViewing}
                onEdit={setEditing}
              />
            ))}

            {/* Empty state / placeholder for adding more */}
            <button
              onClick={() => setShowNewModal(true)}
              className="h-full min-h-[220px] rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-3 group"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                <Plus size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
              <span className="text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">Add New Form</span>
            </button>
          </div>
        </div>
      </main>

      {/* ── Modals ── */}
      {viewing && (
        <ViewModal
          card={viewing}
          onClose={() => setViewing(null)}
          onEdit={() => { setEditing(viewing); setViewing(null); }}
        />
      )}
      {editing && (
        <EditModal
          card={editing}
          onClose={() => setEditing(null)}
          onSave={handleSaveEdit}
        />
      )}
      {showNewModal && (
        <NewCardModal
          onClose={() => setShowNewModal(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
