"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
    Star,
    MapPin,
    Clock,
    Check,
    GraduationCap,
    BookOpen,
    // User,
} from "lucide-react";
import { ITutor } from "@/types/tutor.type";
import { COLORS, FONT_SERIF, FONT_MONO, FONTS_IMPORT } from "@/components/shared/Designtokens";
import { classNum, initials } from "@/components/modules/browseTutors/Tutorcatalog.constants";

interface TutorDetailsProps {
    tutor: ITutor;
}

export const TutorDetailsComponent = ({ tutor }: TutorDetailsProps) => {
    const session = useSession();
    const user = session?.data?.user;

    const rating = 4.9;
    const reviews = 24;
    const responseTime = "2 hours";
    const primarySubject = tutor.subjectList[0] || "General";

    const availabilityByDay = tutor.availability.reduce((acc, slot) => {
        if (!acc[slot.day]) acc[slot.day] = [];
        acc[slot.day].push(`${slot.startTime} – ${slot.endTime}`);
        return acc;
    }, {} as Record<string, string[]>);

    return (
        <div style={{ minHeight: "100vh", background: "#FFFDF8" }}>
            <style>{`
                ${FONTS_IMPORT}
                @media (max-width: 900px) {
                    .tutor-details-grid { flex-direction: column !important; }
                    .tutor-sidebar { width: 100% !important; position: static !important; }
                }
            `}</style>

            {/* Header strip */}
            <div
                style={{
                    background: `linear-gradient(180deg, #FFFDF8 0%, ${COLORS.parchment} 100%)`,
                    borderBottom: `1px solid ${COLORS.border}`,
                    padding: "32px 28px",
                }}
            >
                <div
                    style={{
                        maxWidth: "1100px",
                        margin: "0 auto",
                        fontFamily: FONT_MONO,
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: COLORS.clayDeep,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <span>{classNum(primarySubject)}</span>
                    <span style={{ color: COLORS.warmGray }}>·</span>
                    <span style={{ color: COLORS.warmGray }}>Tutor Profile</span>
                </div>
            </div>

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    padding: "40px 28px 80px",
                    display: "flex",
                    gap: "40px",
                }}
                className="tutor-details-grid"
            >
                {/* ---------- LEFT: profile card ---------- */}
                <aside style={{ width: "300px", flexShrink: 0 }} className="tutor-sidebar">
                    <div
                        style={{
                            position: "sticky",
                            top: "24px",
                            background: "#FFFDF8",
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: "2px",
                            padding: "28px 24px",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div
                                style={{
                                    position: "relative",
                                    width: "104px",
                                    height: "104px",
                                    borderRadius: "3px",
                                    overflow: "hidden",
                                    background: `linear-gradient(135deg, ${COLORS.ink}, #34507e)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: "16px",
                                    border: `2px solid ${COLORS.border}`,
                                }}
                            >
                                {tutor.profileImage ? (
                                    <Image
                                        src={tutor.profileImage}
                                        alt={tutor.name}
                                        fill
                                        sizes="104px"
                                        style={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <span
                                        style={{
                                            fontFamily: FONT_SERIF,
                                            fontSize: "34px",
                                            fontWeight: 600,
                                            color: "#FAF7F0",
                                        }}
                                    >
                                        {initials(tutor.name)}
                                    </span>
                                )}
                            </div>

                            <h1
                                style={{
                                    fontFamily: FONT_SERIF,
                                    fontSize: "22px",
                                    fontWeight: 700,
                                    color: COLORS.ink,
                                    margin: "0 0 8px 0",
                                    textAlign: "center",
                                }}
                            >
                                {tutor.name}
                            </h1>

                            <div
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    background: COLORS.parchmentDeep,
                                    border: `1px solid ${COLORS.border}`,
                                    borderRadius: "2px",
                                    padding: "5px 12px",
                                    marginBottom: "18px",
                                }}
                            >
                                <Star size={13} fill={COLORS.clay} color={COLORS.clay} />
                                <span style={{ fontSize: "13px", fontWeight: 700, color: COLORS.ink }}>
                                    {rating.toFixed(1)}
                                </span>
                                <span style={{ fontSize: "12px", color: COLORS.warmGray }}>({reviews})</span>
                            </div>

                            <div
                                style={{
                                    fontFamily: FONT_SERIF,
                                    fontSize: "30px",
                                    fontWeight: 700,
                                    color: COLORS.ink,
                                    lineHeight: 1,
                                }}
                            >
                                ${tutor.hourlyRate}
                            </div>
                            <div style={{ fontSize: "12.5px", color: COLORS.warmGray, marginBottom: "22px" }}>
                                per hour
                            </div>

                            {/* CTA */}
                            <div style={{ width: "100%" }}>
                                {user && user?.role === "student" ? (
                                    <Link
                                        href={`/tutors/${tutor.id}/booking`}
                                        style={{
                                            display: "block",
                                            textAlign: "center",
                                            background: COLORS.clay,
                                            color: "#FFFDF8",
                                            borderRadius: "2px",
                                            padding: "13px",
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            textDecoration: "none",
                                        }}
                                    >
                                        Book a Lesson
                                    </Link>
                                ) : (
                                    <p
                                        style={{
                                            fontSize: "12.5px",
                                            color: COLORS.clayDeep,
                                            textAlign: "center",
                                            background: "#FCEFEA",
                                            border: `1px solid ${COLORS.border}`,
                                            borderRadius: "2px",
                                            padding: "10px",
                                            margin: 0,
                                        }}
                                    >
                                        Only registered students can book tutors.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* stat list */}
                        <div
                            style={{
                                marginTop: "24px",
                                paddingTop: "20px",
                                borderTop: `1px solid ${COLORS.border}`,
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                            }}
                        >
                            <StatRow
                                icon={<MapPin size={15} color={COLORS.clayDeep} />}
                                label={tutor.location === "ONLINE" ? "Online Lessons" : "In-Person Lessons"}
                            />
                            {tutor.experience !== undefined && (
                                <StatRow
                                    icon={<Clock size={15} color={COLORS.clayDeep} />}
                                    label={`${tutor.experience}+ years of experience`}
                                />
                            )}
                            <StatRow
                                icon={<Check size={15} color={COLORS.forest} />}
                                label="Background checked"
                            />
                            <StatRow
                                icon={<GraduationCap size={15} color={COLORS.clayDeep} />}
                                label={`Teaches ${tutor.subjectList.length} subject${tutor.subjectList.length === 1 ? "" : "s"}`}
                            />
                            <StatRow
                                icon={<Clock size={15} color={COLORS.clayDeep} />}
                                label={`Responds in ~${responseTime}`}
                            />
                        </div>
                    </div>
                </aside>

                {/* ---------- RIGHT: details ---------- */}
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "24px" }}>
                    <Section title={`About ${tutor.name.split(" ")[0]}`}>
                        <p style={{ fontSize: "14.5px", lineHeight: 1.7, color: "#4A4438", margin: 0, whiteSpace: "pre-line" }}>
                            {tutor.bio}
                        </p>
                    </Section>

                    <Section title="Subjects Taught">
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                            {tutor.subjectList.map((subject) => (
                                <span
                                    key={subject}
                                    style={{
                                        fontSize: "12.5px",
                                        fontWeight: 600,
                                        padding: "6px 14px",
                                        borderRadius: "2px",
                                        border: `1px solid ${COLORS.border}`,
                                        background: COLORS.parchmentDeep,
                                        color: COLORS.ink,
                                    }}
                                >
                                    {subject}
                                </span>
                            ))}
                        </div>
                    </Section>

                    <Section title="Availability">
                        {Object.keys(availabilityByDay).length === 0 ? (
                            <p style={{ fontSize: "14px", color: COLORS.warmGray, margin: 0 }}>
                                No availability slots have been set yet.
                            </p>
                        ) : (
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                                    gap: "14px",
                                }}
                            >
                                {Object.entries(availabilityByDay).map(([day, times]) => (
                                    <div
                                        key={day}
                                        style={{
                                            border: `1px solid ${COLORS.border}`,
                                            borderRadius: "2px",
                                            padding: "14px 16px",
                                            background: COLORS.parchment,
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontFamily: FONT_SERIF,
                                                fontSize: "14.5px",
                                                fontWeight: 600,
                                                color: COLORS.ink,
                                                marginBottom: "8px",
                                            }}
                                        >
                                            {day}
                                        </div>
                                        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "5px" }}>
                                            {times.map((time, i) => (
                                                <li
                                                    key={i}
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                        fontSize: "12.5px",
                                                        color: COLORS.forest,
                                                        fontFamily: FONT_MONO,
                                                    }}
                                                >
                                                    <Clock size={12} />
                                                    {time}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Section>

                    <Section title="Reviews">
                        <div style={{ textAlign: "center", padding: "36px 0" }}>
                            <BookOpen size={36} color={COLORS.border} style={{ marginBottom: "12px" }} />
                            <p style={{ fontSize: "14px", color: COLORS.warmGray, margin: 0 }}>No reviews yet</p>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
};

function StatRow({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "#4A4438" }}>
            {icon}
            <span>{label}</span>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section
            style={{
                background: "#FFFDF8",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "2px",
                padding: "26px 28px",
            }}
        >
            <h2
                style={{
                    fontFamily: FONT_SERIF,
                    fontSize: "18px",
                    fontWeight: 700,
                    color: COLORS.ink,
                    margin: "0 0 16px 0",
                }}
            >
                {title}
            </h2>
            {children}
        </section>
    );
}