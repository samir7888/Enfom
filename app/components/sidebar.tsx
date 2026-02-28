import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarGroup,
    SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Home, Compass, Lightbulb, Bookmark, User, LayoutGrid } from "lucide-react"
import Link from "next/link"

const sidebarLinks = [
    {
        title: "Home",
        url: "/",
        icon: Home,
        isActive: true,
    },
    {
        title: "Explore",
        url: "/explore",
        icon: Compass,
    },
    {
        title: "Ideas",
        url: "/ideas",
        icon: Lightbulb,
    },
    {
        title: "Bookmarks",
        url: "/bookmarks",
        icon: Bookmark,
    },
    {
        title: "Profile",
        url: "/profile",
        icon: User,
    },
]

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="border-r border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all duration-300">
            <SidebarHeader className="flex items-center justify-center py-6">
                <div className="flex flex-col items-center gap-1 group-data-[collapsible=icon]:p-0">
                    <div className="w-9 h-9 bg-zinc-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-zinc-900 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-700">
                        <LayoutGrid size={18} strokeWidth={2.5} />
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent className="overflow-hidden flex flex-col items-center">
                <SidebarGroup className="p-0">
                    <SidebarGroupContent>
                        <SidebarMenu className="items-center gap-5 py-4">
                            {sidebarLinks.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        isActive={item.isActive}
                                        className="w-11 h-11 flex items-center justify-center p-0 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-900 transition-colors duration-200 data-[active=true]:bg-transparent data-[active=true]:text-zinc-900 dark:data-[active=true]:text-zinc-100"
                                    >
                                        <Link href={item.url}>
                                            <item.icon
                                                className={`size-12 ${item.isActive ? 'fill-current' : 'text-zinc-500'}`}
                                                strokeWidth={item.isActive ? 2 : 1.5}
                                            />
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}