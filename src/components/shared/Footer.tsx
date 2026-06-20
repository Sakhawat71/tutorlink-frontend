import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { COLORS, FONT_SERIF, FONT_MONO } from "@/components/shared/Designtokens";

const EXPLORE_LINKS = [
    { label: "Home", href: "/" },
    { label: "Browse Tutors", href: "/tutors" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "About Us", href: "/about" },
];

const SUPPORT_LINKS = [
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
];

const SOCIALS = [
    { Icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
    { Icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: FaGithub, href: "https://github.com/Sakhawat71", label: "GitHub" },
    { Icon: FaLinkedin, href: "https://linkedin.com/in/s3h", label: "LinkedIn" },
];

const Footer = () => {
    return (
        <footer
            style={{
                background: COLORS.ink,
                color: "#D9DEE8",
                paddingTop: "56px",
            }}
        >
            <div
                style={{
                    maxWidth: "1240px",
                    margin: "0 auto",
                    padding: "0 28px 40px",
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
                    gap: "40px",
                }}
                className="footer-grid"
            >
                {/* Brand */}
                <div>
                    <div
                        style={{
                            fontFamily: FONT_MONO,
                            fontSize: "10px",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: COLORS.clay,
                            fontWeight: 700,
                            marginBottom: "8px",
                        }}
                    >
                        The Catalog
                    </div>
                    <h2
                        style={{
                            fontFamily: FONT_SERIF,
                            fontSize: "26px",
                            fontWeight: 700,
                            color: "#FFFDF8",
                            margin: "0 0 12px 0",
                        }}
                    >
                        TutorLink
                    </h2>
                    <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "#AEB6C4", maxWidth: "320px", margin: 0 }}>
                        Connecting students with expert tutors for personalized learning — browse the catalog,
                        find your match, and book with confidence.
                    </p>
                </div>

                {/* Explore */}
                <FooterColumn title="Explore" links={EXPLORE_LINKS} />
                {/* Support */}
                <FooterColumn title="Support" links={SUPPORT_LINKS} />

                {/* Social */}
                <div>
                    <h3
                        style={{
                            fontFamily: FONT_SERIF,
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#FFFDF8",
                            marginBottom: "16px",
                        }}
                    >
                        Follow Us
                    </h3>
                    <div style={{ display: "flex", gap: "14px" }}>
                        {SOCIALS.map(({ Icon, href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                target="_blank"
                                aria-label={label}
                                style={{
                                    color: "#AEB6C4",
                                    display: "flex",
                                    width: "32px",
                                    height: "32px",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "2px",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    transition: "all 150ms",
                                }}
                            >
                                <Icon size={15} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <div
                style={{
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    padding: "20px 28px",
                    textAlign: "center",
                    fontSize: "12.5px",
                    color: "#8893A6",
                    fontFamily: FONT_MONO,
                }}
            >
                © {new Date().getFullYear()} TutorLink — All rights reserved.
            </div>

            <style>{`
                @media (max-width: 860px) {
                    .footer-grid { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 540px) {
                    .footer-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </footer>
    );
};

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
    return (
        <div>
            <h3
                style={{
                    fontFamily: FONT_SERIF,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#FFFDF8",
                    marginBottom: "16px",
                }}
            >
                {title}
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {links.map((l) => (
                    <li key={l.href}>
                        <Link
                            href={l.href}
                            style={{ fontSize: "13.5px", color: "#AEB6C4", textDecoration: "none" }}
                        >
                            {l.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Footer;