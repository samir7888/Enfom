"use client";

import { useState } from "react";
import {
    Plus, Pencil, Trash2, Eye, MessageSquare,
    X, Image as ImageIcon, Link as LinkIcon, FileText,
    Clock, Bell, Search, CornerDownRight, Send, Reply
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// --- Types ---

interface Comment {
    id: string;
    author: string;
    text: string;
    date: string;
    replies: Comment[];
}

interface Notice {
    id: string;
    title: string;
    message: string;
    image?: string;
    source: string;
    views: number;
    comments: Comment[];
    createdAt: string;
}

// --- Mock Data ---

const INITIAL_NOTICES: Notice[] = [
    {
        id: "1",
        title: "Annual General Meeting 2024",
        message: "The annual general meeting for the year 2024 will be held on March 15th at the main auditorium. All members are requested to attend and participate in the voting process for the new board members.",
        image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=1000&auto=format&fit=crop",
        source: "Administration",
        views: 1240,
        comments: [
            {
                id: "c1",
                author: "John Doe",
                text: "Will there be remote access for those who can't attend in person?",
                date: "2 hours ago",
                replies: [
                    {
                        id: "r1",
                        author: "Admin",
                        text: "Yes, a Zoom link will be sent out via email 24 hours before the meeting.",
                        date: "1 hour ago",
                        replies: []
                    }
                ]
            }
        ],
        createdAt: "2024-03-01T10:00:00Z",
    },
    {
        id: "2",
        title: "New Office Policy Update",
        message: "We have updated our remote work policy. Please review the attached document for more details regarding the new hybrid model starting next month.",
        source: "HR Department",
        views: 856,
        comments: [],
        createdAt: "2024-02-28T14:30:00Z",
    },
];

// --- Components ---

export default function NoticePage() {
    const [notices, setNotices] = useState<Notice[]>(INITIAL_NOTICES);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
    const [viewingNotice, setViewingNotice] = useState<Notice | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Create/Edit Notice Form State
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        image: "",
        source: "",
    });

    const handleOpenModal = (notice?: Notice) => {
        if (notice) {
            setEditingNotice(notice);
            setFormData({
                title: notice.title,
                message: notice.message,
                image: notice.image || "",
                source: notice.source,
            });
        } else {
            setEditingNotice(null);
            setFormData({ title: "", message: "", image: "", source: "" });
        }
        setIsModalOpen(true);
    };

    const handleSaveNotice = () => {
        if (editingNotice) {
            setNotices(prev => prev.map(n => n.id === editingNotice.id ? { ...n, ...formData } : n));
        } else {
            const newNotice: Notice = {
                id: Date.now().toString(),
                ...formData,
                views: 0,
                comments: [],
                createdAt: new Date().toISOString(),
            };
            setNotices(prev => [newNotice, ...prev]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteNotice = (id: string) => {
        setNotices(prev => prev.filter(n => n.id !== id));
        if (viewingNotice?.id === id) setViewingNotice(null);
    };

    const handleAddComment = (noticeId: string, text: string, parentId?: string) => {
        setNotices(prev => prev.map(n => {
            if (n.id !== noticeId) return n;

            const newComment: Comment = {
                id: `c-${Date.now()}`,
                author: "Current User",
                text,
                date: "Just now",
                replies: []
            };

            if (!parentId) {
                return { ...n, comments: [...n.comments, newComment] };
            }

            const updateComments = (comments: Comment[]): Comment[] => {
                return comments.map(c => {
                    if (c.id === parentId) {
                        return { ...c, replies: [...c.replies, newComment] };
                    }
                    return { ...c, replies: updateComments(c.replies) };
                });
            };

            return { ...n, comments: updateComments(n.comments) };
        }));
    };

    const handleDeleteComment = (noticeId: string, commentId: string) => {
        setNotices(prev => prev.map(n => {
            if (n.id !== noticeId) return n;

            const removeComment = (comments: Comment[]): Comment[] => {
                return comments
                    .filter(c => c.id !== commentId)
                    .map(c => ({ ...c, replies: removeComment(c.replies) }));
            };

            return { ...n, comments: removeComment(n.comments) };
        }));
    };

    const handleEditComment = (noticeId: string, commentId: string, newText: string) => {
        setNotices(prev => prev.map(n => {
            if (n.id !== noticeId) return n;

            const updateComment = (comments: Comment[]): Comment[] => {
                return comments.map(c => {
                    if (c.id === commentId) return { ...c, text: newText };
                    return { ...c, replies: updateComment(c.replies) };
                });
            };

            return { ...n, comments: updateComment(n.comments) };
        }));
    };

    const filteredNotices = notices.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const currentNotice = viewingNotice ? notices.find(n => n.id === viewingNotice.id) : null;

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-20">
            {/* Header Section */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <Bell size={20} />
                                </div>
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Notice Board</h1>
                            </div>
                            <p className="text-slate-500 font-medium">Keep track of all internal communications and announcements</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                                <Input
                                    placeholder="Search notices..."
                                    className="pl-10 w-full md:w-64 bg-slate-50 border-slate-200 rounded-xl"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={() => handleOpenModal()}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-6 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 flex gap-2"
                            >
                                <Plus size={20} strokeWidth={3} />
                                Create Notice
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-5xl mx-auto px-6 mt-10 space-y-6 pb-20">
                {filteredNotices.map((notice) => (
                    <NoticeCard
                        key={notice.id}
                        notice={notice}
                        onEdit={() => handleOpenModal(notice)}
                        onDelete={() => handleDeleteNotice(notice.id)}
                        onView={() => setViewingNotice(notice)}
                    />
                ))}

                {/* Add New Placeholder */}
                <button
                    onClick={() => handleOpenModal()}
                    className="w-full flex items-center justify-center gap-3 border-2 border-dashed border-slate-200 rounded-2xl p-8 hover:border-blue-400 hover:bg-blue-50/50 transition-all group"
                >
                    <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                        <Plus size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                    <p className="text-slate-500 font-bold group-hover:text-blue-600 transition-colors">Post new announcement</p>
                </button>
            </div>

            {/* Details Sidebar (Sheet) */}
            <DetailsSheet
                notice={currentNotice || null}
                onClose={() => setViewingNotice(null)}
                onAddComment={handleAddComment}
                onDeleteComment={handleDeleteComment}
                onEditComment={handleEditComment}
            />

            {/* Create/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="sm:max-w-2xl rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
                    <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">
                                {editingNotice ? "Edit Notice" : "Create New Announcement"}
                            </DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium">
                                Fill in the details below to post a notice.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FileText size={12} /> Title</label>
                                <Input placeholder="Notice title..." value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="rounded-xl py-6 font-semibold" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><Bell size={12} /> Description</label>
                                <Textarea placeholder="Announcement details..." value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="rounded-xl min-h-[120px] resize-none" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><LinkIcon size={12} /> Source</label>
                                    <Input placeholder="e.g. HR Dept" value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} className="rounded-xl py-6" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon size={12} /> Image URL</label>
                                    <Input placeholder="https://..." value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="rounded-xl py-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="bg-slate-50 p-6 flex items-center gap-3 border-t border-slate-100">
                        <Button variant="outline" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-xl py-6 font-bold">Cancel</Button>
                        <Button onClick={handleSaveNotice} className="flex-1 rounded-xl py-6 font-black bg-blue-600 hover:bg-blue-700 text-white shadow-lg active:scale-95 transition-all">
                            {editingNotice ? "Update" : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// --- Notice Card Component ---

function NoticeCard({ notice, onEdit, onDelete, onView }: {
    notice: Notice,
    onEdit: () => void,
    onDelete: () => void,
    onView: () => void
}) {
    const commentCount = (comments: Comment[]): number => {
        return comments.reduce((acc, c) => acc + 1 + commentCount(c.replies), 0);
    };

    return (
        <Card className="group overflow-hidden border-slate-200 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all duration-300 rounded-3xl bg-white border">
            <div className="flex flex-col md:flex-row h-full">
                {notice.image && (
                    <div className="md:w-[180px] md:h-[180px] h-48 w-full overflow-hidden relative shrink-0 rounded-2xl md:m-4 m-0">
                        <img
                            src={notice.image}
                            alt={notice.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-60" />
                    </div>
                )}

                <div className="flex-1 flex flex-col p-6 md:p-8">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                {notice.source}
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-300 font-medium text-[10px]">
                                <Clock size={12} />
                                {new Date(notice.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                            </div>
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon" onClick={onEdit} className="w-8 h-8 rounded-full hover:bg-blue-50 hover:text-blue-600 text-slate-400"><Pencil size={14} /></Button>
                            <Button variant="ghost" size="icon" onClick={onDelete} className="w-8 h-8 rounded-full hover:bg-red-50 hover:text-red-600 text-slate-400"><Trash2 size={14} /></Button>
                        </div>
                    </div>

                    <div className="mb-4 flex-1">
                        <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-blue-600 transition-colors mb-2">
                            {notice.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                            {notice.message}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 group/stat">
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-blue-500 group-hover/stat:bg-blue-100 transition-colors"><Eye size={14} /></div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">Views</span>
                                    <span className="text-sm font-bold text-slate-700">{notice.views.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 group/stat">
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-500 group-hover/stat:bg-indigo-100 transition-colors"><MessageSquare size={14} /></div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">Comments</span>
                                    <span className="text-sm font-bold text-slate-700">{commentCount(notice.comments)}</span>
                                </div>
                            </div>
                        </div>

                        <Button onClick={onView} variant="link" className="text-blue-600 font-black text-xs uppercase tracking-widest p-0 h-auto hover:no-underline group/btn">
                            Read Details
                            <Plus size={14} className="ml-1 group-hover/btn:rotate-90 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

// --- Details Sidebar Component ---

function DetailsSheet({
    notice,
    onClose,
    onAddComment,
    onDeleteComment,
    onEditComment
}: {
    notice: Notice | null,
    onClose: () => void,
    onAddComment: (noticeId: string, text: string, parentId?: string) => void,
    onDeleteComment: (noticeId: string, commentId: string) => void,
    onEditComment: (noticeId: string, commentId: string, newText: string) => void
}) {
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<string | null>(null);
    const [editingComment, setEditingComment] = useState<{ id: string, text: string } | null>(null);

    if (!notice) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        onAddComment(notice.id, newComment, replyingTo || undefined);
        setNewComment("");
        setReplyingTo(null);
    };

    const handleEditSubmit = (commentId: string) => {
        if (!editingComment?.text.trim()) return;
        onEditComment(notice.id, commentId, editingComment.text);
        setEditingComment(null);
    };

    return (
        <Sheet open={!!notice} onOpenChange={(open) => !open && onClose()}>
            <SheetContent className="sm:max-w-xl p-0 border-none shadow-2xl flex flex-col h-full bg-slate-50">
                <SheetHeader className="bg-white px-8 py-6 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {notice.source}
                        </span>
                        <span className="text-slate-300 font-medium text-[10px]">
                            {new Date(notice.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <SheetTitle className="text-2xl font-black text-slate-900 leading-tight">
                        {notice.title}
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10">
                    {/* Details */}
                    <section>
                        {notice.image && (
                            <div className="rounded-3xl overflow-hidden mb-6 aspect-video">
                                <img src={notice.image} alt={notice.title} className="w-full h-full object-cover" />
                            </div>
                        )}
                        <p className="text-slate-600 leading-relaxed text-base">
                            {notice.message}
                        </p>
                    </section>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-8 py-6 border-y border-slate-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600"><Eye size={20} /></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Views</p>
                                <p className="text-base font-bold text-slate-900">{notice.views.toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600"><MessageSquare size={20} /></div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Discussion</p>
                                <p className="text-base font-bold text-slate-900">{notice.comments.length} Threads</p>
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest">Comments</h4>
                            <p className="text-xs font-bold text-slate-400">{notice.comments.length} comments</p>
                        </div>

                        <div className="space-y-8 pb-32">
                            {notice.comments.map((comment) => (
                                <CommentItem
                                    key={comment.id}
                                    comment={comment}
                                    noticeId={notice.id}
                                    onReply={setReplyingTo}
                                    onDelete={onDeleteComment}
                                    onEditEnter={(id, text) => setEditingComment({ id, text })}
                                    editingId={editingComment?.id ?? null}
                                    editingText={editingComment?.text ?? ""}
                                    onEditingTextChange={(text) => setEditingComment(prev => prev ? { ...prev, text } : null)}
                                    onEditSubmit={handleEditSubmit}
                                    onEditCancel={() => setEditingComment(null)}
                                />
                            ))}
                            {notice.comments.length === 0 && (
                                <div className="text-center py-10 opacity-40">
                                    <MessageSquare size={40} className="mx-auto mb-3" />
                                    <p className="text-sm font-bold">No comments yet. Be the first!</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Floating Input Section */}
                <div className="bg-white border-t border-slate-100 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    {replyingTo && (
                        <div className="flex items-center justify-between mb-3 px-3 py-2 bg-blue-50 rounded-xl text-[11px] font-bold text-blue-700">
                            <div className="flex items-center gap-2">
                                <Reply size={12} />
                                Replying to thread
                            </div>
                            <button onClick={() => setReplyingTo(null)}><X size={14} /></button>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <Input
                                placeholder={replyingTo ? "Write a reply..." : "Add a comment..."}
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                className="rounded-2xl bg-slate-50 border-none px-5 py-6 focus:ring-blue-500"
                            />
                        </div>
                        <Button type="submit" className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shrink-0 shadow-lg shadow-blue-200 active:scale-95 transition-all">
                            <Send size={18} />
                        </Button>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
}

// --- Recursive Comment Item Component ---

function CommentItem({
    comment,
    noticeId,
    onReply,
    onDelete,
    onEditEnter,
    editingId,
    editingText,
    onEditingTextChange,
    onEditSubmit,
    onEditCancel
}: {
    comment: Comment,
    noticeId: string,
    onReply: (id: string) => void,
    onDelete: (noticeId: string, commentId: string) => void,
    onEditEnter: (id: string, text: string) => void,
    editingId: string | null,
    editingText: string,
    onEditingTextChange: (text: string) => void,
    onEditSubmit: (id: string) => void,
    onEditCancel: () => void
}) {
    const isEditing = editingId === comment.id;

    return (
        <div className="group/comment space-y-4">
            <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-200 shrink-0 flex items-center justify-center font-black text-slate-500 text-xs">
                    {comment.author.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <h5 className="text-sm font-black text-slate-900">{comment.author}</h5>
                        <span className="text-[10px] font-bold text-slate-400">{comment.date}</span>
                    </div>

                    {isEditing ? (
                        <div className="space-y-2 mt-2">
                            <Textarea
                                value={editingText}
                                onChange={e => onEditingTextChange(e.target.value)}
                                className="min-h-[80px] rounded-xl text-sm"
                            />
                            <div className="flex gap-2">
                                <Button size="sm" onClick={() => onEditSubmit(comment.id)} className="bg-blue-600 h-8 px-4 text-[11px] font-bold rounded-lg leading-none">Save</Button>
                                <Button size="sm" variant="ghost" onClick={onEditCancel} className="h-8 px-4 text-[11px] font-bold rounded-lg text-slate-500 leading-none">Cancel</Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-slate-600 text-sm leading-relaxed mb-3">{comment.text}</p>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => onReply(comment.id)}
                                    className="flex items-center gap-1.5 text-[11px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-700 transition-colors"
                                >
                                    <Reply size={12} strokeWidth={3} /> Reply
                                </button>
                                <div className="flex items-center gap-1 opacity-0 group-hover/comment:opacity-100 transition-opacity">
                                    <Button variant={"outline"} onClick={() => onDelete(noticeId, comment.id)} className="p-1 px-2 text-[10px] font-bold text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">Delete</Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {comment.replies.length > 0 && (
                <div className="ml-10 space-y-6 pt-2 border-l-2 border-slate-100 pl-6">
                    {comment.replies.map(reply => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            noticeId={noticeId}
                            onReply={onReply}
                            onDelete={onDelete}
                            onEditEnter={onEditEnter}
                            editingId={editingId}
                            editingText={editingText}
                            onEditingTextChange={onEditingTextChange}
                            onEditSubmit={onEditSubmit}
                            onEditCancel={onEditCancel}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
