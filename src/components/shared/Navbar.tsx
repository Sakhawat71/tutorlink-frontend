"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Menu, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COLORS, FONT_SERIF, FONT_MONO } from "@/components/shared/Designtokens";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "Browse Tutors", href: "/tutors" },
    { label: "About Us", href: "/about" },
    { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { data: session } = useSession();
    const userRole = session?.user?.role || null;
    const pathname = usePathname();

    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 40,
                background: COLORS.cream,
                borderBottom: `1px solid ${COLORS.border}`,
            }}
        >
            <div
                style={{
                    maxWidth: "1240px",
                    margin: "0 auto",
                    padding: "0 28px",
                    height: "68px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                {/* Logo */}
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "8px",
                        textDecoration: "none",
                    }}
                >
                    <span
                        style={{
                            fontFamily: FONT_SERIF,
                            fontWeight: 700,
                            fontSize: "22px",
                            color: COLORS.ink,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        TutorLink
                    </span>
                    <span
                        style={{
                            fontFamily: FONT_MONO,
                            fontSize: "10px",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: COLORS.clay,
                            fontWeight: 700,
                            display: "none",
                        }}
                        className="logo-tag"
                    >
                        Catalog
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav
                    className="nav-desktop"
                    style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                    {NAV_LINKS.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    fontSize: "14px",
                                    fontWeight: active ? 700 : 500,
                                    color: active ? COLORS.clayDeep : COLORS.ink,
                                    padding: "8px 14px",
                                    borderRadius: "2px",
                                    textDecoration: "none",
                                    transition: "color 150ms",
                                    position: "relative",
                                }}
                            >
                                {link.label}
                                {active && (
                                    <span
                                        style={{
                                            position: "absolute",
                                            left: "14px",
                                            right: "14px",
                                            bottom: "2px",
                                            height: "2px",
                                            background: COLORS.clay,
                                            borderRadius: "1px",
                                        }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right side */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger style={{ outline: "none" }}>
                                <Avatar
                                    style={{
                                        height: "38px",
                                        width: "38px",
                                        border: `2px solid ${COLORS.border}`,
                                    }}
                                >
                                    <AvatarImage src="https://i.ibb.co/4K27t1f/user.png" />
                                    <AvatarFallback
                                        style={{
                                            background: COLORS.ink,
                                            color: COLORS.cream,
                                            fontFamily: FONT_SERIF,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {session.user?.name?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                style={{
                                    width: "220px",
                                    border: `1px solid ${COLORS.border}`,
                                    borderRadius: "2px",
                                }}
                            >
                                <DropdownMenuLabel
                                    style={{ fontFamily: FONT_SERIF, fontSize: "14px", color: COLORS.ink }}
                                >
                                    {session.user?.name || "My Account"}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link
                                        href={`/dashboard/${userRole}`}
                                        style={{ fontSize: "13.5px", cursor: "pointer" }}
                                    >
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={() => signOut()}
                                    style={{ color: COLORS.clayDeep, fontSize: "13.5px", cursor: "pointer" }}
                                >
                                    <LogOut style={{ marginRight: "8px", height: "14px", width: "14px" }} />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link
                            href="/login"
                            style={{
                                fontSize: "13.5px",
                                fontWeight: 600,
                                color: COLORS.ink,
                                border: `1.5px solid ${COLORS.ink}`,
                                borderRadius: "2px",
                                padding: "8px 18px",
                                textDecoration: "none",
                            }}
                        >
                            Login
                        </Link>
                    )}

                    {/* Mobile toggle */}
                    <button
                        type="button"
                        className="nav-mobile-toggle"
                        onClick={() => setMobileOpen((v) => !v)}
                        style={{
                            display: "none",
                            background: "none",
                            border: "none",
                            color: COLORS.ink,
                            cursor: "pointer",
                            padding: "4px",
                        }}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <nav
                    style={{
                        borderTop: `1px solid ${COLORS.border}`,
                        background: COLORS.cream,
                        padding: "12px 28px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                    }}
                >
                    {NAV_LINKS.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    fontSize: "15px",
                                    fontWeight: active ? 700 : 500,
                                    color: active ? COLORS.clayDeep : COLORS.ink,
                                    padding: "12px 4px",
                                    borderBottom: `1px solid ${COLORS.border}`,
                                    textDecoration: "none",
                                }}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            )}

            <style>{`
                @media (max-width: 860px) {
                    .nav-desktop { display: none !important; }
                    .nav-mobile-toggle { display: flex !important; }
                }
            `}</style>
        </header>
    );
}