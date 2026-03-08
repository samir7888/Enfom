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
  LayoutDashboard,
  File,
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

  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/contexts/userContext";
import { useFetchData } from "@/hooks/useFetchData";
import { NoticeResponse } from "./notice/page";

// --- Types ---

interface FormCardData {
  formId: string;
  formName: string;
  description: string | null;
  price: number;
  createdAt: string;
  business: {
    businessId: string;
    businessName: string;
    businessType: string;
    logo: string;
    bio: string;
  };
  // UI related / default values
  responses?: number;
  views?: string;
  isVisible?: boolean;
  isStyle?: boolean;
}

// --- Mock Data ---

const FORM_CATEGORIES = [
  "All Forms",
  "Saas",
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



const MOCK_FORMS: FormCardData[] = [];

// --- Main Component ---

export default function Home() {
  const [activeTab, setActiveTab] = useState("form");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Forms");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const { data, isLoading } = useFetchData<FormCardData[]>(
    {
      queryKey: ["forms"],
      endpoint: "FormTemplates/public",
    }
  );



  const { data: notices, isLoading: noticesLoading, error: noticesError } = useFetchData<NoticeResponse>({
    queryKey: ["notices"],
    endpoint: "Notice/GetAllNotices",
  });
  const { user } = useUser();


  const formsToFilter = data || MOCK_FORMS;

  const filteredForms = formsToFilter.filter((form) => {
    const title = form.formName || "";
    const description = form.description || "";
    const category = form.business?.businessType || "";

    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Forms" || category === selectedCategory;
    const matchesStatus =
      statusFilter === "All" || isNewOrActive(new Date(form.createdAt)) === statusFilter;
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
            {["All", "New", "Active"].map((status) => (
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
                  {user?.FullName || "Guest"}
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
              {isLoading ? (
                <div className="col-span-full py-12 text-center text-gray-400">Loading forms...</div>
              ) : activeTab === "form" ? (
                filteredForms.length > 0 ? (
                  filteredForms.map((form) => (
                    <FormCard key={form.formId} form={form} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-gray-400">No forms found.</div>
                )
              ) : (
                <div className="col-span-full space-y-6">
                  {noticesLoading ? (
                    <div className="py-12 text-center text-gray-400 font-medium animate-pulse">Fetching latest notices...</div>
                  ) : notices?.data && notices.data.length > 0 ? (
                    notices.data.map((notice) => (
                      <NoticeItem key={notice.id} notice={notice as any} />
                    ))
                  ) : (
                    <div className="py-12 text-center text-gray-400 font-medium">No announcements yet. Check back later!</div>
                  )}
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
        {user?.Owner === "Business" && <div className="size-12 absolute flex items-center justify-center  rounded-full bottom-7 right-24 bg-black">
          <Link href={user.isVerified ? "/enter-pin" : "/create-pin"}>
            <LayoutDashboard className="text-white" />
          </Link>
        </div>}
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
            <span className="text-[15px] font-medium uppercase tracking-wider text-gray-400">
              {form.business?.businessType}
            </span>

            {/* {form.isVisible ? (
              <Badge variant="outline" className="text-emerald-600 border-emerald-100">
                Active
              </Badge>
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-100">
                Inactive
              </Badge>
            )} */}


            {isNewOrActive(new Date(form.createdAt)) === "New" ? (
              <Badge variant="outline" className="text-emerald-600 bg-green-100 border-emerald-100">
                New
              </Badge>
            ) : (
              <Badge variant="outline" className="text-yellow-600 bg-yellow-100 border-yellow-100">
                Active
              </Badge>
            )}

          </div>
          {form.price > 0 && (
            <Badge variant="outline" className="text-emerald-600 border-emerald-100">
              ${form.price}
            </Badge>
          )}
        </div>
        <h3 className="text-[17px] font-bold text-[#111827] leading-snug line-clamp-1">
          {form.formName}
        </h3>
      </CardHeader>

      <CardContent className="px-6 pt-2">
        <p className="text-gray-500 text-[14px] leading-relaxed line-clamp-2 mb-5 min-h-[40px]">
          {form.description || "No description available."}
        </p>

        <div className="flex items-center gap-4 text-gray-400 mb-6">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Calendar size={14} className="text-gray-300" />
            {new Date(form.createdAt).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium">
            <MessageSquare size={14} className="text-gray-300" />
            {form.responses || 0}
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

          <Link href={`/form/${form.formId}?isStyle=${form.isStyle}`}
            className="flex items-center justify-center h-11 bg-gray-100 hover:bg-gray-200 text-gray-700 gap-2 font-bold rounded-xl flex-1 border-none"
          >
            <File size={16} />
            Fill Form
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-400"
          >
            <ArrowRight size={18} />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="px-6 mb-3 bg-white border-t border-gray-50 flex items-center justify-between pt-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-bold text-xs overflow-hidden">
            {form.business?.logo ? (
              <img src={form.business.logo} alt={form.business.businessName} className="w-full h-full object-cover" />
            ) : (
              (form.business?.businessName || "E").charAt(0)
            )}
          </div>
          <div>
            <p className="text-[13px] font-bold text-gray-900 leading-none mb-0.5">
              {form.business?.businessName || "System"}
            </p>
            <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
              {form.business?.businessType || "Business"}
            </p>
          </div>
        </div>


      </CardFooter>
    </Card>
  );
}

function NoticeItem({ notice }: { notice: any }) {
  const commentCount = notice.noticeCommentEntities?.length || 0;
  const publisherName = notice.publisher || notice.publisherId?.substring(0, 8) || "System";
  const initials = publisherName.substring(0, 2).toUpperCase();

  return (
    <Link href={`/notice`} className="block">
      <Card className="rounded-2xl border-gray-200/60 shadow-sm overflow-hidden bg-white border hover:shadow-xl transition-all cursor-pointer group">
        <div className="p-6 md:p-8">
          {/* Card Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-bold text-lg select-none shadow-lg shadow-emerald-100/50">
                {initials}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[17px] font-bold text-gray-900 leading-none group-hover:text-[#10B981] transition-colors">
                    {publisherName}
                  </span>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none rounded-md px-2 py-0.5 text-[11px] font-bold">
                    Official
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-gray-400">
                    {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : "Just now"}
                  </span>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                    <Clock size={12} />
                    Active
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="bg-blue-50 text-blue-500 rounded-xl px-3 py-1.5 text-[12px] font-bold border-none gap-1.5">
                <AlertCircle size={14} className="text-blue-400" />
                In Announcement
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
            <h3 className="text-[20px] font-bold text-gray-900 leading-tight group-hover:text-[#10B981] transition-colors">
              {notice.title}
            </h3>
            <p className="text-gray-500/90 text-[16px] leading-[1.6] font-medium line-clamp-3">
              {notice.description}
            </p>
          </div>

          {/* Notice Image Preview */}
          {notice.imageUrl && (
            <div className="mb-6 rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <img
                src={notice.imageUrl}
                alt={notice.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Social Stats */}
          <div className="flex items-center justify-between pb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ThumbsUp size={14} />
                </div>
                <span className="text-[14px] font-medium text-gray-400">
                  {notice.audience || 0} reached
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-[14px] font-medium text-gray-400 italic">
                {commentCount} comments
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-gray-100/80 flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4 flex-1">
              <Button
                variant="ghost"
                className="flex-1 sm:flex-none h-11 rounded-xl text-gray-500 font-bold gap-2 hover:bg-emerald-50 hover:text-emerald-600 px-4 transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  toast.success("Added to interests!");
                }}
              >
                <Heart size={18} />
                Interested
              </Button>
              <Button
                variant="ghost"
                className="flex-1 sm:flex-none h-11 rounded-xl text-gray-500 font-bold gap-2 hover:bg-emerald-50 hover:text-emerald-600 px-4 transition-all"
                onClick={(e) => e.preventDefault()}
              >
                <MessageCircle size={18} />
                Comment
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-11 w-11 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={(e) => {
                e.preventDefault();
                toast.info("Notice saved!");
              }}
            >
              <Bookmark size={20} />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}



const isNewOrActive = (data: Date) => {
  const diff = Date.now() - data.getTime();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  return diff <= oneDayInMs ? "New" : "Active";


}