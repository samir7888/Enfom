"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import {
  User, Globe, Bell, CreditCard, Receipt, ArrowLeftRight,
  Camera, Building2, Mail, Phone, MapPin, ChevronDown, Check,
  Instagram, Twitter, Linkedin, Facebook, Youtube,
  Plus, X, Save, Hash, AlertCircle, ChevronRight, Pencil,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SocialLinks {
  instagram: string;
  twitter: string;
  linkedin: string;
  facebook: string;
  youtube: string;
}

interface FormState {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  bio: string;
  website: string;
  industry: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  address: string;
  timezone: string;
  tags: string[];
  social: SocialLinks;
}

interface EmailEntry {
  address: string;
  primary: boolean;
  verified: boolean;
  added: string;
}

type SectionId =
  | "edit-profile"
  | "about"
  | "social-media";

interface NavItem {
  id: SectionId;
  label: string;
  icon: React.FC<{ size?: number; className?: string }>;
  group: "Profile" | "About" | "Social Media";
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { id: "edit-profile", label: "Edit Profile", icon: User, group: "Profile" },
  { id: "about", label: "About Business", icon: Building2, group: "About" },
  { id: "social-media", label: "Social Media", icon: Instagram, group: "Social Media" },
];

const COUNTRIES = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "India", "Japan", "Brazil", "Other"];
const STATES: Record<string, string[]> = {
  "United States": ["California", "New York", "Texas", "Florida", "Washington", "Illinois", "Other"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  "Canada": ["Ontario", "Quebec", "British Columbia", "Alberta", "Other"],
  "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "Other"],
};
const INDUSTRIES = ["Technology", "E-Commerce", "Healthcare", "Finance", "Education", "Marketing", "Consulting", "Retail", "Real Estate", "Other"];
const TIMEZONES = ["(UTC-8) Pacific Time", "(UTC-5) Eastern Time", "(UTC+0) GMT", "(UTC+1) CET", "(UTC+5:30) IST", "(UTC+8) CST", "(UTC+9) JST"];
const LANGUAGES = ["English", "Spanish", "French", "German", "Portuguese", "Hindi", "Japanese", "Chinese", "Arabic", "Other"];

// ─── Primitive UI Components ─────────────────────────────────────────────────

// Label
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-bold tracking-widest uppercase text-slate-400 mb-1.5">
      {children}
    </label>
  );
}

// Input
interface InputProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  icon?: React.FC<{ size?: number; className?: string }>;
  type?: string;
  textarea?: boolean;
  rows?: number;
  disabled?: boolean;
}
function Input({ label, value, onChange, placeholder, icon: Icon, type = "text", textarea = false, rows = 4, disabled }: InputProps) {
  const cls = `w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:bg-white transition-all disabled:opacity-50`;
  return (
    <div>
      {label && <FieldLabel>{label}</FieldLabel>}
      <div className="relative">
        {Icon && <Icon size={14} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />}
        {textarea
          ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} disabled={disabled} className={`${cls} resize-none`} />
          : <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} disabled={disabled} className={cls} />}
      </div>
    </div>
  );
}

// Select
interface SelectProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  icon?: React.FC<{ size?: number; className?: string }>;
}
function Select({ label, value, onChange, options, placeholder, icon: Icon }: SelectProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      {label && <FieldLabel>{label}</FieldLabel>}
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all">
        {Icon && <Icon size={14} className="text-slate-400 shrink-0" />}
        <span className={`flex-1 text-left ${value ? "text-slate-800" : "text-slate-400"}`}>{value || placeholder || "Select…"}</span>
        <ChevronDown size={13} className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-52 overflow-y-auto">
          {options.map(opt => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">
              {opt} {value === opt && <Check size={12} className="text-blue-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Social row
function SocialRow({ platform, icon: Icon, value, onChange, colorCls, placeholder }: {
  platform: string; icon: React.FC<{ size?: number; className?: string }>;
  value: string; onChange: (v: string) => void; colorCls: string; placeholder: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colorCls}`}>
        <Icon size={15} className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{platform}</p>
        <input type="url" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all" />
      </div>
    </div>
  );
}

// Tag chip
function TagChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-semibold">
      <Hash size={9} />{label}
      <button onClick={onRemove}><X size={9} /></button>
    </span>
  );
}

// Save button
function SaveButton({ saving, saved, onClick }: { saving: boolean; saved: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={saving} type="button"
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-sm ${saved ? "bg-emerald-500 text-white" : saving ? "bg-blue-400 text-white cursor-wait" : "bg-blue-600 hover:bg-blue-700 text-white active:scale-95"
        }`}>
      {saved ? <><Check size={14} />Saved!</>
        : saving ? <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Saving…</>
          : <><Save size={14} />Save Changes</>}
    </button>
  );
}

// Section card wrapper
function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100">
        <h3 className="text-sm font-black text-slate-900">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

// ─── Placeholder panels ───────────────────────────────────────────────────────

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BusinessSettings() {
  const logoFileRef = useRef<HTMLInputElement>(null);
  const bannerFileRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState<SectionId>("edit-profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [showAddEmail, setShowAddEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emails, setEmails] = useState<EmailEntry[]>([
    { address: "business@acme.com", primary: true, verified: true, added: "3 months ago" },
    { address: "support@acme.com", primary: false, verified: true, added: "1 month ago" },
  ]);

  const [form, setForm] = useState<FormState>({
    businessName: "Acme Corporation",
    ownerName: "Alexa Rawles",
    email: "alexa@acme.com",
    phone: "+1 (555) 012-3456",
    bio: "We build beautiful software products for modern businesses.",
    website: "https://acme.com",
    industry: "Technology",
    country: "United States",
    state: "California",
    city: "San Francisco",
    zipCode: "94105",
    address: "123 Market Street, Suite 400",
    timezone: "(UTC-8) Pacific Time",
    tags: ["SaaS", "B2B", "Design"],
    social: {
      instagram: "https://instagram.com/acme",
      twitter: "https://twitter.com/acme",
      linkedin: "https://linkedin.com/company/acme",
      facebook: "",
      youtube: "",
    },
  });

  const set = (k: keyof FormState) => (v: string) => setForm(f => ({ ...f, [k]: v }));
  const setSocial = (k: keyof SocialLinks) => (v: string) => setForm(f => ({ ...f, social: { ...f.social, [k]: v } }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise<void>(r => setTimeout(r, 1200));
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) setForm(f => ({ ...f, tags: [...f.tags, t] }));
    setTagInput("");
  };

  const initials = form.businessName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  const stateOptions = STATES[form.country] ?? ["Other"];

  // ── Grouped nav ──────────────────────────────────────────────────────────
  const groups = ["Profile", "About", "Social Media"] as const;

  // ── Edit Profile Panel ──────────────────────────────────────────────────
  const editProfilePanel = (
    <div className="space-y-6">
      {/* ── Business Identity Section ── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative group/banner">
        {/* Banner Area (Full Width) */}
        <div className="relative h-44 w-full bg-slate-100 transition-all overflow-hidden border-b border-slate-100">
          {banner ? (
            <img src={banner} alt="Banner" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-blue-600 via-indigo-600 to-blue-700 opacity-90 shadow-inner" />
          )}

          {/* Banner Edit Overlay */}
          <button
            onClick={() => bannerFileRef.current?.click()}
            type="button"
            className="absolute inset-0 bg-black/30 opacity-0 group-hover/banner:opacity-100 transition-all duration-300 flex items-center justify-center text-white z-20 backdrop-blur-[2px]"
          >
            <div className="flex flex-col items-center gap-2 transform translate-y-2 group-hover/banner:translate-y-0 transition-transform">
              <Camera size={28} className="drop-shadow-md" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Update Cover</span>
            </div>
          </button>
        </div>

        {/* Profile Info Overlay (Logo + Basic Details) */}
        <div className="px-8 flex items-end gap-6 -mt-14 relative z-10 mb-8">
          <div className="relative group/logo shrink-0">
            {avatar
              ? <img src={avatar} alt="logo" className="w-28 h-28 rounded-3xl object-cover ring-[10px] ring-white shadow-2xl bg-white" />
              : <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-black ring-[10px] ring-white shadow-2xl">{initials}</div>
            }
            <button onClick={() => logoFileRef.current?.click()} type="button"
              className="absolute inset-0 rounded-3xl bg-black/40 opacity-0 group-hover/logo:opacity-100 transition-opacity flex items-center justify-center z-10 transition-all">
              <Camera size={24} className="text-white" />
            </button>
          </div>
          <div className="mb-2">
            <h3 className="font-black text-slate-900 text-2xl leading-tight">{form.businessName}</h3>
            <p className="text-sm text-slate-500 font-semibold">{form.ownerName}</p>
          </div>
        </div>

        {/* Form Fields Area (with subtle background) */}
        <div className="p-8 bg-slate-50/60 border-t border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Business Name" value={form.businessName} onChange={set("businessName")} placeholder="Your business name" icon={Building2} />
            <Input label="Owner / CEO Name" value={form.ownerName} onChange={set("ownerName")} placeholder="Full name" icon={User} />
            <Select label="Industry" value={form.industry} onChange={set("industry")} options={INDUSTRIES} placeholder="Select industry" />
            <Input label="Website" value={form.website} onChange={set("website")} placeholder="https://yourwebsite.com" icon={Globe} type="url" />
          </div>
        </div>
      </div>

      <SectionCard title="Email Addresses" subtitle="Manage linked email accounts">
        <div className="space-y-3 mb-4">
          {emails.map((em, i) => (
            <div key={i} className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 group hover:border-blue-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Mail size={14} className="text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-800 text-sm truncate">{em.address}</span>
                  {em.primary && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-black rounded-full uppercase tracking-wide">Primary</span>}
                  {em.verified && <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-wide flex items-center gap-0.5"><Check size={8} />Verified</span>}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">Added {em.added}</p>
              </div>
              {!em.primary && (
                <button type="button" onClick={() => setEmails(p => p.filter((_, j) => j !== i))}
                  className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 transition-all">
                  <X size={13} />
                </button>
              )}
            </div>
          ))}
        </div>

        {showAddEmail ? (
          <div className="p-4 bg-slate-50 border-2 border-dashed border-blue-200 rounded-xl space-y-3">
            <FieldLabel>New Email Address</FieldLabel>
            <input value={newEmail} type="email" onChange={e => setNewEmail(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter" && newEmail.trim()) {
                  setEmails(p => [...p, { address: newEmail.trim(), primary: false, verified: false, added: "Just now" }]);
                  setNewEmail(""); setShowAddEmail(false);
                }
              }}
              placeholder="Enter email address"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
            <div className="flex gap-2">
              <button type="button"
                onClick={() => { if (newEmail.trim()) { setEmails(p => [...p, { address: newEmail.trim(), primary: false, verified: false, added: "Just now" }]); setNewEmail(""); setShowAddEmail(false); } }}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
                Add Email
              </button>
              <button type="button" onClick={() => { setShowAddEmail(false); setNewEmail(""); }}
                className="px-4 py-2.5 bg-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-300 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button type="button" onClick={() => setShowAddEmail(true)}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-slate-200 rounded-xl text-sm font-semibold text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
            <Plus size={14} /> Add Email Address
          </button>
        )}
      </SectionCard>
    </div>
  );

  // ── About Panel ──────────────────────────────────────────────────────────
  const aboutPanel = (
    <div className="space-y-6">
      <SectionCard title="Business Story" subtitle="Tell your customers about your journey">
        <Input label="Business Bio" value={form.bio} onChange={set("bio")} placeholder="What does your business do?" textarea rows={4} />

        <div className="mt-6">
          <FieldLabel>Tags / Keywords</FieldLabel>
          <div className="flex flex-wrap gap-2 mb-2.5 min-h-[26px]">
            {form.tags.map(t => <TagChip key={t} label={t} onRemove={() => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))} />)}
          </div>
          <div className="flex gap-2">
            <input value={tagInput} onChange={e => setTagInput(e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTag()}
              placeholder="Add tag…"
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" />
            <button onClick={addTag} type="button" className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">Add</button>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Contact & Location" subtitle="Public contact details and address">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Input label="Public Business Email" value={form.email} onChange={set("email")} placeholder="email@business.com" icon={Mail} type="email" />
          <Input label="Public Phone Number" value={form.phone} onChange={set("phone")} placeholder="+1 (555) 000-0000" icon={Phone} type="tel" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select label="Country" value={form.country} onChange={v => { set("country")(v); set("state")(""); }} options={COUNTRIES} placeholder="Select country" />
          <Select label="State / Province" value={form.state} onChange={set("state")} options={stateOptions} placeholder="Select state" />
          <Input label="City" value={form.city} onChange={set("city")} placeholder="City" icon={MapPin} />
          <Input label="ZIP / Postal Code" value={form.zipCode} onChange={set("zipCode")} placeholder="ZIP code" />
          <div className="sm:col-span-2">
            <Input label="Street Address" value={form.address} onChange={set("address")} placeholder="123 Main St, Suite 100" icon={MapPin} />
          </div>
          <div className="sm:col-span-2">
            <Select label="Time Zone" value={form.timezone} onChange={set("timezone")} options={TIMEZONES} placeholder="Select timezone" />
          </div>
        </div>
      </SectionCard>
    </div>
  );

  // ── Social Media Panel ───────────────────────────────────────────────────
  const socialMediaPanel = (
    <div className="space-y-6">
      <SectionCard title="Social Media Links" subtitle="Connect your public profiles">
        <div className="space-y-4">
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
            <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-700">All URLs must include <code className="bg-amber-100 px-1 rounded font-mono">https://</code></p>
          </div>
          <SocialRow platform="Instagram" icon={Instagram} value={form.social.instagram} onChange={setSocial("instagram")} colorCls="bg-gradient-to-br from-pink-500 to-orange-400" placeholder="https://instagram.com/…" />
          <SocialRow platform="Twitter / X" icon={Twitter} value={form.social.twitter} onChange={setSocial("twitter")} colorCls="bg-slate-800" placeholder="https://twitter.com/…" />
          <SocialRow platform="LinkedIn" icon={Linkedin} value={form.social.linkedin} onChange={setSocial("linkedin")} colorCls="bg-blue-600" placeholder="https://linkedin.com/company/…" />
          <SocialRow platform="Facebook" icon={Facebook} value={form.social.facebook} onChange={setSocial("facebook")} colorCls="bg-blue-700" placeholder="https://facebook.com/…" />
          <SocialRow platform="YouTube" icon={Youtube} value={form.social.youtube} onChange={setSocial("youtube")} colorCls="bg-red-500" placeholder="https://youtube.com/@…" />
        </div>
      </SectionCard>
    </div>
  );

  // ── Panel map ─────────────────────────────────────────────────────────────
  const panels: Record<SectionId, React.ReactNode> = {
    "edit-profile": editProfilePanel,
    "about": aboutPanel,
    "social-media": socialMediaPanel,
  };

  const showSave = active === "edit-profile" || active === "about" || active === "social-media";

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-slate-100" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

      <input ref={logoFileRef} type="file" accept="image/*" className="hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const f = e.target.files?.[0];
          if (f) setAvatar(URL.createObjectURL(f));
        }} />

      <input ref={bannerFileRef} type="file" accept="image/*" className="hidden"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const f = e.target.files?.[0];
          if (f) setBanner(URL.createObjectURL(f));
        }} />

      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-6 items-start">

        {/* ═══════════ LEFT SIDEBAR ═══════════ */}
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-10 space-y-1">

          {/* Avatar / name card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4 flex items-center gap-3">
            <div className="relative group shrink-0">
              {avatar
                ? <img src={avatar} alt="logo" className="w-11 h-11 rounded-xl object-cover ring-2 ring-white shadow" />
                : <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-base font-black ring-2 ring-white shadow">{initials}</div>
              }
              <button onClick={() => logoFileRef.current?.click()} type="button"
                className="absolute inset-0 rounded-xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={13} className="text-white" />
              </button>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-black text-slate-900 truncate">{form.businessName}</p>
              <p className="text-xs text-slate-500 truncate">{form.ownerName}</p>
            </div>
          </div>

          {/* Grouped nav — matches the screenshot exactly */}
          {groups.map(group => {
            const items = NAV_ITEMS.filter(n => n.group === group);
            return (
              <div key={group} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-3">
                {/* Group label */}
                <div className="px-4 pt-4 pb-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{group}</p>
                </div>
                {/* Nav items */}
                {items.map(item => {
                  const Icon = item.icon;
                  const isActive = active === item.id;
                  return (
                    <button
                      key={item.id} type="button"
                      onClick={() => setActive(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all relative group
                        ${isActive
                          ? "bg-blue-50"
                          : "hover:bg-slate-50"
                        }`}
                    >
                      {/* Active left border pill */}
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-blue-500 rounded-r-full" />
                      )}
                      {/* Icon circle */}
                      <span className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${isActive ? "bg-blue-600 shadow-sm shadow-blue-200" : "bg-slate-100 group-hover:bg-slate-200"}`}>
                        <Icon size={14} className={isActive ? "text-white" : "text-slate-500"} />
                      </span>
                      <span className={`text-sm font-semibold ${isActive ? "text-blue-700" : "text-slate-700"}`}>
                        {item.label}
                      </span>
                    </button>
                  );
                })}
                <div className="pb-1" />
              </div>
            );
          })}
        </aside>

        {/* ═══════════ RIGHT CONTENT ═══════════ */}
        <main className="flex-1 min-w-0">

          {/* Page title bar */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-lg font-black text-slate-900">
                {NAV_ITEMS.find(n => n.id === active)?.label}
              </h1>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-slate-400">
                <span>Settings</span>
                <ChevronRight size={10} />
                <span className="text-blue-600 font-semibold">{NAV_ITEMS.find(n => n.id === active)?.label}</span>
              </div>
            </div>
            {showSave && <SaveButton saving={saving} saved={saved} onClick={handleSave} />}
          </div>

          {/* Active panel */}
          {panels[active]}

          {/* Footer save bar (edit-profile only) */}
          {showSave && (
            <div className="mt-6 flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-400">Changes are applied to your public profile immediately after saving.</p>
              <SaveButton saving={saving} saved={saved} onClick={handleSave} />
            </div>
          )}
        </main>

      </div>
    </div>
  );
}