"use client";
import * as React from "react";
import { BookOpen, Calendar, User, LogOut, Users, Settings, Clock, LayoutDashboard } from "lucide-react";
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: session } = useSession();
    const userName = session?.user?.name || "User";
    const userRole = session?.user?.role || "User";
    let navItems;

    const StudentNavItems = [
        {
            title: "Dashboard",
            url: "/dashboard/student",
            icon: <User className="h-4 w-4" />,
        },
        {
            title: "Browse Tutors",
            url: "/tutors",
            icon: <BookOpen className="h-4 w-4" />,
        },
        {
            title: "Bookings",
            url: "/dashboard/student/bookings",
            icon: <Calendar className="h-4 w-4" />,
        },
        {
            title: "Profile",
            url: "/dashboard/student/profile",
            icon: <User className="h-4 w-4" />,
        },
    ];

    const AdminNavItems = [
        {
            title: "Dashboard",
            url: "/dashboard/admin",
            icon: <Users className="h-4 w-4" />,
        },
        {
            title: "Manage Tutors",
            url: "/dashboard/admin/tutors",
            icon: <Users className="h-4 w-4" />,
        },
        {
            title: "Settings",
            url: "/dashboard/admin/settings",
            icon: <Settings className="h-4 w-4" />,
        },
    ];

    const TutorNavItems = [
        {
            title: "Dashboard",
            url: "/dashboard/tutor",
            icon: <LayoutDashboard className="h-4 w-4" />,
        },
        {
            title: "Profile",
            url: "/dashboard/tutor/profile",
            icon: <User className="h-4 w-4" />,
        },
        {
            title: "Availability",
            url: "/dashboard/tutor/availability",
            icon: <Calendar className="h-4 w-4" />,
        },
        {
            title: "Bookings",
            url: "/dashboard/tutor/bookings",
            icon: <Clock className="h-4 w-4" />,
        },
    ];

    if (userRole === "student") {
        navItems = StudentNavItems;
    }
    if (userRole === "tutor") {
        navItems = TutorNavItems;
    }
    if (userRole === "admin") {
        navItems = AdminNavItems;
    }

    return (
        <Sidebar variant="floating" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/student/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                    <User className="size-4" />
                                </div>
                                <div className="flex flex-col gap-0.5 leading-none">
                                    <span className="font-semibold text-gray-900">{userName}</span>
                                    <span className="text-xs text-gray-500">{userRole}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {navItems?.map((item) => (
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