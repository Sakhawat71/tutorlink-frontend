"use client";

import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { COLORS, FONT_SERIF, FONT_MONO } from "@/components/shared/Designtokens";

const PowerUpSection = () => {
    return (
        <section
            style={{
                background: "#FFFDF8",
                padding: "72px 28px",
                borderTop: `1px solid ${COLORS.border}`,
            }}
        >
            <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
                <div
                    style={{
                        width: "56px",
                        height: "56px",
                        margin: "0 auto 22px",
                        borderRadius: "2px",
                        background: COLORS.ink,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: COLORS.parchment,
                    }}
                >
                    <CalendarClock size={26} />
                </div>
                <div
                    style={{
                        fontFamily: FONT_MONO,
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: COLORS.clayDeep,
                        fontWeight: 700,
                        marginBottom: "12px",
                    }}
                >
                    Scheduling, simplified
                </div>
                <h2
                    style={{
                        fontFamily: FONT_SERIF,
                        fontSize: "clamp(26px, 3.2vw, 36px)",
                        fontWeight: 700,
                        color: COLORS.ink,
                        margin: "0 0 16px 0",
                    }}
                >
                    Power up your scheduling
                </h2>
                <p style={{ fontSize: "15px", color: COLORS.warmGray, lineHeight: 1.6, margin: "0 0 32px 0" }}>
                    Let students book with you instantly. Make scheduling seamless and stress-free with TutorLink.
                </p>
                <Link
                    href="/tutors"
                    style={{
                        display: "inline-block",
                        background: COLORS.clay,
                        color: "#FFFDF8",
                        borderRadius: "2px",
                        padding: "13px 30px",
                        fontSize: "14px",
                        fontWeight: 600,
                        textDecoration: "none",
                    }}
                >
                    Get Started
                </Link>
            </div>
        </section>
    );
};

export default PowerUpSection;