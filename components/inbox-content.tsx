'use client';

import { useState, useRef, useEffect } from 'react';
import { Bookmark, Reply, Send, Mail, ChevronDown, Check } from 'lucide-react';
import { cn } from "@/lib/utils";

/* ─────────────────────────── Types ─────────────────────────── */
type Tab = 'General' | 'Following' | 'Archive';

interface Notification {
    id: string;
    author: string;
    initials: string;
    avatarGradient: string;
    task: string;
    time: string;
    team: string;
    message: string;
    unread: boolean;
    online: boolean;
}

/* ─────────────────────── Mock Data ──────────────────────────── */
const NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        author: 'Joy Pacheco',
        initials: 'JP',
        avatarGradient: 'from-violet-500 to-indigo-600',
        task: 'Improve cards readability',
        time: '2h ago',
        team: 'Engineering',
        message:
            "I've started working on a first draft, feel free to take a look and tell me what you think.",
        unread: true,
        online: true,
    },
    {
        id: '2',
        author: 'Marcus Reid',
        initials: 'MR',
        avatarGradient: 'from-emerald-400 to-teal-600',
        task: 'Dashboard redesign sprint',
        time: '5h ago',
        team: 'Design',
        message:
            'Just pushed the updated Figma link. Can you review the nav changes before EOD?',
        unread: true,
        online: false,
    },
];

/* ─────────────────────── Sub-Components ────────────────────── */

/** Avatar with optional online indicator */
function Avatar({
    initials,
    gradient,
    online,
}: {
    initials: string;
    gradient: string;
    online: boolean;
}) {
    return (
        <div className="relative shrink-0">
            <div
                className={cn(
                    "w-10 h-10 rounded-full bg-linear-to-br flex items-center justify-center text-white text-sm font-bold tracking-wide select-none",
                    gradient
                )}
                aria-hidden="true"
            >
                {initials}
            </div>
            {online && (
                <span
                    className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"
                    aria-label="Online"
                />
            )}
        </div>
    );
}

/** Expandable reply box */
function ReplyBox({
    onClose,
    authorName,
}: {
    onClose: () => void;
    authorName: string;
}) {
    const [text, setText] = useState('');
    const [sent, setSent] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textareaRef.current?.focus();
    }, []);

    const handleSend = () => {
        if (!text.trim()) return;
        setSent(true);
        setTimeout(() => {
            setSent(false);
            setText('');
            onClose();
        }, 1200);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSend();
        if (e.key === 'Escape') onClose();
    };

    return (
        <div className="mt-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="relative">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={3}
                    placeholder={`Reply to ${authorName}… (⌘↵ to send)`}
                    className="
            w-full resize-none rounded-xl border border-slate-200 bg-slate-50/60
            px-4 py-3 text-sm text-slate-700 placeholder-slate-400
            transition-all duration-200 outline-none
            focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/20
          "
                    aria-label="Write a reply"
                    disabled={sent}
                />
                {/* char counter */}
                <span className="absolute bottom-2 right-3 text-[10px] text-slate-400 pointer-events-none">
                    {text.length}/500
                </span>
            </div>

            <div className="flex items-center justify-between mt-2">
                <span className="text-[11px] text-slate-400 hidden sm:block">⌘↵ send · Esc cancel</span>
                <div className="flex items-center gap-2 ml-auto">
                    <button
                        onClick={onClose}
                        className="px-3 py-1.5 text-xs font-medium text-slate-500 rounded-lg hover:bg-slate-100 transition-colors duration-150"
                        aria-label="Cancel reply"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={!text.trim() || sent}
                        className="
              flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold
              bg-indigo-600 text-white shadow-sm
              hover:bg-indigo-700 active:scale-95
              disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100
              transition-all duration-150
            "
                        aria-label="Send reply"
                    >
                        {sent ? (
                            <>
                                <span>Sent</span>
                                <Check className="w-3 h-3" strokeWidth={3} />
                            </>
                        ) : (
                            <>
                                <Send className="w-3 h-3" />
                                <span>Send</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

/** Single notification card */
function NotificationCard({ notification }: { notification: Notification }) {
    const [bookmarked, setBookmarked] = useState(false);
    const [replying, setReplying] = useState(false);
    const [read, setRead] = useState(!notification.unread);

    const handleReplyOpen = () => {
        setReplying(true);
        setRead(true);
    };

    return (
        <article
            className={cn(
                "group relative flex items-start gap-3 px-5 py-6 border-b border-slate-100 last:border-b-0 transition-colors duration-150",
                !read ? 'bg-indigo-50/40 hover:bg-indigo-50/70' : 'hover:bg-slate-50/80'
            )}
            aria-label={`Notification from ${notification.author}`}
        >
            {/* Unread indicator */}
            <div className="flex-shrink-0 mt-[18px]">
                {!read ? (
                    <span
                        className="block w-2.5 h-2.5 rounded-full bg-indigo-500 ring-2 ring-indigo-200"
                        aria-label="Unread notification"
                    />
                ) : (
                    <span className="block w-2.5 h-2.5 rounded-full bg-transparent" aria-hidden="true" />
                )}
            </div>

            {/* Avatar */}
            <Avatar
                initials={notification.initials}
                gradient={notification.avatarGradient}
                online={notification.online}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
                {/* Row 1: text + bookmark */}
                <div className="flex items-start justify-between gap-2">
                    <p className="text-[13.5px] leading-snug text-slate-700">
                        <span className="font-semibold text-slate-900">{notification.author}</span>
                        {' '}mentioned you on{' '}
                        <span className="font-semibold text-indigo-600">{notification.task}</span>
                    </p>

                    {/* Bookmark */}
                    <button
                        onClick={() => setBookmarked((b) => !b)}
                        className={cn(
                            "flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150",
                            bookmarked
                                ? 'text-indigo-600 bg-indigo-100 hover:bg-indigo-200'
                                : 'text-slate-400 hover:text-indigo-500 hover:bg-indigo-50'
                        )}
                        aria-label={bookmarked ? 'Remove bookmark' : 'Save notification'}
                        aria-pressed={bookmarked}
                    >
                        <Bookmark className={cn("w-4 h-4", bookmarked && "fill-current")} />
                    </button>
                </div>

                {/* Row 2: meta */}
                <div className="flex items-center gap-1.5 mt-1 mb-3">
                    <time className="text-[11.5px] text-slate-400 font-medium">{notification.time}</time>
                    <span className="text-slate-300" aria-hidden="true">—</span>
                    <span className="text-[11.5px] text-slate-400 font-medium">{notification.team}</span>
                </div>

                {/* Message bubble */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3.5 text-[13px] text-slate-600 leading-relaxed shadow-sm">
                    {notification.message}
                </div>

                {/* Reply section */}
                {replying ? (
                    <ReplyBox onClose={() => setReplying(false)} authorName={notification.author} />
                ) : (
                    <div className="mt-4">
                        <button
                            onClick={handleReplyOpen}
                            className="
                inline-flex items-center gap-2
                px-4 py-2 rounded-xl
                text-[12.5px] font-bold text-indigo-600
                bg-indigo-50 border border-indigo-100
                hover:bg-indigo-100 hover:border-indigo-200
                active:scale-95
                transition-all duration-150
              "
                            aria-label={`Reply to ${notification.author}`}
                        >
                            <Reply className="w-3.5 h-3.5" />
                            Reply
                        </button>
                    </div>
                )}
            </div>
        </article>
    );
}

export function InboxContent() {
    const [activeTab, setActiveTab] = useState<Tab>('General');
    const tabs: Tab[] = ['General', 'Following', 'Archive'];
    const tabCount: Partial<Record<Tab, number>> = { General: 2 };

    const filteredNotifications =
        activeTab === 'General' ? NOTIFICATIONS : [];

    return (
        <div className="flex flex-col h-full bg-white dark:bg-zinc-950 overflow-hidden">
            {/* Header */}
            <div className="px-6 pt-6 pb-2 border-b border-slate-100 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-zinc-100 tracking-tight">
                        Inbox
                    </h1>
                    <button
                        className="
              flex items-center gap-1.5 text-slate-500
              px-3 py-1.5 rounded-xl
              hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-slate-700
              transition-colors duration-150
            "
                        aria-label="Filter inbox view"
                    >
                        <Mail className="w-4 h-4" />
                        <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Tabs */}
                <nav
                    className="flex gap-1"
                    role="tablist"
                    aria-label="Inbox tabs"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            role="tab"
                            aria-selected={activeTab === tab}
                            aria-controls={`panel-${tab}`}
                            id={`tab-${tab}`}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                "relative flex items-center gap-2 px-1 py-3 mr-4 text-sm font-bold transition-all duration-200 outline-none rounded-sm",
                                "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:rounded-full after:transition-all after:duration-300",
                                activeTab === tab
                                    ? 'text-indigo-600 after:bg-indigo-600 after:scale-x-100'
                                    : 'text-slate-400 hover:text-slate-600 after:bg-indigo-600 after:scale-x-0 hover:after:scale-x-50'
                            )}
                        >
                            {tab}
                            {tabCount[tab] && (
                                <span
                                    className={cn(
                                        "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-black transition-colors duration-200",
                                        activeTab === tab ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-zinc-900 text-slate-500'
                                    )}
                                    aria-label={`${tabCount[tab]} notifications`}
                                >
                                    {tabCount[tab]}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </div>

            {/* List Container */}
            <div
                className="flex-1 overflow-y-auto"
                id={`panel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
            >
                {filteredNotifications.length > 0 ? (
                    <div className="divide-y divide-slate-50 dark:divide-zinc-900">
                        {filteredNotifications.map((n) => (
                            <NotificationCard key={n.id} notification={n} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-[60%] px-8 text-center animate-in fade-in duration-500">
                        <div className="w-14 h-14 rounded-3xl bg-slate-50 dark:bg-zinc-900 flex items-center justify-center mb-4 text-slate-300 dark:text-zinc-700">
                            <Mail className="w-6 h-6" />
                        </div>
                        <p className="text-base font-bold text-slate-900 dark:text-zinc-100 mb-1.5">All caught up!</p>
                        <p className="text-sm text-slate-400 leading-relaxed">No new notifications in your {activeTab} folder.</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            {filteredNotifications.length > 0 && (
                <div className="px-6 py-4 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-950/50 flex items-center justify-between">
                    <span className="text-[11.5px] text-slate-400 font-bold uppercase tracking-wider">
                        {filteredNotifications.filter((n) => n.unread).length > 0
                            ? `${filteredNotifications.filter((n) => n.unread).length} unread`
                            : 'All notifications read'}
                    </span>
                    <button className="text-[11.5px] font-black text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-wider">
                        Mark all read
                    </button>
                </div>
            )}
        </div>
    );
}
