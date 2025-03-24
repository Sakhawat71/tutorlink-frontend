
"use client";
import { AppSidebar } from "@/components/modules/dashboard/Tutor/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";


export default function TutorDashboardPage(
    { children }: { children: ReactNode }
) {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Redirect if not authenticated or not a tutor
    if (status === "loading") {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    if (!session || session.user.role !== "tutor") {
        router.push("/login");
        return null;
    }

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "19rem",
                } as React.CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 px-4 bg-white border-b">
                    <SidebarTrigger className="-ml-1 text-gray-600 hover:text-indigo-600" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard/tutor">Tutor Dashboard</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Overview</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <div>
                    {children}
                </div>

            </SidebarInset>
        </SidebarProvider>
    );
}