"use client";

import { useState } from "react";
import {
  LayoutGrid, GitBranch, Table2, Calendar,
  Filter, ArrowUpDown, Zap, Maximize2, Plus,
  MoreHorizontal, MessageSquare, Paperclip, Eye, Pencil,
  ChevronDown, Circle, Clock, CheckCircle2, AlertCircle,
  X, Tag, User, Flag, CalendarDays,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Priority = "Urgent" | "High" | "Medium" | "Low";
type Status   = "Not Started" | "Pending" | "Completed" | "Under Review";

interface CardData {
  id: string;
  tag: string;
  tagNum: number;
  priority: Priority;
  title: string;
  subtitle: string;
  comments: number;
  attachments: number;
  avatars: string[];
  due: string;
  status: Status;
}

interface Column {
  id: Status;
  label: string;
  color: string;
  dotColor: string;
  textColor: string;
  borderColor: string;
  bgColor: string;
  icon: React.ReactNode;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PRIORITY_STYLES: Record<Priority, { bg: string; text: string; dot: string }> = {
  Urgent: { bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500"    },
  High:   { bg: "bg-orange-100", text: "text-orange-700", dot: "bg-orange-500" },
  Medium: { bg: "bg-amber-100",  text: "text-amber-700",  dot: "bg-amber-500"  },
  Low:    { bg: "bg-sky-100",    text: "text-sky-700",    dot: "bg-sky-500"    },
};

const COLUMNS: Column[] = [
  {
    id: "Not Started",
    label: "Not Started",
    color: "border-t-slate-400",
    dotColor: "bg-slate-400",
    textColor: "text-slate-600",
    borderColor: "border-slate-200",
    bgColor: "bg-slate-50",
    icon: <Circle size={13} className="text-slate-400" />,
  },
  {
    id: "Pending",
    label: "Pending",
    color: "border-t-amber-400",
    dotColor: "bg-amber-400",
    textColor: "text-amber-600",
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50/60",
    icon: <Clock size={13} className="text-amber-500" />,
  },
  {
    id: "Completed",
    label: "Completed",
    color: "border-t-emerald-500",
    dotColor: "bg-emerald-500",
    textColor: "text-emerald-600",
    borderColor: "border-emerald-200",
    bgColor: "bg-emerald-50/60",
    icon: <CheckCircle2 size={13} className="text-emerald-500" />,
  },
  {
    id: "Under Review",
    label: "Under Review",
    color: "border-t-purple-500",
    dotColor: "bg-purple-500",
    textColor: "text-purple-600",
    borderColor: "border-purple-200",
    bgColor: "bg-purple-50/60",
    icon: <AlertCircle size={13} className="text-purple-500" />,
  },
];

const INITIAL_CARDS: CardData[] = [
  // Not Started
  {
    id: "c1", tag: "WEB", tagNum: 21, priority: "Urgent",
    title: "Partone Consultancy Website", subtitle: "New Homepage",
    comments: 0, attachments: 0, avatars: ["AB","CD","EF"],
    due: "March 21, 25", status: "Not Started",
  },
  {
    id: "c2", tag: "WEB", tagNum: 8, priority: "Medium",
    title: "Design Wireframes - Homepage", subtitle: "New Homepage",
    comments: 0, attachments: 0, avatars: ["GH"],
    due: "Jan 02, 25", status: "Not Started",
  },
  // Pending
  {
    id: "c3", tag: "WEB", tagNum: 28, priority: "Urgent",
    title: "Modify Content for Homepage", subtitle: "New Homepage",
    comments: 10, attachments: 5, avatars: ["IJ","KL"],
    due: "May 23, 25", status: "Pending",
  },
  // Completed
  {
    id: "c4", tag: "WEB", tagNum: 12, priority: "Low",
    title: "MTC Design Approval", subtitle: "New Homepage",
    comments: 0, attachments: 10, avatars: ["MN","OP","QR"],
    due: "March 21, 25", status: "Completed",
  },
  {
    id: "c5", tag: "WEB", tagNum: 37, priority: "Medium",
    title: "Nasa Components Revision", subtitle: "UI - Design System",
    comments: 28, attachments: 0, avatars: ["ST"],
    due: "March 29, 25", status: "Completed",
  },
  // Under Review
  {
    id: "c6", tag: "WEB", tagNum: 89, priority: "Urgent",
    title: "V0.1 Components Design System", subtitle: "New Components and Elements",
    comments: 0, attachments: 0, avatars: ["UV","WX","YZ"],
    due: "March 06, 25", status: "Under Review",
  },
];

const AVATAR_COLORS = [
  "bg-blue-500","bg-violet-500","bg-pink-500","bg-emerald-500",
  "bg-amber-500","bg-rose-500","bg-cyan-500","bg-indigo-500",
];

type ViewMode = "Kanban" | "Timeline" | "Spreadsheet" | "Calendar";

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
            <span className="text-slate-300">·</span>
            <span className="text-xs font-semibold text-slate-500">{draft.status}</span>
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

          {/* Priority + Status row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Flag size={10} />Priority</label>
              <select value={draft.priority} onChange={e => setDraft(d => ({ ...d, priority: e.target.value as Priority }))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
                {(["Urgent","High","Medium","Low"] as Priority[]).map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><Tag size={10} />Status</label>
              <select value={draft.status} onChange={e => setDraft(d => ({ ...d, status: e.target.value as Status }))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
                {(["Not Started","Pending","Completed","Under Review"] as Status[]).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Due date */}
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1"><CalendarDays size={10} />Due Date</label>
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
  const col = COLUMNS.find(c => c.id === card.status)!;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className={`h-1.5 w-full ${col.dotColor.replace("bg-", "bg-")}`} />
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
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
              <div className="flex items-center gap-1.5">
                {col.icon}
                <span className={`text-sm font-bold ${col.textColor}`}>{card.status}</span>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
              <p className="text-sm font-bold text-slate-700">{card.due}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Comments</p>
              <p className="text-sm font-bold text-slate-700">{card.comments}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Attachments</p>
              <p className="text-sm font-bold text-slate-700">{card.attachments}</p>
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
              <Pencil size={13} /> Edit Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Kanban Card ──────────────────────────────────────────────────────────────

function KanbanCard({
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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group overflow-hidden">
      {/* Card body */}
      <div className="p-3.5 pb-2.5">
        {/* Tag + Priority */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase bg-slate-100 px-2 py-0.5 rounded-md">
            {card.tag} - {card.tagNum}
          </span>
          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${p.bg} ${p.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />{card.priority}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-sm font-bold text-slate-900 leading-snug mb-0.5">{card.title}</h4>
        <p className="text-[11px] text-slate-400 mb-3">{card.subtitle}</p>

        {/* Comments + Attachments + Avatars */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {card.comments > 0 && (
              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                <MessageSquare size={11} /> {card.comments}
              </span>
            )}
            {card.attachments > 0 && (
              <span className="flex items-center gap-1 text-[11px] text-slate-500">
                <Paperclip size={11} /> {card.attachments}
              </span>
            )}
          </div>
          <div className="flex items-center">
            {card.avatars.slice(0, 3).map((av, i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-black ${AVATAR_COLORS[i % AVATAR_COLORS.length]} ring-2 ring-white -ml-1.5 first:ml-0`}
              >
                {av}
              </div>
            ))}
          </div>
        </div>

        {/* Due date */}
        <div className="flex items-center gap-1 mt-2.5">
          <CalendarDays size={10} className="text-slate-400" />
          <span className="text-[10px] text-slate-400">Due to: {card.due}</span>
        </div>
      </div>

      {/* ── View / Edit buttons at bottom ── */}
      <div className="border-t border-slate-100 grid grid-cols-2 divide-x divide-slate-100">
        <button
          onClick={() => onView(card)}
          className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors"
        >
          <Eye size={11} /> View
        </button>
        <button
          onClick={() => onEdit(card)}
          className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-bold text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          <Pencil size={11} /> Edit
        </button>
      </div>
    </div>
  );
}

// ─── Column ───────────────────────────────────────────────────────────────────

function KanbanColumn({
  col,
  cards,
  onAddCard,
  onView,
  onEdit,
}: {
  col: Column;
  cards: CardData[];
  onAddCard: (status: Status) => void;
  onView: (c: CardData) => void;
  onEdit: (c: CardData) => void;
}) {
  return (
    <div className="flex flex-col w-72 shrink-0">
      {/* Column header */}
      <div className={`flex items-center justify-between px-3 py-2.5 mb-3 rounded-xl border ${col.borderColor} ${col.bgColor}`}>
        <div className="flex items-center gap-2">
          {col.icon}
          <span className={`text-xs font-black ${col.textColor}`}>{col.label}</span>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${col.bgColor} ${col.textColor} border ${col.borderColor}`}>
            {cards.length}
          </span>
        </div>
        <button className="p-1 rounded-lg hover:bg-white/60 transition-colors">
          <MoreHorizontal size={13} className="text-slate-400" />
        </button>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2.5 flex-1">
        {cards.map(card => (
          <KanbanCard key={card.id} card={card} onView={onView} onEdit={onEdit} />
        ))}
      </div>

      {/* Add card button */}
      <button
        onClick={() => onAddCard(col.id)}
        className="mt-3 flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-300 transition-all"
      >
        <Plus size={13} /> New Page
      </button>
    </div>
  );
}

// ─── Placeholder views ────────────────────────────────────────────────────────

function PlaceholderView({ label }: { label: string }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
          {label === "Timeline" && <GitBranch size={24} className="text-slate-400" />}
          {label === "Spreadsheet" && <Table2 size={24} className="text-slate-400" />}
          {label === "Calendar" && <Calendar size={24} className="text-slate-400" />}
        </div>
        <p className="text-sm font-bold text-slate-500">{label} View</p>
        <p className="text-xs text-slate-400 mt-1">Coming soon</p>
      </div>
    </div>
  );
}

// ─── New Card Modal ───────────────────────────────────────────────────────────

function NewCardModal({ status, onClose, onCreate }: {
  status: Status;
  onClose: () => void;
  onCreate: (card: CardData) => void;
}) {
  const [title, setTitle]       = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [due, setDue]           = useState("");

  const handleCreate = () => {
    if (!title.trim()) return;
    onCreate({
      id: `c${Date.now()}`,
      tag: "WEB",
      tagNum: Math.floor(Math.random() * 100) + 1,
      priority,
      title: title.trim(),
      subtitle: subtitle.trim() || "New Task",
      comments: 0,
      attachments: 0,
      avatars: [],
      due: due || "TBD",
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900">New Task — <span className="text-blue-600">{status}</span></h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X size={14} className="text-slate-500" />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Task Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter task title"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Subtitle</label>
            <input value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="Category or description"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Priority</label>
              <select value={priority} onChange={e => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
                {(["Urgent","High","Medium","Low"] as Priority[]).map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Due Date</label>
              <input value={due} onChange={e => setDue(e.target.value)} placeholder="e.g. March 01, 25"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors">Cancel</button>
          <button onClick={handleCreate} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-sm">Create Task</button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function KanbanBoard() {
  const [viewMode, setViewMode]   = useState<ViewMode>("Kanban");
  const [cards, setCards]         = useState<CardData[]>(INITIAL_CARDS);
  const [viewing, setViewing]     = useState<CardData | null>(null);
  const [editing, setEditing]     = useState<CardData | null>(null);
  const [newCardStatus, setNewCardStatus] = useState<Status | null>(null);

  const cardsByStatus = (status: Status) => cards.filter(c => c.status === status);

  const handleSaveEdit = (updated: CardData) => {
    setCards(prev => prev.map(c => c.id === updated.id ? updated : c));
    setEditing(null);
  };

  const handleCreate = (card: CardData) => {
    setCards(prev => [...prev, card]);
  };

  const viewTabs: { id: ViewMode; icon: React.ReactNode; label: string }[] = [
    { id: "Kanban",      icon: <LayoutGrid size={13} />,  label: "Kanban"      },
    { id: "Timeline",    icon: <GitBranch size={13} />,   label: "Timeline"    },
    { id: "Spreadsheet", icon: <Table2 size={13} />,      label: "Spreadsheet" },
    { id: "Calendar",    icon: <Calendar size={13} />,    label: "Calendar"    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      {/* ── Topbar ── */}
      <div className="bg-white border-b border-slate-200 px-5 py-3 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-sm">
        {/* View tabs */}
        <div className="flex items-center gap-0.5">
          {viewTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                viewMode === tab.id
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors">
            <Filter size={13} /> Filter
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors">
            <ArrowUpDown size={13} />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors">
            <Zap size={13} />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors">
            <Maximize2 size={13} />
          </button>
          <div className="w-px h-5 bg-slate-200 mx-1" />
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-sm shadow-blue-200">
            <Plus size={13} /> New
          </button>
        </div>
      </div>

      {/* ── Main ── */}
      {viewMode === "Kanban" ? (
        <div className="flex-1 overflow-x-auto p-5">
          <div className="flex gap-4 min-w-max">
            {COLUMNS.map(col => (
              <KanbanColumn
                key={col.id}
                col={col}
                cards={cardsByStatus(col.id)}
                onAddCard={s => setNewCardStatus(s)}
                onView={c => setViewing(c)}
                onEdit={c => setEditing(c)}
              />
            ))}
          </div>
        </div>
      ) : (
        <PlaceholderView label={viewMode} />
      )}

      {/* ── Modals ── */}
      {viewing && !editing && (
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
      {newCardStatus && (
        <NewCardModal
          status={newCardStatus}
          onClose={() => setNewCardStatus(null)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}