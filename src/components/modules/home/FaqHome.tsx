"use client";

import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { COLORS, FONT_SERIF, FONT_MONO } from "@/components/shared/Designtokens";

const FAQ_ITEMS = [
    {
        q: "How do I book a tutor on TutorLink?",
        a: "Browse available tutors on the “Browse Tutors” page, filter by subject or availability, and choose a time slot. Confirm your booking, and your session will appear in your dashboard.",
    },
    {
        q: "What roles are available on TutorLink?",
        a: "TutorLink supports three roles: Students, Tutors, and Admins. Your role is assigned during registration and controls your dashboard features.",
    },
    {
        q: "How do tutors set their availability?",
        a: "Tutors can set their available time slots from their dashboard. Only those times are shown to students when booking.",
    },
    {
        q: "Can I cancel a booking?",
        a: "Yes, students can cancel bookings from the dashboard before the session starts. Tutors will be notified.",
    },
];

const FaqHome = () => {
    return (
        <section style={{ background: COLORS.parchment, padding: "72px 28px" }}>
            <div style={{ maxWidth: "820px", margin: "0 auto" }}>
                <div
                    style={{
                        fontFamily: FONT_MONO,
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: COLORS.clayDeep,
                        fontWeight: 700,
                        marginBottom: "10px",
                        textAlign: "center",
                    }}
                >
                    Index
                </div>
                <h2
                    style={{
                        fontFamily: FONT_SERIF,
                        fontSize: "clamp(26px, 3vw, 36px)",
                        fontWeight: 700,
                        color: COLORS.ink,
                        textAlign: "center",
                        margin: "0 0 8px 0",
                    }}
                >
                    Wherever you want to learn
                </h2>
                <p style={{ textAlign: "center", color: COLORS.warmGray, fontSize: "15px", margin: "0 0 40px 0" }}>
                    Wherever you are on your learning journey, TutorLink can help.
                </p>

                <Accordion type="single" collapsible>
                    {FAQ_ITEMS.map((item, i) => (
                        <AccordionItem
                            key={i}
                            value={`item-${i}`}
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
                            <AccordionContent style={{ fontSize: "14.5px", lineHeight: 1.6, color: "#4A4438" }}>
                                {item.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div style={{ textAlign: "center", marginTop: "32px" }}>
                    <Link
                        href="/faq"
                        style={{
                            fontSize: "13.5px",
                            fontWeight: 600,
                            color: COLORS.clayDeep,
                            textDecoration: "underline",
                        }}
                    >
                        View the full catalog of questions →
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FaqHome;