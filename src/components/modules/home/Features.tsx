"use client";

import { Search, ShieldCheck, CreditCard } from "lucide-react";
import { COLORS, FONT_SERIF, FONT_MONO } from "@/components/shared/Designtokens";

const FEATURES = [
    {
        icon: Search,
        num: "01",
        title: "Find Tutors Fast",
        desc: "Browse and book tutors in minutes with subject, schedule, and price filters built for real decisions.",
    },
    {
        icon: CreditCard,
        num: "02",
        title: "Secure Payments",
        desc: "Pay confidently with our encrypted and reliable payment system — every booking is protected end to end.",
    },
    {
        icon: ShieldCheck,
        num: "03",
        title: "Verified Profiles",
        desc: "Every tutor listed in the catalog is vetted for quality, ensuring trustworthy, qualified instruction.",
    },
];

const Features = () => {
    return (
        <section style={{ background: "#FFFDF8", padding: "72px 28px" }}>
            <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
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
                    Why TutorLink
                </div>
                <h2
                    style={{
                        fontFamily: FONT_SERIF,
                        fontSize: "clamp(26px, 3vw, 36px)",
                        fontWeight: 700,
                        color: COLORS.ink,
                        textAlign: "center",
                        margin: "0 0 48px 0",
                    }}
                >
                    Built for finding the right fit
                </h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "24px",
                    }}
                    className="features-grid"
                >
                    {FEATURES.map((f) => {
                        const Icon = f.icon;
                        return (
                            <div
                                key={f.num}
                                style={{
                                    border: `1px solid ${COLORS.border}`,
                                    borderRadius: "2px",
                                    padding: "32px 26px",
                                    background: COLORS.parchment,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "44px",
                                            height: "44px",
                                            borderRadius: "2px",
                                            background: COLORS.ink,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: COLORS.parchment,
                                        }}
                                    >
                                        <Icon size={20} />
                                    </div>
                                    <span
                                        style={{
                                            fontFamily: FONT_MONO,
                                            fontSize: "13px",
                                            color: COLORS.warmGray,
                                            fontWeight: 700,
                                        }}
                                    >
                                        {f.num}
                                    </span>
                                </div>
                                <h3
                                    style={{
                                        fontFamily: FONT_SERIF,
                                        fontSize: "19px",
                                        fontWeight: 600,
                                        color: COLORS.ink,
                                        margin: "0 0 10px 0",
                                    }}
                                >
                                    {f.title}
                                </h3>
                                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#4A4438", margin: 0 }}>
                                    {f.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @media (max-width: 860px) {
                    .features-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    );
};

export default Features;