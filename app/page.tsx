"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  FileText,
  Share2,
  MessageSquare,
  ChevronRight,
  Filter,
  Plus,
  Eye,
  Clock,
  TrendingUp,
  Star,
  LayoutGrid,
  List,
  HelpCircle,
  X,
  Send,
  Link as LinkIcon,
  User,
  Check,
  ArrowRight,
  Calendar,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Bookmark,
  AlertCircle,
  ThumbsUp,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MOCK_NOTICES, Notice } from "@/lib/noticeData";

// --- Types ---

interface FormCardData {
  id: string;
  title: string;
  category: string;
  description: string;
  responses: number;
  views: string;
  author: string;
  subAuthor: string;
  createdAt: string;
  priority: "High" | "Medium" | "Low";
  status: "ACTIVE" | "PENDING" | "EXPIRED";
}

// --- Mock Data ---

const FORM_CATEGORIES = [
  "All Forms",
  "Business",
  "Education",
  "Healthcare",
  "Government",
  "Finance",
  "Feedback",
  "Jobs",
  "Marketing",
  "Operations",
  "Human Resources",
  "Legal",
  "Technology",
  "Customer Service",
  "Research",
  "Events",
  "Survey",
  "Application",
];

const NOTICE_CATEGORIES = [
  "All Notices",
  "Urgent",
  "Events",
  "Updates",
  "Internal",
  "External",
];

const MOCK_FORMS: FormCardData[] = [
  {
    id: "f1",
    title: "Q1 Marketing Campaign Proposal Request",
    category: "Marketing",
    description:
      "Seeking creative agencies to submit comprehensive digital marketing strategy...",
    responses: 8,
    views: "55.6k",
    author: "Nixtio",
    subAuthor: "School",
    createdAt: "Dec 28",
    priority: "High",
    status: "ACTIVE",
  },
  {
    id: "f2",
    title: "Vendor Partnership Evaluation Form",
    category: "Operations",
    description:
      "Complete the vendor assessment questionnaire for potential logistics...",
    responses: 3,
    views: "55.6k",
    author: "Nixtio",
    subAuthor: "School",
    createdAt: "Jan 05",
    priority: "Medium",
    status: "PENDING",
  },
  {
    id: "f3",
    title: "Sales Pipeline Review - Q4 Analysis",
    category: "Sales",
    description:
      "Team members submit weekly pipeline updates with deal status, blockers, and...",
    responses: 12,
    views: "55.6k",
    author: "Nixtio",
    subAuthor: "School",
    createdAt: "Dec 30",
    priority: "High",
    status: "ACTIVE",
  },
];

// --- Main Component ---

export default function Home() {
  const [activeTab, setActiveTab] = useState("form");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Forms");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const filteredForms = MOCK_FORMS.filter((form) => {
    const matchesSearch =
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Forms" || form.category === selectedCategory;
    const matchesStatus =
      statusFilter === "All" ||
      form.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="h-screen bg-gray-50 text-[#111827]">
      {/* --- Top Navbar --- */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="relative group w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#10B981] transition-colors"
              size={18}
            />
            <Input
              placeholder="Search forms, notices..."
              className="pl-12 bg-gray-50 border-none rounded-2xl h-11 focus-visible:ring-2 focus-visible:ring-emerald-100 transition-all font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden lg:flex items-center gap-1 bg-gray-50/80 p-1 rounded-xl border border-gray-100/50">
            {["All", "Pending", "Active"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "px-6 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all",
                  statusFilter === status
                    ? "bg-[#10B981] text-white shadow-sm"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                )}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl text-gray-500 hover:bg-gray-50 relative shrink-0"
            >
              <Bell className="size-6" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>

            <div className="flex items-center gap-3 pl-2 border-l border-gray-100 group cursor-pointer">
              <Avatar className="size-10 rounded-xl transition-all group-hover:ring-2 group-hover:ring-emerald-500/10">
                <AvatarImage src="https://ui-avatars.com/api/?name=Maneesh+Pandey&background=10B981&color=fff" />
                <AvatarFallback className="rounded-xl bg-emerald-50 text-emerald-600 font-bold">
                  MP
                </AvatarFallback>
              </Avatar>
              <div className="text-right hidden sm:block">
                <p className="text-[13px] font-bold text-gray-900 leading-none">
                  Maneesh Pandey
                </p>
                <p className="text-[11px] font-medium text-gray-400 mt-1">
                  @maneeshpandey
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1400px] bg-gray-50   h-screen mx-auto p-8 pt-4">
        <div className="flex flex-col  lg:flex-row gap-8">
          {/* --- Main Content Area --- */}
          <div className="flex-1 min-h-screen no-scrollbar pb-24">
            {/* --- Sub Header (Title & Tabs) --- */}
            <div className="mb-8 max-w-[1400px] mx-auto flex items-center justify-between">
              <h1 className="text-[28px] font-black tracking-tight">
                Business Feed
              </h1>

              <Tabs
                defaultValue="form"
                onValueChange={setActiveTab}
                className="bg-white border border-gray-100 p-1 rounded-xl shadow-sm"
              >
                <TabsList className="bg-transparent h-9">
                  <TabsTrigger
                    value="form"
                    className="rounded-lg data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 px-6 font-bold text-xs transition-all text-gray-400"
                  >
                    Form
                  </TabsTrigger>
                  <TabsTrigger
                    value="notice"
                    className="rounded-lg data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 px-6 font-bold text-xs transition-all text-gray-400"
                  >
                    Notice
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeTab === "form" ? (
                filteredForms.map((form) => (
                  <FormCard key={form.id} form={form} />
                ))
              ) : (
                <div className="col-span-full space-y-6">
                  {MOCK_NOTICES.map((notice) => (
                    <NoticeItem key={notice.id} notice={notice} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* --- Right Sidebar Categories --- */}
          <aside className="w-full lg:w-80 shrink-0 lg:sticky lg:top-[100px] self-start z-30">
            <div className="bg-white rounded-2xl p-6 border border-gray-100/80 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">
                Categories
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(showAllCategories
                  ? FORM_CATEGORIES
                  : FORM_CATEGORIES.slice(0, 8)
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between group",
                      selectedCategory === cat
                        ? "bg-[#10B981] text-white shadow-lg shadow-emerald-100"
                        : "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
                    )}
                  >
                    {cat}
                    <ChevronRight
                      size={14}
                      className={cn(
                        "opacity-0 group-hover:opacity-100 transition-all",
                        selectedCategory === cat && "opacity-100"
                      )}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="mt-4 w-full py-2 text-sm font-bold text-gray-400 hover:text-emerald-600 transition-colors flex items-center justify-center gap-1"
              >
                {showAllCategories ? "Show less" : "See more categories"}
                <ChevronRight
                  size={16}
                  className={cn(
                    "transition-transform",
                    showAllCategories && "rotate-90"
                  )}
                />
              </button>
            </div>

            {/* --- Sidebar Footer --- */}
            <div className="mt-8 px-2">
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                {[
                  "See more",
                  "Reddit Rules",
                  "Privacy Policy",
                  "User Agreement",
                  "Accessibility",
                ].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[12px] font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-tight"
                  >
                    {link}
                  </a>
                ))}
              </div>
              <p className="text-[12px] font-bold text-gray-400/50 uppercase tracking-widest">
                Reddit, Inc. © 2026. All rights reserved.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

// --- Components ---

function FormCard({ form }: { form: FormCardData }) {
  return (
    <Card className="rounded-2xl border-gray-200/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden bg-white border">
      <CardHeader className="p-6 pb-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-gray-400">
              {form.category}
            </span>
            <Badge
              className={cn(
                "rounded-lg px-2 py-0.5 text-[10px] font-bold border-none",
                form.status === "ACTIVE"
                  ? "bg-emerald-50 text-emerald-600"
                  : form.status === "PENDING"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-gray-100 text-gray-500"
              )}
            >
              {form.status}
            </Badge>
          </div>
        </div>
        <h3 className="text-[17px] font-bold text-[#111827] leading-snug">
          {form.title}
        </h3>
      </CardHeader>

      <CardContent className="px-6 pt-2">
        <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-2 mb-5">
          {form.description}
        </p>

        <div className="flex items-center gap-4 text-gray-400 mb-6">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Calendar size={14} className="text-gray-300" />
            {form.createdAt}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                form.priority === "High" ? "bg-red-500" : "bg-amber-500"
              )}
            />
            {form.priority}
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <MessageSquare size={14} className="text-gray-300" />
            {form.responses}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="h-11 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-xl flex-1 gap-2 shadow-sm">
                <MessageSquare size={16} />
                Respond
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="sm:max-w-xl p-0 border-none shadow-2xl bg-white"
            >
              {/* Response form content... */}
              <div className="p-10">
                <h2 className="text-2xl font-bold mb-6">Form Response</h2>
                <p className="text-gray-500">
                  Form implementation details go here.
                </p>
              </div>
            </SheetContent>
          </Sheet>

          <Button
            variant="secondary"
            className="h-11 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl flex-1 border-none"
          >
            Fill Form
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-400"
          >
            <ArrowRight size={18} />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="px-6 mb-3  bg-white border-t border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-xs">
            {form.author.charAt(0)}
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 leading-none mb-0.5">
              {form.author}
            </p>
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              {form.subAuthor}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[14px] font-semibold text-gray-900">👍</span>
          <span className="text-[13px] font-bold text-gray-400 italic">
            {form.views}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

function NoticeItem({ notice }: { notice: Notice }) {
  return (
    <Link href={`/notice/${notice.id}`} className="block">
      <Card className="rounded-2xl border-gray-200/60 shadow-sm overflow-hidden bg-white border hover:shadow-lg transition-all cursor-pointer group">
        <div className="p-6 md:p-8">
          {/* Card Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-full bg-gradient-to-br from-slate-700 to-emerald-900 flex items-center justify-center text-white font-bold text-lg select-none">
                {notice.authorInitials}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[17px] font-bold text-gray-900 leading-none group-hover:text-blue-600 transition-colors">
                    {notice.source}
                  </span>
                  <Badge className="bg-gray-100 text-gray-400 border-none rounded-md px-2 py-0.5 text-[11px] font-bold">
                    {notice.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-gray-400">
                    {notice.createdAt}
                  </span>
                  <span className="text-gray-300">•</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "rounded-lg px-2 py-0 text-[10px] font-bold border-none h-5 flex items-center shadow-none",
                      notice.status === "active"
                        ? "bg-emerald-50 text-emerald-600/70"
                        : "bg-gray-50 text-gray-400"
                    )}
                  >
                    {notice.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                className={cn(
                  "rounded-xl px-3 py-1.5 text-[12px] font-bold border-none gap-1.5",
                  notice.priority === "High"
                    ? "bg-red-50 text-red-500"
                    : "bg-amber-50 text-amber-500"
                )}
              >
                <AlertCircle
                  size={14}
                  className={
                    notice.priority === "High"
                      ? "text-red-400"
                      : "text-amber-400"
                  }
                />
                {notice.priority}
              </Badge>
              <button
                className="text-gray-400 hover:text-gray-900 transition-colors p-1"
                onClick={(e) => e.preventDefault()}
              >
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-[20px] font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
              {notice.title}
            </h3>
            <p className="text-gray-400/90 text-[16px] leading-[1.6] font-medium">
              {notice.message}
            </p>
          </div>

          {/* Notice Image Preview */}
          {notice.image && (
            <div className="mb-6 rounded-2xl overflow-hidden">
              <img
                src={notice.image}
                alt={notice.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Social Stats */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-400/90 flex items-center justify-center">
                <Heart size={12} fill="white" className="text-white" />
              </div>
              <span className="text-[14px] font-medium text-gray-400">
                {notice.interested} interested
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[14px] font-medium text-gray-400 italic">
                {notice.comments} comments
              </span>
              <span className="text-[14px] font-medium text-gray-400 italic">
                {notice.responses} responses
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-gray-100/80 flex items-center justify-between">
            <div className="flex items-center gap-1 sm:gap-4 flex-1">
              <Button
                variant="ghost"
                className="flex-1 sm:flex-none h-11 rounded-xl text-gray-500 font-bold gap-2 hover:bg-gray-50 px-4"
                onClick={(e) => e.preventDefault()}
              >
                <Heart size={18} />
                Interested
              </Button>
              <Button
                variant="ghost"
                className="flex-1 sm:flex-none h-11 rounded-xl text-gray-500 font-bold gap-2 hover:bg-gray-50 px-4"
                onClick={(e) => e.preventDefault()}
              >
                <MessageCircle size={18} />
                Comment
              </Button>
              <Button
                variant="ghost"
                className="flex-1 sm:flex-none h-11 rounded-xl text-gray-500 font-bold gap-2 hover:bg-gray-50 px-4"
                onClick={(e) => e.preventDefault()}
              >
                <FileText size={18} />
                Fill Form
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-xl text-gray-400 hover:text-gray-900"
              onClick={(e) => e.preventDefault()}
            >
              <Bookmark size={20} />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}
