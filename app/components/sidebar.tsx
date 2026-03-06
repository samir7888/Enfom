"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  Home,
  Bookmark,
  User,
  LayoutGrid,
  Inbox,
  MessageCircle,
  Form,
  Settings,
  SubscriptIcon,
  DollarSign,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { InboxContent } from "@/components/inbox-content";
import { useUser } from "@/contexts/userContext";

const appSidebarLinks = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Saved",
    url: "/saved",
    icon: Bookmark,
  },
  {
    title: "Inbox",
    icon: MessageCircle,
    isInbox: true,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

const businessSidebarLinks = [
  {
    title: "Business",
    url: "/",
    icon: Home,
  },
  {
    title: "Saved",
    url: "/business/saved",
    icon: Bookmark,
  },
  {
    title: "CreateForm",
    url: "/business/formcreate",
    icon: Form,
  },

  {
    title: "Inbox",
    icon: MessageCircle,
    isInbox: true,
  },
  {
    title: "Dashboard",
    url: "/business/dashboard",
    icon: LayoutGrid,
  },
  {
    title: "Revenue",
    url: "/business/revenue",
    icon: DollarSign,
  },
  {
    title: "Billing",
    url: "/business/billing",
    icon: SubscriptIcon,
  },
  {
    titile: 'Settings',
    url: '/business/dashboard/setting',
    icon: Settings,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, isLoading } = useUser();

  if(isLoading || !user)
  {
    return <span className="flex items-center justify-center animate-spin"><Loader2 /></span>
  }

  const isBusiness = user?.Owner === 'Business' && user.isVerified;
  const sidebarLinks = isBusiness ? businessSidebarLinks : appSidebarLinks;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r w-full border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-300"
    >
      <SidebarHeader className="flex items-center justify-center py-6">
        <div className="flex flex-col items-center gap-1 group-data-[collapsible=icon]:p-0">
          <div className="w-12 h-12 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-zinc-900 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700">
            <LayoutGrid size={24} strokeWidth={2} />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden flex flex-col items-center">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="items-center gap-5 py-4">
              {sidebarLinks.map((item) => {
                const isActive = item.url === pathname;
                return (
                  <SidebarMenuItem key={item.title}>
                    {item.isInbox ? (
                      <Sheet>
                        <SheetTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            className="w-24 h-24 flex items-center justify-center p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors duration-200"
                          >
                            <item.icon
                              className="size-7 text-zinc-500"
                              strokeWidth={1.5}
                            />
                          </SidebarMenuButton>
                        </SheetTrigger>
                        <SheetContent
                          side="left"
                          className="pb-2 left-24 my-12 rounded-xl h-fit sm:max-w-md shadow-2xl border-r border-slate-100 dark:border-zinc-800"
                        >
                          <InboxContent />
                        </SheetContent>
                      </Sheet>
                    ) : (
                      <SidebarMenuButton
                        asChild
                        tooltip={item.title}
                        isActive={isActive}
                        className="w-24 h-24 flex items-center justify-center p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors duration-200 data-[active=true]:bg-transparent data-[active=true]:text-primary dark:data-[active=true]:text-primary"
                      >
                        <Link href={item.url || "#"}>
                          <item.icon
                            className={`size-7 ${isActive
                              ? "fill-primary text-primary"
                              : "text-zinc-500"
                              }`}
                            strokeWidth={isActive ? 2 : 1.5}
                          />
                        </Link>
                      </SidebarMenuButton>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
