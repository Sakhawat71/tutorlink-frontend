"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { COLORS, FONT_SERIF, FONT_MONO } from "@/components/shared/Designtokens";

const Banner = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const q = query.trim();
        router.push(q ? `/tutors?search=${encodeURIComponent(q)}` : "/tutors");
    };

    return (
        <section
            style={{
                background: `linear-gradient(180deg, #FFFDF8 0%, ${COLORS.parchment} 100%)`,
                borderBottom: `1px solid ${COLORS.border}`,
                padding: "72px 28px 64px",
            }}
        >
            <div style={{ maxWidth: "780px", margin: "0 auto", textAlign: "center" }}>
                <div
                    style={{
                        fontFamily: FONT_MONO,
                        fontSize: "11px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: COLORS.clayDeep,
                        fontWeight: 700,
                        marginBottom: "14px",
                    }}
                >
                    Volume I — Find Your Tutor
                </div>
                <h1
                    style={{
                        fontFamily: FONT_SERIF,
                        fontSize: "clamp(34px, 5vw, 54px)",
                        fontWeight: 700,
                        color: COLORS.ink,
                        margin: "0 0 18px 0",
                        lineHeight: 1.08,
                        letterSpacing: "-0.01em",
                    }}
                >
                    Find your perfect tutor, today.
                </h1>
                <p
                    style={{
                        fontSize: "16px",
                        color: COLORS.warmGray,
                        maxWidth: "560px",
                        margin: "0 auto 36px",
                        lineHeight: 1.6,
                    }}
                >
                    Connect with qualified tutors for any subject or grade level, anytime, anywhere — browse the
                    full catalog and book in minutes.
                </p>

                <form
                    onSubmit={handleSearch}
                    style={{
                        display: "flex",
                        gap: "8px",
                        maxWidth: "560px",
                        margin: "0 auto",
                        background: "#FFFDF8",
                        border: `1.5px solid ${COLORS.ink}`,
                        borderRadius: "2px",
                        padding: "6px",
                    }}
                >
                    <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
                        <Search size={17} color={COLORS.warmGray} style={{ position: "absolute", left: "12px" }} />
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by subject, grade, or tutor name"
                            style={{
                                width: "100%",
                                border: "none",
                                outline: "none",
                                background: "transparent",
                                padding: "10px 10px 10px 38px",
                                fontSize: "14.5px",
                                color: COLORS.ink,
                            }}
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            background: COLORS.clay,
                            color: "#FFFDF8",
                            border: "none",
                            borderRadius: "2px",
                            padding: "0 22px",
                            fontSize: "14px",
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Search
                    </button>
                </form>

                {!session && (
                    <div
                        style={{
                            marginTop: "28px",
                            display: "flex",
                            gap: "12px",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <Link
                            href="/student-signup"
                            style={{
                                background: COLORS.ink,
                                color: "#FFFDF8",
                                borderRadius: "2px",
                                padding: "12px 26px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textDecoration: "none",
                            }}
                        >
                            Find a Tutor
                        </Link>
                        <Link
                            href="/tutor-signup"
                            style={{
                                background: "transparent",
                                color: COLORS.ink,
                                border: `1.5px solid ${COLORS.ink}`,
                                borderRadius: "2px",
                                padding: "12px 26px",
                                fontSize: "14px",
                                fontWeight: 600,
                                textDecoration: "none",
                            }}
                        >
                            Become a Tutor
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Banner;