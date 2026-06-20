"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { COLORS, FONT_SERIF, FONT_MONO } from "@/components/shared/Designtokens";
import professor from "@/assets/usersreview/senior-male-professor.jpg";
import tutor1 from "@/assets/usersreview/tutor-1.jpg";
import girl1 from "@/assets/usersreview/girl.jpg";
import boy2 from "@/assets/usersreview/boy2.jpg";
import p1 from "@/assets/usersreview/p1.jpg";

const REVIEWS = [
    {
        name: "Emily R.",
        role: "Student",
        image: girl1,
        review: "TutorLink made it so easy to find a tutor for my calculus class. I improved my grades in just a few weeks!",
        rating: 5,
    },
    {
        name: "David L.",
        role: "Tutor",
        image: professor,
        review: "I love teaching on TutorLink. The platform helps me reach students who really need my expertise.",
        rating: 5,
    },
    {
        name: "Salah M.",
        role: "Parent",
        image: p1,
        review: "As a parent, I'm impressed with how simple and safe TutorLink is. Booking sessions takes just a few clicks.",
        rating: 4,
    },
    {
        name: "Liam H.",
        role: "Student",
        image: boy2,
        review: "TutorLink helped me finally understand physics. My confidence has skyrocketed!",
        rating: 5,
    },
    {
        name: "Robart N.",
        role: "Tutor",
        image: tutor1,
        review: "The scheduling tools and communication system make teaching here a breeze.",
        rating: 5,
    },
];

function StarRow({ count }: { count: number }) {
    return (
        <div style={{ display: "flex", gap: "2px", marginTop: "4px" }}>
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={13}
                    fill={i < count ? COLORS.clay : "transparent"}
                    color={i < count ? COLORS.clay : COLORS.border}
                />
            ))}
        </div>
    );
}

const Testimonials = () => {
    const [start, setStart] = useState(0);
    const visible = 3;

    useEffect(() => {
        const interval = setInterval(() => {
            setStart((s) => (s + 1) % REVIEWS.length);
        }, 4500);
        return () => clearInterval(interval);
    }, []);

    const cards = Array.from({ length: visible }, (_, i) => REVIEWS[(start + i) % REVIEWS.length]);

    return (
        <section style={{ background: COLORS.ink, padding: "72px 28px" }}>
            <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
                <div
                    style={{
                        fontFamily: FONT_MONO,
                        fontSize: "11px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: COLORS.clay,
                        fontWeight: 700,
                        marginBottom: "10px",
                        textAlign: "center",
                    }}
                >
                    From the Catalog
                </div>
                <h2
                    style={{
                        fontFamily: FONT_SERIF,
                        fontSize: "clamp(26px, 3vw, 36px)",
                        fontWeight: 700,
                        color: "#FFFDF8",
                        textAlign: "center",
                        margin: "0 0 48px 0",
                    }}
                >
                    What our users say
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "20px",
                    }}
                    className="testimonial-grid"
                >
                    {cards.map((t, i) => (
                        <div
                            key={`${t.name}-${i}`}
                            style={{
                                background: "#FFFDF8",
                                borderRadius: "2px",
                                padding: "26px 22px",
                            }}
                        >
                            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#4A4438", margin: "0 0 18px 0" }}>
                                “{t.review}”
                            </p>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <Image
                                    src={t.image}
                                    alt={t.name}
                                    width={40}
                                    height={40}
                                    style={{ borderRadius: "2px", objectFit: "cover" }}
                                />
                                <div>
                                    <div style={{ fontFamily: FONT_SERIF, fontSize: "14px", fontWeight: 600, color: COLORS.ink }}>
                                        {t.name}
                                    </div>
                                    <div style={{ fontSize: "12px", color: COLORS.warmGray }}>{t.role}</div>
                                </div>
                            </div>
                            <StarRow count={t.rating} />
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 860px) {
                    .testimonial-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default Testimonials;