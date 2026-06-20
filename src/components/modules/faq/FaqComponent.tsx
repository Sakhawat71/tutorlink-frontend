"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { COLORS, FONT_SERIF, FONT_MONO } from "@/components/shared/Designtokens";

const FAQ_SECTIONS = [
    {
        category: "Booking",
        items: [
            {
                q: "How do I book a tutor on TutorLink?",
                a: "As a student, you can browse available tutors on the “Browse Tutors” page, filter by subject or availability, and select a tutor. Then, choose an available time slot and confirm your booking. You'll see your scheduled sessions in the “My Bookings” section of your dashboard.",
            },
            {
                q: "Can I cancel a booking?",
                a: "Yes, students can cancel bookings from the “My Bookings” page in their dashboard, provided it's before the scheduled start time. Tutors will be notified, and their availability will update accordingly.",
            },
            {
                q: "What happens if a tutor isn't available?",
                a: "If a tutor's slots are booked or they haven't set availability, they won't appear as an option during booking. You can filter tutors by availability to find someone who fits your schedule.",
            },
        ],
    },
    {
        category: "Accounts & Roles",
        items: [
            {
                q: "What roles are available on TutorLink?",
                a: "TutorLink supports three roles: Students (who book tutors), Tutors (who offer sessions), and Admins (who manage tutors and oversee the platform). Your role is assigned during registration and determines your dashboard features.",
            },
            {
                q: "How do tutors set their availability?",
                a: "If you're a tutor, log in and go to the “Availability” section in your dashboard. There, you can set your available days and time slots. Students will only see and book times you've marked as free.",
            },
        ],
    },
    {
        category: "Trust & Security",
        items: [
            {
                q: "How does TutorLink ensure security?",
                a: "We use secure authentication with email/password and social login options (e.g., Google) via NextAuth.js. All sensitive data is encrypted, and role-based access ensures users only see what's relevant to them.",
            },
        ],
    },
];

export function FaqComponent() {
    return (
        <div style={{ minHeight: "100vh", background: "#FFFDF8" }}>
            <section
                style={{
                    background: `linear-gradient(180deg, #FFFDF8 0%, ${COLORS.parchment} 100%)`,
                    borderBottom: `1px solid ${COLORS.border}`,
                    padding: "64px 28px 48px",
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
                    The Full Index
                </div>
                <h1
                    style={{
                        fontFamily: FONT_SERIF,
                        fontSize: "clamp(30px, 4vw, 44px)",
                        fontWeight: 700,
                        color: COLORS.ink,
                        margin: "0 0 14px 0",
                    }}
                >
                    Frequently Asked Questions
                </h1>
                <p style={{ fontSize: "15px", color: COLORS.warmGray, maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
                    Everything you need to know about booking, accounts, and how TutorLink keeps things secure.
                </p>
            </section>

            <section style={{ padding: "56px 28px 80px" }}>
                <div style={{ maxWidth: "760px", margin: "0 auto" }}>
                    {FAQ_SECTIONS.map((section) => (
                        <div key={section.category} style={{ marginBottom: "44px" }}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                    gap: "10px",
                                    marginBottom: "18px",
                                    paddingBottom: "10px",
                                    borderBottom: `1px solid ${COLORS.border}`,
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: FONT_MONO,
                                        fontSize: "11px",
                                        color: COLORS.clayDeep,
                                        fontWeight: 700,
                                        letterSpacing: "0.06em",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    §
                                </span>
                                <h2
                                    style={{
                                        fontFamily: FONT_SERIF,
                                        fontSize: "20px",
                                        fontWeight: 700,
                                        color: COLORS.ink,
                                        margin: 0,
                                    }}
                                >
                                    {section.category}
                                </h2>
                            </div>

                            <Accordion type="single" collapsible>
                                {section.items.map((item, i) => (
                                    <AccordionItem
                                        key={i}
                                        value={`${section.category}-${i}`}
                                        style={{ borderBottom: `1px solid ${COLORS.border}` }}
                                    >
                                        <AccordionTrigger
                                            style={{
                                                fontFamily: FONT_SERIF,
                                                fontSize: "16px",
                                                fontWeight: 600,
                                                color: COLORS.ink,
                                            }}
                                        >
                                            {item.q}
                                        </AccordionTrigger>
                                        <AccordionContent style={{ fontSize: "14.5px", lineHeight: 1.65, color: "#4A4438" }}>
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}

                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "16px",
                            padding: "32px 24px",
                            background: COLORS.parchment,
                            border: `1px dashed ${COLORS.border}`,
                            borderRadius: "2px",
                        }}
                    >
                        <p style={{ fontFamily: FONT_SERIF, fontSize: "17px", color: COLORS.ink, margin: "0 0 6px 0" }}>
                            Still have questions?
                        </p>
                        <p style={{ fontSize: "13.5px", color: COLORS.warmGray, margin: 0 }}>
                            Reach out at{" "}
                            <a href="mailto:support@tutorlink.com" style={{ color: COLORS.clayDeep, fontWeight: 600 }}>
                                support@tutorlink.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}