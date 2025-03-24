"use client";
import * as React from "react";
import { Users, Settings, LogOut } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function AdminAppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: session } = useSession();
    const adminName = session?.user?.name || "Admin";

    const navItems = [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: <Users className="h-4 w-4" />,
        },
        {
            title: "Manage Tutors",
            url: "/admin/tutors",
            icon: <Users className="h-4 w-4" />,
        },
        {
            title: "Settings",
            url: "/admin/settings",
            icon: <Settings className="h-4 w-4" />,
        },
    ];

    return (
        <Sidebar variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/admin/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                    <Users className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold text-gray-900">{adminName}</span>
                                    <span className="text-xs text-gray-500">Admin</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {navItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link
                                        href={item.url}
                                        className="flex items-center gap-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors"
                                    >
                                        {item.icon}
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                className="flex items-center gap-3 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}