"use client";

import Image from "next/image";
import Link from "next/link";
import img from "@/assets/ext/online-class.jpg";
import { COLORS, FONT_SERIF, FONT_MONO } from "@/components/shared/Designtokens";

const JoinTutor = () => {
    return (
        <section style={{ background: COLORS.ink, padding: "72px 28px" }}>
            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "56px",
                }}
                className="jointutor-row"
            >
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                        style={{
                            position: "relative",
                            borderRadius: "2px",
                            overflow: "hidden",
                            border: "1px solid rgba(255,255,255,0.12)",
                        }}
                    >
                        <Image
                            src={img}
                            alt="Become a Tutor"
                            width={500}
                            height={400}
                            style={{ width: "100%", height: "auto", display: "block" }}
                        />
                    </div>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                        style={{
                            fontFamily: FONT_MONO,
                            fontSize: "11px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: COLORS.clay,
                            fontWeight: 700,
                            marginBottom: "12px",
                        }}
                    >
                        Join the Catalog
                    </div>
                    <h2
                        style={{
                            fontFamily: FONT_SERIF,
                            fontSize: "clamp(26px, 3.4vw, 38px)",
                            fontWeight: 700,
                            color: "#FFFDF8",
                            margin: "0 0 16px 0",
                            lineHeight: 1.15,
                        }}
                    >
                        You can become a great tutor too.
                    </h2>
                    <p style={{ fontSize: "15px", lineHeight: 1.6, color: "#AEB6C4", margin: "0 0 28px 0" }}>
                        Empower students with your knowledge. Teach online or in-person, build your career, and get
                        paid for doing what you love.
                    </p>
                    <Link
                        href="/tutor-signup"
                        style={{
                            display: "inline-block",
                            background: COLORS.clay,
                            color: "#FFFDF8",
                            borderRadius: "2px",
                            padding: "13px 28px",
                            fontSize: "14px",
                            fontWeight: 600,
                            textDecoration: "none",
                        }}
                    >
                        Join as a Tutor
                    </Link>
                </div>
            </div>

            <style>{`
                @media (max-width: 760px) {
                    .jointutor-row { flex-direction: column !important; }
                }
            `}</style>
        </section>
    );
};

export default JoinTutor;