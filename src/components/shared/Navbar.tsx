"use client";
import { Button } from "../ui/button";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
// import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: session } = useSession();
    const userRole = session?.user?.role || null;
    const pathname = usePathname();


    return (
        <header className="border-b w-full bg-white shadow-sm">
            <div className="container mx-auto h-16 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-extrabold tracking-tight text-indigo-600 hover:text-indigo-700 transition-colors">
                    TutorLink
                </Link>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Hamburger Menu for Mobile */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-gray-600 hover:text-indigo-600 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>

                    {/* Navigation */}
                    <nav
                        className={cn(
                            "md:flex items-center gap-6",
                            isMobileMenuOpen
                                ? "flex flex-col absolute top-16 left-0 w-full bg-white shadow-lg p-6 z-20 border-b md:border-0"
                                : "hidden md:flex-row"
                        )}
                    >
                        <Link href="/">
                            <Button
                                variant="ghost"
                                className={cn(
                                    "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors w-full md:w-auto text-left cursor-pointer",
                                    pathname === "/" && "font-bold text-indigo-600" // Bold and colored when active
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Button>
                        </Link>
                        <Link href="/tutors">
                            <Button
                                variant="ghost"
                                className={cn(
                                    "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors w-full md:w-auto text-left cursor-pointer",
                                    pathname === "/tutors" && "font-bold text-indigo-600"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Browse Tutors
                            </Button>
                        </Link>
                        <Link href="/about">
                            <Button
                                variant="ghost"
                                className={cn(
                                    "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors w-full md:w-auto text-left cursor-pointer",
                                    pathname === "/about" && "font-bold text-indigo-600"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About Us
                            </Button>
                        </Link>
                        <Link href="/faq">
                            <Button
                                variant="ghost"
                                className={cn(
                                    "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors w-full md:w-auto text-left cursor-pointer",
                                    pathname === "/faq" && "font-bold text-indigo-600"
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                FAQ
                            </Button>
                        </Link>
                        
                    </nav>

                    {/* User Authentication Section */}
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="focus:outline-none">
                                <Avatar className="h-10 w-10 ring-2 ring-indigo-200 hover:ring-indigo-400 transition-all">
                                    <AvatarImage src="https://i.ibb.co/4K27t1f/user.png" />
                                    <AvatarFallback className="bg-indigo-100 text-indigo-600">
                                        {session.user?.name?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 p-2 shadow-lg rounded-lg border border-gray-100">
                                <DropdownMenuLabel className="text-sm font-medium text-gray-900">
                                    {session.user?.name || "My Account"}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="my-1" />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={`/dashboard/${userRole}`}
                                        className={cn(
                                            "flex items-center px-3 py-2 text-gray-900 hover:text-indigo-600 rounded-md cursor-pointer transition-colors",
                                            pathname === `/dashboard/${userRole}` && "font-bold text-indigo-600"
                                        )}
                                    >
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="my-1" />
                                <DropdownMenuItem
                                    onClick={() => signOut()}
                                    className="flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md cursor-pointer transition-colors font-semibold"
                                >
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button
                                variant="outline"
                                className="rounded-full px-4 py-2 text-sm font-medium text-indigo-600 border-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}