'use client';

import { useState, useRef, useEffect } from 'react';

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

/* ─────────────────────────── Icons ─────────────────────────── */
const BookmarkIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ReplyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="9 17 4 12 9 7" />
    <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
  </svg>
);

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const InboxMailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="19"
    height="19"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

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
    <div className="relative flex-shrink-0">
      <div
        className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-bold tracking-wide select-none`}
        aria-hidden="true"
      >
        {initials}
      </div>
      {online && (
        <span
          className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse-dot"
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
    <div className="mt-3 animate-scale-in">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={3}
          placeholder={`Reply to ${authorName}… (⌘↵ to send)`}
          className="
            w-full resize-none rounded-xl border border-brand-200 bg-brand-50/60
            px-4 py-3 text-sm text-slate-700 placeholder-slate-400
            transition-all duration-200 outline-none
            focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-400/20
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
              bg-brand-600 text-white shadow-btn
              hover:bg-brand-700 active:scale-95
              disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100
              transition-all duration-150
            "
            aria-label="Send reply"
          >
            {sent ? (
              <>
                <span>Sent</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </>
            ) : (
              <>
                <SendIcon />
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
      className={`
        group relative flex items-start gap-3 px-5 py-4
        border-b border-slate-100 last:border-b-0
        transition-colors duration-150
        ${!read ? 'bg-brand-50/40 hover:bg-brand-50/70' : 'hover:bg-slate-50/80'}
      `}
      aria-label={`Notification from ${notification.author}`}
    >
      {/* Unread indicator */}
      <div className="flex-shrink-0 mt-[18px]">
        {!read ? (
          <span
            className="block w-2 h-2 rounded-full bg-brand-500 ring-2 ring-brand-200"
            aria-label="Unread notification"
          />
        ) : (
          <span className="block w-2 h-2 rounded-full bg-transparent" aria-hidden="true" />
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
            <span className="font-semibold text-brand-600">{notification.task}</span>
          </p>

          {/* Bookmark */}
          <button
            onClick={() => setBookmarked((b) => !b)}
            className={`
              flex-shrink-0 flex items-center justify-center
              w-7 h-7 rounded-lg
              transition-all duration-150
              ${
                bookmarked
                  ? 'text-brand-600 bg-brand-100 hover:bg-brand-200'
                  : 'text-slate-400 hover:text-brand-500 hover:bg-brand-50'
              }
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400
            `}
            aria-label={bookmarked ? 'Remove bookmark' : 'Save notification'}
            aria-pressed={bookmarked}
          >
            <BookmarkIcon filled={bookmarked} />
          </button>
        </div>

        {/* Row 2: meta */}
        <div className="flex items-center gap-1.5 mt-0.5 mb-2.5">
          <time className="text-[11.5px] text-slate-400 font-medium">{notification.time}</time>
          <span className="text-slate-300" aria-hidden="true">—</span>
          <span className="text-[11.5px] text-slate-400 font-medium">{notification.team}</span>
        </div>

        {/* Message bubble */}
        <div className="bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-3 text-[13px] text-slate-600 leading-relaxed">
          {notification.message}
        </div>

        {/* Reply section */}
        {replying ? (
          <ReplyBox onClose={() => setReplying(false)} authorName={notification.author} />
        ) : (
          <div className="mt-3">
            <button
              onClick={handleReplyOpen}
              className="
                inline-flex items-center gap-1.5
                px-3.5 py-1.5 rounded-lg
                text-[12.5px] font-semibold text-brand-600
                bg-brand-50 border border-brand-200
                hover:bg-brand-100 hover:border-brand-300
                active:scale-95
                transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400
              "
              aria-label={`Reply to ${notification.author}`}
            >
              <ReplyIcon />
              Reply
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

/* ─────────────────────── Main Component ────────────────────── */
export default function InboxCard() {
  const [activeTab, setActiveTab] = useState<Tab>('General');
  const tabs: Tab[] = ['General', 'Following', 'Archive'];
  const tabCount: Partial<Record<Tab, number>> = { General: 2 };

  const filteredNotifications =
    activeTab === 'General' ? NOTIFICATIONS : [];

  return (
    <div
      className="
        w-full max-w-[440px] mx-auto
        bg-white rounded-2xl overflow-hidden
        shadow-card hover:shadow-card-hover
        transition-shadow duration-300
        border border-slate-100/80
        animate-fade-up
      "
      role="region"
      aria-label="Inbox"
    >
      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[22px] font-bold text-slate-900 tracking-tight leading-none">
            Inbox
          </h1>
          <button
            className="
              flex items-center gap-1.5 text-slate-500
              px-2.5 py-1.5 rounded-lg
              hover:bg-slate-100 hover:text-slate-700
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400
            "
            aria-label="Filter inbox view"
          >
            <InboxMailIcon />
            <ChevronDownIcon />
          </button>
        </div>

        {/* Tabs */}
        <nav
          className="flex gap-1 border-b border-slate-100"
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
              className={`
                relative flex items-center gap-1.5
                px-1 py-3 mr-3
                text-[13.5px] font-semibold
                transition-colors duration-150
                outline-none
                focus-visible:ring-2 focus-visible:ring-brand-400 rounded-sm
                after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px]
                after:rounded-full after:transition-all after:duration-200
                ${
                  activeTab === tab
                    ? 'text-brand-600 after:bg-brand-600 after:scale-x-100'
                    : 'text-slate-500 hover:text-slate-700 after:bg-brand-600 after:scale-x-0 hover:after:scale-x-50'
                }
              `}
            >
              {tab}
              {tabCount[tab] && (
                <span
                  className={`
                    inline-flex items-center justify-center
                    min-w-[20px] h-5 px-1.5 rounded-full text-[10.5px] font-bold
                    transition-colors duration-150
                    ${activeTab === tab ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-600'}
                  `}
                  aria-label={`${tabCount[tab]} notifications`}
                >
                  {tabCount[tab]}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* ── Notification List ── */}
      <div
        id={`panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((n) => (
            <NotificationCard key={n.id} notification={n} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-14 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3 text-slate-400">
              <InboxMailIcon />
            </div>
            <p className="text-sm font-semibold text-slate-700 mb-1">All caught up!</p>
            <p className="text-xs text-slate-400">No notifications in {activeTab}.</p>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      {filteredNotifications.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between">
          <span className="text-[11.5px] text-slate-400 font-medium">
            {filteredNotifications.filter((n) => n.unread).length > 0
              ? `${filteredNotifications.filter((n) => n.unread).length} unread`
              : 'All read'}
          </span>
          <button className="text-[11.5px] font-semibold text-brand-600 hover:text-brand-700 transition-colors duration-150">
            Mark all as read
          </button>
        </div>
      )}
    </div>
  );
}