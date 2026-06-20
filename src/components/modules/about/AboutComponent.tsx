"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COLORS, FONT_SERIF, FONT_MONO } from "@/components/shared/Designtokens";

const TEAM = [
    {
        name: "Jane Doe",
        role: "Founder & CEO",
        initials: "JD",
        bio: "Jane is passionate about education and technology, driving TutorLink's vision to revolutionize tutoring.",
        avatar: "https://i.ibb.co.com/4K27t1f/user.png",
    },
    {
        name: "John Miles",
        role: "Lead Developer",
        initials: "JM",
        bio: "John builds the tech that powers TutorLink, ensuring a smooth experience for all users.",
        avatar: "https://i.ibb.co.com/4K27t1f/user.png",
    },
    {
        name: "Emily Stone",
        role: "Education Specialist",
        initials: "ES",
        bio: "Emily ensures our tutors meet high standards and students get the best learning support.",
        avatar: "https://i.ibb.co.com/4K27t1f/user.png",
    },
];

const STORIES = [
    {
        quote: "TutorLink helped me find a math tutor who turned my grades around. I went from struggling to acing my exams in just two months!",
        author: "Sarah K., Student",
    },
    {
        quote: "As a tutor, I love how easy it is to manage my schedule and connect with students who need my help. TutorLink has been a game-changer.",
        author: "Michael T., Tutor",
    },
];

export default function AboutUs() {
    return (
        <div style={{ minHeight: "100vh", background: "#FFFDF8" }}>
            {/* Hero */}
            <section
                style={{
                    background: `linear-gradient(180deg, #FFFDF8 0%, ${COLORS.parchment} 100%)`,
                    borderBottom: `1px solid ${COLORS.border}`,
                    padding: "72px 28px 56px",
                    textAlign: "center",
                }}
            >
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
                    Foreword
                </div>
                <h1
                    style={{
                        fontFamily: FONT_SERIF,
                        fontSize: "clamp(32px, 4.5vw, 48px)",
                        fontWeight: 700,
                        color: COLORS.ink,
                        margin: "0 0 16px 0",
                        lineHeight: 1.1,
                    }}
                >
                    About TutorLink
                </h1>
                <p style={{ fontSize: "16px", color: COLORS.warmGray, maxWidth: "560px", margin: "0 auto", lineHeight: 1.6 }}>
                    Connecting students with expert tutors to unlock their full potential.
                </p>
            </section>

            {/* Mission */}
            <section style={{ padding: "64px 28px", textAlign: "center" }}>
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
                    Our Mission
                </div>
                <h2
                    style={{
                        fontFamily: FONT_SERIF,
                        fontSize: "clamp(24px, 3vw, 32px)",
                        fontWeight: 700,
                        color: COLORS.ink,
                        margin: "0 0 20px 0",
                    }}
                >
                    Bridging the gap between students and great teaching
                </h2>
                <p style={{ fontSize: "15px", color: "#4A4438", maxWidth: "720px", margin: "0 auto", lineHeight: 1.7 }}>
                    At TutorLink, our goal is to bridge the gap between students seeking knowledge and qualified
                    tutors ready to inspire. We aim to provide a seamless, accessible platform where learning
                    thrives, empowering students to achieve academic success and tutors to share their expertise
                    effectively.
                </p>
            </section>

            {/* Team */}
            <section style={{ background: COLORS.parchment, padding: "64px 28px", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
                <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                    <h2
                        style={{
                            fontFamily: FONT_SERIF,
                            fontSize: "clamp(24px, 3vw, 32px)",
                            fontWeight: 700,
                            color: COLORS.ink,
                            textAlign: "center",
                            margin: "0 0 44px 0",
                        }}
                    >
                        Meet Our Team
                    </h2>
                    <div
                        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
                        className="team-grid"
                    >
                        {TEAM.map((m) => (
                            <div
                                key={m.name}
                                style={{
                                    background: "#FFFDF8",
                                    border: `1px solid ${COLORS.border}`,
                                    borderRadius: "2px",
                                    padding: "32px 24px",
                                    textAlign: "center",
                                }}
                            >
                                <Avatar style={{ width: "72px", height: "72px", margin: "0 auto 16px" }}>
                                    <AvatarImage src={m.avatar} />
                                    <AvatarFallback
                                        style={{
                                            background: COLORS.ink,
                                            color: COLORS.parchment,
                                            fontFamily: FONT_SERIF,
                                            fontWeight: 600,
                                            fontSize: "20px",
                                        }}
                                    >
                                        {m.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <h3 style={{ fontFamily: FONT_SERIF, fontSize: "18px", fontWeight: 600, color: COLORS.ink, margin: "0 0 4px 0" }}>
                                    {m.name}
                                </h3>
                                <p style={{ fontSize: "12.5px", color: COLORS.clayDeep, fontWeight: 600, margin: "0 0 14px 0" }}>
                                    {m.role}
                                </p>
                                <p style={{ fontSize: "13.5px", color: "#4A4438", lineHeight: 1.6, margin: 0 }}>
                                    {m.bio}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision / CTA */}
            <section style={{ background: COLORS.ink, padding: "64px 28px", textAlign: "center" }}>
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
                    Our Vision
                </div>
                <h2
                    style={{
                        fontFamily: FONT_SERIF,
                        fontSize: "clamp(24px, 3vw, 32px)",
                        fontWeight: 700,
                        color: "#FFFDF8",
                        margin: "0 0 18px 0",
                    }}
                >
                    A world where quality education is one click away
                </h2>
                <p style={{ fontSize: "15px", color: "#AEB6C4", maxWidth: "640px", margin: "0 auto 32px", lineHeight: 1.7 }}>
                    We`re committed to expanding TutorLink`s reach by adding more subjects, integrating advanced
                    learning tools, and connecting students and tutors globally.
                </p>
                <Link
                    href="/student-signup"
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
                    Join Us Today
                </Link>
            </section>


            {/* Success Stories */}
            <section style={{ padding: "64px 28px" }}>
                <div style={{ maxWidth: "920px", margin: "0 auto" }}>
                    <h2
                        style={{
                            fontFamily: FONT_SERIF,
                            fontSize: "clamp(24px, 3vw, 32px)",
                            fontWeight: 700,
                            color: COLORS.ink,
                            textAlign: "center",
                            margin: "0 0 44px 0",
                        }}
                    >
                        Success Stories
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className="stories-grid">
                        {STORIES.map((s, i) => (
                            <div
                                key={i}
                                style={{
                                    background: COLORS.parchment,
                                    border: `1px solid ${COLORS.border}`,
                                    borderRadius: "2px",
                                    padding: "28px 24px",
                                }}
                            >
                                <p style={{ fontFamily: FONT_SERIF, fontSize: "16px", fontStyle: "italic", color: COLORS.ink, lineHeight: 1.6, margin: "0 0 16px 0" }}>
                                    “{s.quote}”
                                </p>
                                <p style={{ fontSize: "13px", fontWeight: 600, color: COLORS.clayDeep, margin: 0 }}>
                                    — {s.author}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <style>{`
                @media (max-width: 860px) {
                    .team-grid { grid-template-columns: 1fr !important; }
                    .stories-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}