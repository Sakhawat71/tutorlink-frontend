"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { ITutor } from "@/types/tutor.type";
import { COLORS, classNum, initials } from "./Tutorcatalog.constants";

interface IndexCardProps {
    tutor: ITutor & { rating?: number; reviews?: number };
}

export function IndexCard({ tutor }: IndexCardProps) {
    const [hover, setHover] = useState(false);
    const primarySubject = tutor.subjectList[0] || "General";
    const rating = tutor.rating ?? 4.8;
    const reviews = tutor.reviews ?? 0;

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                position: "relative",
                background: "#FFFDF8",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "2px",
                boxShadow: hover
                    ? "0 14px 28px -10px rgba(27,42,74,0.18), 0 2px 0 rgba(27,42,74,0.04)"
                    : "0 1px 0 rgba(27,42,74,0.04)",
                transform: hover ? "translateY(-3px)" : "translateY(0)",
                transition: "all 220ms cubic-bezier(.2,.8,.2,1)",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "hidden",
            }}
        >
            {/* perforation strip — the signature catalog detail */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "14px",
                    borderRight: `1px dashed ${COLORS.border}`,
                    background:
                        "repeating-linear-gradient(180deg, transparent 0, transparent 10px, " +
                        COLORS.border +
                        " 10px, " +
                        COLORS.border +
                        " 11px)",
                    opacity: 0.5,
                }}
            />

            <div style={{ padding: "22px 22px 18px 32px" }}>
                <div
                    style={{
                        display: "inline-flex",
                        alignItems: "baseline",
                        gap: "6px",
                        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
                        fontSize: "11px",
                        letterSpacing: "0.04em",
                        color: COLORS.clayDeep,
                        marginBottom: "14px",
                    }}
                >
                    <span style={{ fontWeight: 700 }}>{classNum(primarySubject)}</span>
                    <span style={{ color: COLORS.warmGray, textTransform: "uppercase" }}>
                        {tutor.location === "ONLINE" ? "remote" : "on-site"}
                    </span>
                </div>

                <div style={{ display: "flex", gap: "14px", marginBottom: "14px" }}>
                    <div
                        style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "3px",
                            flexShrink: 0,
                            background: `linear-gradient(135deg, ${COLORS.ink}, #34507e)`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#FAF7F0",
                            fontFamily: "'Fraunces', Georgia, serif",
                            fontSize: "20px",
                            fontWeight: 600,
                            overflow: "hidden",
                        }}
                    >
                        {tutor.profileImage ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={tutor.profileImage}
                                alt={tutor.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        ) : (
                            initials(tutor.name)
                        )}
                    </div>
                    <div style={{ minWidth: 0 }}>
                        <h3
                            style={{
                                fontFamily: "'Fraunces', Georgia, serif",
                                fontSize: "19px",
                                fontWeight: 600,
                                color: COLORS.ink,
                                margin: 0,
                                lineHeight: 1.2,
                            }}
                        >
                            {tutor.name}
                        </h3>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "4px" }}>
                            <Star size={13} fill={COLORS.clay} color={COLORS.clay} />
                            <span style={{ fontSize: "13px", color: COLORS.ink, fontWeight: 600 }}>{rating}</span>
                            <span style={{ fontSize: "12px", color: COLORS.warmGray }}>({reviews})</span>
                        </div>
                    </div>
                </div>

                <p
                    style={{
                        fontSize: "14px",
                        lineHeight: 1.55,
                        color: "#4A4438",
                        margin: "0 0 16px 0",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: "63px",
                    }}
                >
                    {tutor.bio}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                    {tutor.subjectList.slice(0, 3).map((s) => (
                        <span
                            key={s}
                            style={{
                                fontSize: "11.5px",
                                padding: "3px 9px",
                                borderRadius: "2px",
                                border: `1px solid ${COLORS.border}`,
                                background: COLORS.parchmentDeep,
                                color: COLORS.ink,
                                fontWeight: 500,
                            }}
                        >
                            {s}
                        </span>
                    ))}
                </div>
            </div>

            <div
                style={{
                    marginTop: "auto",
                    borderTop: `1px solid ${COLORS.border}`,
                    padding: "14px 22px 14px 32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: COLORS.parchmentDeep,
                }}
            >
                <div
                    style={{
                        fontFamily: "'Fraunces', Georgia, serif",
                        fontSize: "20px",
                        fontWeight: 700,
                        color: COLORS.ink,
                        lineHeight: 1,
                    }}
                >
                    ${tutor.hourlyRate}
                    <span style={{ fontSize: "12px", fontWeight: 400, color: COLORS.warmGray }}> /hr</span>
                </div>
                <Link
                    href={`/tutors/${tutor.id}`}
                    style={{
                        background: hover ? COLORS.clayDeep : COLORS.clay,
                        color: "#FFFDF8",
                        border: "none",
                        borderRadius: "2px",
                        padding: "9px 16px",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background 150ms",
                        textDecoration: "none",
                        display: "inline-block",
                    }}
                >
                    View profile
                </Link>
            </div>
        </div>
    );
}