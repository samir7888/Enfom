"use client";

import { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import {
  Camera, Globe, Instagram, Twitter, Linkedin, Facebook,
  Youtube, MapPin, Mail, User, Building2, ChevronDown,
  Check, Plus, X, Save, Phone, AlertCircle,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

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

type TabId = "profile" | "contact" | "social" | "emails";

interface Tab {
  id: TabId;
  label: string;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const COUNTRIES: string[] = [
  "United States", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "India", "Japan", "Brazil", "Other",
];

const STATES: Record<string, string[]> = {
  "United States": ["California", "New York", "Texas", "Florida", "Washington", "Illinois", "Other"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  "Canada": ["Ontario", "Quebec", "British Columbia", "Alberta", "Other"],
  "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "Other"],
};

const INDUSTRIES: string[] = [
  "Technology", "E-Commerce", "Healthcare", "Finance", "Education",
  "Marketing", "Consulting", "Retail", "Real Estate", "Other",
];

const TIMEZONES: string[] = [
  "(UTC-8) Pacific Time", "(UTC-5) Eastern Time", "(UTC+0) GMT",
  "(UTC+1) CET", "(UTC+5:30) IST", "(UTC+8) CST", "(UTC+9) JST",
];

const TABS: Tab[] = [
  { id: "profile", label: "Business Info" },
  { id: "contact", label: "Contact & Location" },
  { id: "social", label: "Social Media" },
  { id: "emails", label: "Email Addresses" },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

interface AvatarProps {
  src: string | null;
  name: string;
  size?: "lg" | "sm";
}

function Avatar({ src, name, size = "lg" }: AvatarProps) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "B";

  const sizes: Record<"lg" | "sm", string> = {
    lg: "w-24 h-24 text-2xl",
    sm: "w-10 h-10 text-sm",
  };

  return src ? (
    <img
      src={src}
      alt={name}
      className={`${sizes[size]} rounded-2xl object-cover ring-4 ring-white shadow-lg`}
    />
  ) : (
    <div
      className={`${sizes[size]} rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold ring-4 ring-white shadow-lg`}
    >
      {initials}
    </div>
  );
}

// ─── SelectField ─────────────────────────────────────────────────────────────

interface SelectFieldProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  icon?: React.FC<{ size?: number; className?: string }>;
  placeholder?: string;
}

function SelectField({ label, value, onChange, options, icon: Icon, placeholder }: SelectFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {label && (
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-left hover:border-indigo-300 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-indigo-300"
      >
        {Icon && <Icon size={15} className="text-slate-400 shrink-0" />}
        <span className={`flex-1 text-sm ${value ? "text-slate-800" : "text-slate-400"}`}>
          {value || placeholder || "Select..."}
        </span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden max-h-56 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
            >
              {opt}
              {value === opt && <Check size={13} className="text-indigo-500" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── InputField ──────────────────────────────────────────────────────────────

interface InputFieldProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  icon?: React.FC<{ size?: number; className?: string }>;
  type?: string;
  textarea?: boolean;
  disabled?: boolean;
  hint?: string;
}

function InputField({
  label, value, onChange, placeholder, icon: Icon,
  type = "text", textarea = false, disabled = false, hint,
}: InputFieldProps) {
  const baseClass = `w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed`;

  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && <Icon size={15} className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none" />}
        {textarea ? (
          <textarea
            value={value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            rows={4}
            className={`${baseClass} resize-none`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            placeholder={placeholder}
            disabled={disabled}
            className={baseClass}
          />
        )}
      </div>
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

// ─── SocialField ─────────────────────────────────────────────────────────────

interface SocialFieldProps {
  platform: string;
  icon: React.FC<{ size?: number; className?: string }>;
  value: string;
  onChange: (val: string) => void;
  color: string;
  placeholder: string;
}

function SocialField({ icon: Icon, value, onChange, color, placeholder }: SocialFieldProps) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={15} className="text-white" />
      </div>
      <input
        type="url"
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all"
      />
    </div>
  );
}

// ─── SectionCard ─────────────────────────────────────────────────────────────

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-base font-bold text-slate-800">{title}</h2>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────

interface TagProps {
  label: string;
  onRemove: () => void;
}

function Tag({ label, onRemove }: TagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium">
      {label}
      <button onClick={onRemove} className="hover:text-indigo-900 transition-colors">
        <X size={11} />
      </button>
    </span>
  );
}

// ─── SaveButton ──────────────────────────────────────────────────────────────

interface SaveButtonProps {
  saving: boolean;
  saved: boolean;
  onClick: () => void;
  size?: "sm" | "md";
}

function SaveButton({ saving, saved, onClick, size = "md" }: SaveButtonProps) {
  const padding = size === "sm" ? "px-5 py-2.5" : "px-6 py-2.5";
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className={`flex items-center gap-2 ${padding} rounded-xl font-bold text-sm transition-all shadow-md ${
        saved
          ? "bg-emerald-500 text-white"
          : saving
          ? "bg-indigo-400 text-white cursor-wait"
          : "bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95"
      }`}
    >
      {saved ? (
        <><Check size={15} /> Saved!</>
      ) : saving ? (
        <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Saving...</>
      ) : (
        <><Save size={15} /> Save Changes</>
      )}
    </button>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function BusinessProfileSettings() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState<string>("");
  const [emails, setEmails] = useState<EmailEntry[]>([
    { address: "business@acme.com", primary: true, verified: true, added: "3 months ago" },
  ]);
  const [newEmail, setNewEmail] = useState<string>("");
  const [showAddEmail, setShowAddEmail] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    businessName: "Acme Corporation",
    ownerName: "Alexa Rawles",
    email: "alexa@acme.com",
    phone: "+1 (555) 012-3456",
    bio: "We build beautiful software products for modern businesses. Our team of experts brings years of experience in design, development, and strategy.",
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

  // Typed field updaters
  const setField = <K extends keyof FormState>(key: K) =>
    (val: FormState[K]) => setForm((f) => ({ ...f, [key]: val }));

  const setStringField = (key: keyof FormState) =>
    (val: string) => setForm((f) => ({ ...f, [key]: val }));

  const setSocial = (key: keyof SocialLinks) =>
    (val: string) => setForm((f) => ({ ...f, social: { ...f.social, [key]: val } }));

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) setField("tags")([...form.tags, t]);
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    setField("tags")(form.tags.filter((t) => t !== tag));

  const removeEmail = (index: number) =>
    setEmails((prev) => prev.filter((_, i) => i !== index));

  const addEmail = () => {
    if (newEmail.trim()) {
      setEmails((prev) => [
        ...prev,
        { address: newEmail.trim(), primary: false, verified: false, added: "Just now" },
      ]);
      setNewEmail("");
      setShowAddEmail(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise<void>((r) => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const stateOptions: string[] = STATES[form.country] ?? ["Other"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50/40 font-sans">

      {/* ── Header Banner ── */}
      <div className="h-40 bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent" />
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <h1 className="text-white text-2xl font-black tracking-tight">Business Profile Settings</h1>
          <p className="text-indigo-100 text-sm mt-1">Manage your public business presence</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-6 pb-16">

        {/* ── Profile Header Card ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-lg p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative group">
            <Avatar src={avatarPreview} name={form.businessName} size="lg" />
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              type="button"
              aria-label="Change avatar"
            >
              <Camera size={20} className="text-white" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-xl font-black text-slate-900">{form.businessName}</h2>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded-full border border-emerald-200">
                Active
              </span>
            </div>
            <p className="text-slate-500 text-sm mt-0.5">{form.email}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin size={11} />{form.city}, {form.state}
              </span>
              <span className="flex items-center gap-1">
                <Globe size={11} />{form.website}
              </span>
            </div>
          </div>

          <SaveButton saving={saving} saved={saved} onClick={handleSave} size="sm" />
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Business Info ── */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <SectionCard title="Business Identity" description="Your brand's public-facing information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Business Name" value={form.businessName} onChange={setStringField("businessName")} placeholder="Your business name" icon={Building2} />
                <InputField label="Owner / CEO Name" value={form.ownerName} onChange={setStringField("ownerName")} placeholder="Full name" icon={User} />
                <SelectField label="Industry" value={form.industry} onChange={setStringField("industry")} options={INDUSTRIES} icon={Building2} placeholder="Select industry" />
                <InputField label="Website" value={form.website} onChange={setStringField("website")} placeholder="https://yourwebsite.com" icon={Globe} type="url" />
              </div>
            </SectionCard>

            <SectionCard title="Business Bio" description="Tell the world what your business does">
              <InputField
                label="About Your Business"
                value={form.bio}
                onChange={setStringField("bio")}
                placeholder="Describe your business, mission, and what makes you unique..."
                textarea
              />
              <div className="mt-4">
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Tags / Keywords
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {form.tags.map((tag) => (
                    <Tag key={tag} label={tag} onRemove={() => removeTag(tag)} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={tagInput}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTag()}
                    placeholder="Add a tag..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {/* ── Contact & Location ── */}
        {activeTab === "contact" && (
          <div className="space-y-6">
            <SectionCard title="Contact Information" description="How customers can reach you">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Business Email" value={form.email} onChange={setStringField("email")} placeholder="business@email.com" icon={Mail} type="email" />
                <InputField label="Phone Number" value={form.phone} onChange={setStringField("phone")} placeholder="+1 (555) 000-0000" icon={Phone} type="tel" />
              </div>
            </SectionCard>

            <SectionCard title="Business Location" description="Your registered business address">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SelectField
                  label="Country"
                  value={form.country}
                  onChange={(v) => { setStringField("country")(v); setStringField("state")(""); }}
                  options={COUNTRIES}
                  icon={Globe}
                  placeholder="Select country"
                />
                <SelectField label="State / Province" value={form.state} onChange={setStringField("state")} options={stateOptions} icon={MapPin} placeholder="Select state" />
                <InputField label="City" value={form.city} onChange={setStringField("city")} placeholder="City" icon={MapPin} />
                <InputField label="ZIP / Postal Code" value={form.zipCode} onChange={setStringField("zipCode")} placeholder="ZIP code" />
                <div className="md:col-span-2">
                  <InputField label="Street Address" value={form.address} onChange={setStringField("address")} placeholder="123 Main St, Suite 100" />
                </div>
                <div className="md:col-span-2">
                  <SelectField label="Time Zone" value={form.timezone} onChange={setStringField("timezone")} options={TIMEZONES} placeholder="Select timezone" />
                </div>
              </div>
            </SectionCard>
          </div>
        )}

        {/* ── Social Media ── */}
        {activeTab === "social" && (
          <SectionCard title="Social Media Links" description="Connect your social profiles to increase visibility">
            <div className="space-y-4">
              <SocialField platform="Instagram" icon={Instagram} value={form.social.instagram} onChange={setSocial("instagram")} color="bg-gradient-to-br from-pink-500 to-orange-400" placeholder="https://instagram.com/yourbusiness" />
              <SocialField platform="Twitter / X" icon={Twitter} value={form.social.twitter} onChange={setSocial("twitter")} color="bg-slate-800" placeholder="https://twitter.com/yourbusiness" />
              <SocialField platform="LinkedIn" icon={Linkedin} value={form.social.linkedin} onChange={setSocial("linkedin")} color="bg-blue-600" placeholder="https://linkedin.com/company/yourbusiness" />
              <SocialField platform="Facebook" icon={Facebook} value={form.social.facebook} onChange={setSocial("facebook")} color="bg-blue-700" placeholder="https://facebook.com/yourbusiness" />
              <SocialField platform="YouTube" icon={Youtube} value={form.social.youtube} onChange={setSocial("youtube")} color="bg-red-600" placeholder="https://youtube.com/@yourbusiness" />
            </div>
            <div className="mt-5 p-4 bg-indigo-50 rounded-xl flex items-start gap-3">
              <AlertCircle size={16} className="text-indigo-500 mt-0.5 shrink-0" />
              <p className="text-xs text-indigo-700">
                Social links appear on your public business profile. Make sure URLs are correct and include{" "}
                <code className="bg-indigo-100 px-1 rounded">https://</code>
              </p>
            </div>
          </SectionCard>
        )}

        {/* ── Email Addresses ── */}
        {activeTab === "emails" && (
          <SectionCard title="Email Addresses" description="Manage email addresses linked to your business account">
            <div className="space-y-3 mb-5">
              {emails.map((em, i) => (
                <div
                  key={`${em.address}-${i}`}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                    <Mail size={15} className="text-indigo-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-800 text-sm truncate">{em.address}</span>
                      {em.primary && (
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 text-xs rounded-full font-semibold">
                          Primary
                        </span>
                      )}
                      {em.verified && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-600 text-xs rounded-full font-semibold flex items-center gap-1">
                          <Check size={10} /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">Added {em.added}</p>
                  </div>
                  {!em.primary && (
                    <button
                      type="button"
                      onClick={() => removeEmail(i)}
                      className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      aria-label="Remove email"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {showAddEmail ? (
              <div className="flex gap-2">
                <input
                  value={newEmail}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addEmail()}
                  placeholder="Enter new email address"
                  type="email"
                  className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={addEmail}
                  className="px-4 py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddEmail(false); setNewEmail(""); }}
                  className="px-4 py-3 bg-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowAddEmail(true)}
                className="flex items-center gap-2 px-5 py-3 border-2 border-dashed border-slate-300 text-slate-500 rounded-xl text-sm font-semibold hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all w-full justify-center"
              >
                <Plus size={15} /> Add Email Address
              </button>
            )}
          </SectionCard>
        )}

        {/* ── Footer Save Bar ── */}
        <div className="mt-6 flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-xs text-slate-400">
            Changes are saved to your public profile immediately after saving.
          </p>
          <SaveButton saving={saving} saved={saved} onClick={handleSave} />
        </div>

      </div>
    </div>
  );
}