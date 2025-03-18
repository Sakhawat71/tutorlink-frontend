"use client";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react"; // Added Menu icon for hamburger
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
import { logoutUser } from "@/services/AuthService";
import { usePathname, useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    //   const { data: session, status } = useSession();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logoutUser();
        router.push("/login");
    };

    //   const userRole = session?.user?.role || null;
    const session = true;
    const userRole = "student";

    if (status === "loading") {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <header className="border-b w-full">
            <div className="container mx-auto h-16 px-4 flex justify-between items-center">
                
                
                <Link href="/" className="text-2xl font-black flex items-center">
                    TutorLink
                </Link>



                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        className="md:hidden p-0" // Hidden on medium screens and up
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>

                    {/* Navigation */}
                    <nav
                        className={`${isMobileMenuOpen ? "flex" : "hidden"
                            } md:flex flex-col md:flex-row gap-4 items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 z-10 border-b md:border-0`}
                    >
                        <Link href="/">
                            <Button variant="link" onClick={() => setIsMobileMenuOpen(false)}>
                                Home
                            </Button>
                        </Link>

                        <Link href="/tutors">
                            <Button variant="link" onClick={() => setIsMobileMenuOpen(false)}>
                                Browse Tutors
                            </Button>
                        </Link>


                        {/* Role-based Links */}
                        {session && userRole === "student" && (
                            <Link href="/student/bookings">
                                <Button variant="link" onClick={() => setIsMobileMenuOpen(false)}>
                                    My Bookings
                                </Button>
                            </Link>
                        )}
                        {session && userRole === "tutor" && (
                            <>
                                <Link href="/tutor/profile">
                                    <Button variant="link" onClick={() => setIsMobileMenuOpen(false)}>
                                        My Profile
                                    </Button>
                                </Link>
                                <Link href="/tutor/availability">
                                    <Button variant="link" onClick={() => setIsMobileMenuOpen(false)}>
                                        Availability
                                    </Button>
                                </Link>
                            </>
                        )}
                        {session && userRole === "admin" && (
                            <Link href="/admin/tutors">
                                <Button variant="link" onClick={() => setIsMobileMenuOpen(false)}>
                                    Manage Tutors
                                </Button>
                            </Link>
                        )}

                        <Link href="/tutors">
                            <Button variant="link" onClick={() => setIsMobileMenuOpen(false)}>
                                About Us
                            </Button>
                        </Link>

                        <Link href="/faq">
                            <Button variant="link" onClick={() => setIsMobileMenuOpen(false)}>
                                FAQ
                            </Button>
                        </Link>

                        <Link href="/tutors">
                            <Button variant="link" onClick={() => setIsMobileMenuOpen(false)}>
                                Blog
                            </Button>
                        </Link>


                    </nav>

                    {/* User Authentication Section */}
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="https://i.ibb.co/4K27t1f/user.png" />
                                    <AvatarFallback>User</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href={`/${userRole}/dashboard`}>Dashboard</Link>
                                </DropdownMenuItem>
                                {userRole === "tutor" && (
                                    <DropdownMenuItem>
                                        <Link href="/tutor/availability">Availability</Link>
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600 font-bold cursor-pointer"
                                    onClick={handleLogout}
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
                                className="rounded-full"
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