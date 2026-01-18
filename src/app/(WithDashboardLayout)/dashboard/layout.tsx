"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AppSidebar } from "@/components/ui/core/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { HashLoader } from "react-spinners";


export default function TutorDashboardPage(
    { children }: { children: ReactNode }
) {
    const { data: session, status } = useSession();
    const router = useRouter();

    // console.log(session?.user?.role);

    // Redirect if not authenticated or not a tutor
    if (status === "loading") {
        return <div className="flex items-center justify-center h-screen">
            <HashLoader />
        </div>;
    }
    if (!session) {
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
                                <BreadcrumbLink href={`/dashboard/${session.user.role}`}>{session.user.role} Dashboard</BreadcrumbLink>
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