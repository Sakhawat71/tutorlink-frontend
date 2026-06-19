import React, { useState, useMemo, useEffect } from "react";
import { Search, MapPin, Clock, X, SlidersHorizontal, Star, ChevronDown } from "lucide-react";

/* ---------------------------------------------------------
   MOCK DATA — swap for getTutorProfiles() result in production
--------------------------------------------------------- */
const MOCK_TUTORS = [
    {
        id: "1",
        name: "Dr. Amara Voss",
        profileImage: "",
        bio: "Former physics researcher turned full-time tutor. I specialize in making calculus and mechanics click for students who've been told they're 'not math people.'",
        subjectList: ["Calculus", "Physics", "Linear Algebra"],
        hourlyRate: 48,
        location: "ONLINE",
        experience: 7,
        availability: [
            { day: "Monday", startTime: "16:00", endTime: "20:00" },
            { day: "Wednesday", startTime: "16:00", endTime: "20:00" },
            { day: "Saturday", startTime: "10:00", endTime: "14:00" },
        ],
        rating: 4.9,
        reviews: 132,
    },
    {
        id: "2",
        name: "Marcus Webb",
        profileImage: "",
        bio: "I teach essay writing the way newsrooms teach reporters: structure first, voice second. Worked with 200+ students on college application essays.",
        subjectList: ["English Writing", "SAT Prep", "Debate"],
        hourlyRate: 35,
        location: "ONSITE",
        experience: 4,
        availability: [
            { day: "Tuesday", startTime: "15:00", endTime: "19:00" },
            { day: "Thursday", startTime: "15:00", endTime: "19:00" },
        ],
        rating: 4.7,
        reviews: 64,
    },
    {
        id: "3",
        name: "Priya Nair",
        profileImage: "",
        bio: "Computer science grad student. I tutor intro programming, data structures, and help students debug their actual homework, not toy problems.",
        subjectList: ["Python", "Data Structures", "Algorithms"],
        hourlyRate: 42,
        location: "ONLINE",
        experience: 3,
        availability: [
            { day: "Monday", startTime: "18:00", endTime: "21:00" },
            { day: "Friday", startTime: "14:00", endTime: "18:00" },
            { day: "Sunday", startTime: "12:00", endTime: "16:00" },
        ],
        rating: 5.0,
        reviews: 41,
    },
    {
        id: "4",
        name: "Elliot Furst",
        profileImage: "",
        bio: "20 years teaching high school chemistry before going independent. I focus on building intuition for reactions, not memorization tricks.",
        subjectList: ["Chemistry", "Biology"],
        hourlyRate: 38,
        location: "ONSITE",
        experience: 20,
        availability: [
            { day: "Wednesday", startTime: "09:00", endTime: "12:00" },
            { day: "Saturday", startTime: "09:00", endTime: "13:00" },
        ],
        rating: 4.8,
        reviews: 211,
    },
    {
        id: "5",
        name: "Yuki Tanaka",
        profileImage: "",
        bio: "Conversational and academic Japanese, JLPT prep specialist. I built my own curriculum after years of frustration with textbook-only methods.",
        subjectList: ["Japanese", "JLPT Prep"],
        hourlyRate: 30,
        location: "ONLINE",
        experience: 5,
        availability: [
            { day: "Tuesday", startTime: "17:00", endTime: "21:00" },
            { day: "Saturday", startTime: "08:00", endTime: "12:00" },
        ],
        rating: 4.9,
        reviews: 88,
    },
    {
        id: "6",
        name: "Devon Okafor",
        profileImage: "",
        bio: "Music theory and piano, classically trained at Oberlin. I teach composition fundamentals alongside performance technique.",
        subjectList: ["Piano", "Music Theory"],
        hourlyRate: 45,
        location: "ONSITE",
        experience: 9,
        availability: [
            { day: "Monday", startTime: "14:00", endTime: "18:00" },
            { day: "Thursday", startTime: "14:00", endTime: "18:00" },
        ],
        rating: 4.6,
        reviews: 53,
    },
];

const ALL_SUBJECTS = [...new Set(MOCK_TUTORS.flatMap((t) => t.subjectList))].sort();
const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/* ---------------------------------------------------------
   DESIGN TOKENS
--------------------------------------------------------- */
const COLORS = {
    ink: "#1B2A4A",
    parchment: "#FAF7F0",
    parchmentDeep: "#F1ECE0",
    clay: "#C65D3B",
    clayDeep: "#A84A2D",
    forest: "#2F6F5E",
    warmGray: "#8A8377",
    border: "#E0D9C8",
};

function classNum(subject) {
    // deterministic "Dewey-style" classification number per subject for the catalog motif
    let hash = 0;
    for (let i = 0; i < subject.length; i++) hash = (hash * 31 + subject.charCodeAt(i)) >>> 0;
    const major = 100 + (hash % 800);
    const minor = (hash >> 3) % 99;
    return `${major}.${minor.toString().padStart(2, "0")}`;
}

/* ---------------------------------------------------------
   SUB-COMPONENTS
--------------------------------------------------------- */
function IndexCard({ tutor }) {
    const [hover, setHover] = useState(false);
    const primarySubject = tutor.subjectList[0];

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
                    background: "repeating-linear-gradient(180deg, transparent 0, transparent 10px, " + COLORS.border + " 10px, " + COLORS.border + " 11px)",
                    opacity: 0.5,
                }}
            />

            <div style={{ padding: "22px 22px 18px 32px" }}>
                {/* classification tag */}
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
                        }}
                    >
                        {tutor.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
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
                            <span style={{ fontSize: "13px", color: COLORS.ink, fontWeight: 600 }}>{tutor.rating}</span>
                            <span style={{ fontSize: "12px", color: COLORS.warmGray }}>({tutor.reviews})</span>
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

            {/* footer stamp row */}
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
                <div>
                    <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: "20px", fontWeight: 700, color: COLORS.ink, lineHeight: 1 }}>
                        ${tutor.hourlyRate}
                        <span style={{ fontSize: "12px", fontWeight: 400, color: COLORS.warmGray }}> /hr</span>
                    </div>
                </div>
                <button
                    style={{
                        background: COLORS.clay,
                        color: "#FFFDF8",
                        border: "none",
                        borderRadius: "2px",
                        padding: "9px 16px",
                        fontSize: "13px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "background 150ms",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = COLORS.clayDeep)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = COLORS.clay)}
                >
                    View profile
                </button>
            </div>
        </div>
    );
}

function FilterRail({ filters, setFilters, resultCount }) {
    const toggleSubject = (s) =>
        setFilters((f) => ({
            ...f,
            subjects: f.subjects.includes(s) ? f.subjects.filter((x) => x !== s) : [...f.subjects, s],
        }));
    const toggleDay = (d) =>
        setFilters((f) => ({
            ...f,
            days: f.days.includes(d) ? f.days.filter((x) => x !== d) : [...f.days, d],
        }));

    return (
        <aside style={{ width: "100%" }}>
            <div
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: COLORS.warmGray,
                    marginBottom: "18px",
                    paddingBottom: "10px",
                    borderBottom: `1px solid ${COLORS.border}`,
                }}
            >
                Filter catalog — {resultCount} {resultCount === 1 ? "result" : "results"}
            </div>

            {/* Format */}
            <FilterGroup label="Format">
                {["ONLINE", "ONSITE"].map((loc) => (
                    <Checkbox
                        key={loc}
                        checked={filters.location === loc}
                        label={loc === "ONLINE" ? "Remote" : "On-site"}
                        onClick={() => setFilters((f) => ({ ...f, location: f.location === loc ? null : loc }))}
                    />
                ))}
            </FilterGroup>

            {/* Price */}
            <FilterGroup label="Hourly rate">
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: "14px", color: COLORS.ink, width: "40px" }}>
                        ${filters.maxPrice}
                    </span>
                    <input
                        type="range"
                        min={20}
                        max={60}
                        value={filters.maxPrice}
                        onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
                        style={{ flex: 1, accentColor: COLORS.clay }}
                    />
                </div>
                <div style={{ fontSize: "11px", color: COLORS.warmGray, marginTop: "2px" }}>up to ${filters.maxPrice}/hr</div>
            </FilterGroup>

            {/* Subjects */}
            <FilterGroup label="Subject">
                {ALL_SUBJECTS.map((s) => (
                    <Checkbox key={s} checked={filters.subjects.includes(s)} label={s} onClick={() => toggleSubject(s)} />
                ))}
            </FilterGroup>

            {/* Availability */}
            <FilterGroup label="Available on">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                    {ALL_DAYS.map((d) => {
                        const active = filters.days.includes(d);
                        return (
                            <button
                                key={d}
                                onClick={() => toggleDay(d)}
                                style={{
                                    fontSize: "11.5px",
                                    padding: "5px 8px",
                                    borderRadius: "2px",
                                    border: `1px solid ${active ? COLORS.ink : COLORS.border}`,
                                    background: active ? COLORS.ink : "transparent",
                                    color: active ? COLORS.parchment : COLORS.ink,
                                    cursor: "pointer",
                                    fontWeight: 500,
                                    transition: "all 120ms",
                                }}
                            >
                                {d.slice(0, 3)}
                            </button>
                        );
                    })}
                </div>
            </FilterGroup>

            {(filters.subjects.length > 0 || filters.location || filters.days.length > 0 || filters.maxPrice < 60) && (
                <button
                    onClick={() => setFilters({ subjects: [], location: null, days: [], maxPrice: 60 })}
                    style={{
                        marginTop: "8px",
                        fontSize: "12.5px",
                        color: COLORS.clayDeep,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        fontWeight: 600,
                        textDecoration: "underline",
                    }}
                >
                    Clear all filters
                </button>
            )}
        </aside>
    );
}

function FilterGroup({ label, children }) {
    return (
        <div style={{ marginBottom: "26px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, color: COLORS.ink, marginBottom: "10px", fontFamily: "'Fraunces', serif" }}>
                {label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>{children}</div>
        </div>
    );
}

function Checkbox({ checked, label, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                display: "flex",
                alignItems: "center",
                gap: "9px",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                textAlign: "left",
            }}
        >
            <span
                style={{
                    width: "15px",
                    height: "15px",
                    flexShrink: 0,
                    border: `1.5px solid ${checked ? COLORS.forest : COLORS.warmGray}`,
                    background: checked ? COLORS.forest : "transparent",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 120ms",
                }}
            >
                {checked && <span style={{ color: "#fff", fontSize: "10px", lineHeight: 1 }}>✓</span>}
            </span>
            <span style={{ fontSize: "13.5px", color: "#3A3528" }}>{label}</span>
        </button>
    );
}

/* ---------------------------------------------------------
   MAIN PAGE
--------------------------------------------------------- */
export default function BrowseTutorsRedesign() {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState("relevance");
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [filters, setFilters] = useState({ subjects: [], location: null, days: [], maxPrice: 60 });
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 6;

    const results = useMemo(() => {
        let list = MOCK_TUTORS.filter((t) => {
            const q = query.trim().toLowerCase();
            const matchesQuery =
                !q ||
                t.name.toLowerCase().includes(q) ||
                t.subjectList.some((s) => s.toLowerCase().includes(q));
            const matchesLocation = !filters.location || t.location === filters.location;
            const matchesPrice = t.hourlyRate <= filters.maxPrice;
            const matchesSubjects =
                filters.subjects.length === 0 || filters.subjects.some((s) => t.subjectList.includes(s));
            const matchesDays =
                filters.days.length === 0 || t.availability.some((a) => filters.days.includes(a.day));
            return matchesQuery && matchesLocation && matchesPrice && matchesSubjects && matchesDays;
        });

        if (sort === "price-asc") list = [...list].sort((a, b) => a.hourlyRate - b.hourlyRate);
        if (sort === "price-desc") list = [...list].sort((a, b) => b.hourlyRate - a.hourlyRate);
        if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

        return list;
    }, [query, filters, sort]);

    useEffect(() => {
        setPage(1);
    }, [query, filters, sort]);

    const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
    useEffect(() => {
        if (page > totalPages) {
            setPage(totalPages);
        }
    }, [page, totalPages]);

    const paginatedResults = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return results.slice(start, start + PAGE_SIZE);
    }, [page, results]);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: COLORS.parchment,
                fontFamily: "'Inter', -apple-system, sans-serif",
            }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        * { box-sizing: border-box; }
        input[type="range"]::-webkit-slider-thumb { appearance: none; width: 14px; height: 14px; border-radius: 50%; background: ${COLORS.clay}; cursor: pointer; }
        @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
      `}</style>

            {/* ---------- HEADER / HERO ---------- */}
            <header
                style={{
                    borderBottom: `1px solid ${COLORS.border}`,
                    background: "linear-gradient(180deg, #FFFDF8 0%, " + COLORS.parchment + " 100%)",
                }}
            >
                <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "48px 28px 32px" }}>
                    <div
                        style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "11px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: COLORS.clayDeep,
                            marginBottom: "10px",
                            fontWeight: 700,
                        }}
                    >
                        The Catalog
                    </div>
                    <h1
                        style={{
                            fontFamily: "'Fraunces', Georgia, serif",
                            fontSize: "clamp(32px, 4vw, 46px)",
                            fontWeight: 700,
                            color: COLORS.ink,
                            margin: "0 0 10px 0",
                            lineHeight: 1.05,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        Find the right tutor,<br />not just any tutor.
                    </h1>
                    <p style={{ fontSize: "15.5px", color: COLORS.warmGray, maxWidth: "520px", margin: "0 0 28px 0", lineHeight: 1.5 }}>
                        Browse by subject, schedule, and rate. Every listing below is a real tutor with real availability.
                    </p>

                    {/* search */}
                    <div style={{ display: "flex", gap: "10px", maxWidth: "640px" }}>
                        <div style={{ position: "relative", flex: 1 }}>
                            <Search
                                size={17}
                                color={COLORS.warmGray}
                                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
                            />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search by subject or tutor name…"
                                style={{
                                    width: "100%",
                                    padding: "13px 16px 13px 42px",
                                    fontSize: "14.5px",
                                    border: `1.5px solid ${COLORS.ink}`,
                                    borderRadius: "2px",
                                    background: "#FFFDF8",
                                    color: COLORS.ink,
                                    outline: "none",
                                }}
                            />
                        </div>
                        <button
                            onClick={() => setMobileFiltersOpen(true)}
                            style={{
                                display: "none",
                                alignItems: "center",
                                gap: "6px",
                                padding: "13px 16px",
                                border: `1.5px solid ${COLORS.ink}`,
                                borderRadius: "2px",
                                background: "transparent",
                                color: COLORS.ink,
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                            className="filters-mobile-btn"
                        >
                            <SlidersHorizontal size={15} /> Filters
                        </button>
                    </div>
                </div>
            </header>

            {/* ---------- BODY ---------- */}
            <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "36px 28px 80px", display: "flex", gap: "40px" }}>
                {/* Filter rail — desktop */}
                <div style={{ width: "240px", flexShrink: 0 }} className="filter-rail-desktop">
                    <FilterRail filters={filters} setFilters={setFilters} resultCount={results.length} />
                </div>

                {/* Results */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "20px",
                            paddingBottom: "14px",
                            borderBottom: `1px solid ${COLORS.border}`,
                        }}
                    >
                        <div style={{ fontSize: "13.5px", color: COLORS.warmGray }}>
                            <span style={{ color: COLORS.ink, fontWeight: 700 }}>{results.length}</span> tutors found
                        </div>
                        <div style={{ position: "relative" }}>
                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                style={{
                                    appearance: "none",
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    color: COLORS.ink,
                                    border: `1px solid ${COLORS.border}`,
                                    borderRadius: "2px",
                                    background: "#FFFDF8",
                                    padding: "8px 30px 8px 12px",
                                    cursor: "pointer",
                                }}
                            >
                                <option value="relevance">Sort: Relevance</option>
                                <option value="rating">Sort: Top rated</option>
                                <option value="price-asc">Sort: Price, low to high</option>
                                <option value="price-desc">Sort: Price, high to low</option>
                            </select>
                            <ChevronDown size={14} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
                        </div>
                    </div>

                    {/* active filter chips */}
                    {(filters.subjects.length > 0 || filters.location || filters.days.length > 0) && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                            {filters.location && (
                                <Chip label={filters.location === "ONLINE" ? "Remote" : "On-site"} onRemove={() => setFilters((f) => ({ ...f, location: null }))} />
                            )}
                            {filters.subjects.map((s) => (
                                <Chip key={s} label={s} onRemove={() => setFilters((f) => ({ ...f, subjects: f.subjects.filter((x) => x !== s) }))} />
                            ))}
                            {filters.days.map((d) => (
                                <Chip key={d} label={d} onRemove={() => setFilters((f) => ({ ...f, days: f.days.filter((x) => x !== d) }))} />
                            ))}
                        </div>
                    )}

                    {results.length === 0 ? (
                        <EmptyState onReset={() => { setFilters({ subjects: [], location: null, days: [], maxPrice: 60 }); setQuery(""); }} />
                    ) : (
                        <>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                                    gap: "22px",
                                }}
                            >
                                {paginatedResults.map((t) => (
                                    <IndexCard key={t.id} tutor={t} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        gap: "12px",
                                        marginTop: "26px",
                                        paddingTop: "12px",
                                        borderTop: `1px solid ${COLORS.border}`,
                                    }}
                                >
                                    <div style={{ fontSize: "13px", color: COLORS.warmGray }}>
                                        Showing {(page - 1) * PAGE_SIZE + 1} - {Math.min(page * PAGE_SIZE, results.length)} of {results.length} tutors
                                    </div>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                                        <button
                                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            style={{
                                                border: `1px solid ${COLORS.border}`,
                                                background: page === 1 ? COLORS.parchmentDeep : "#FFFDF8",
                                                color: COLORS.ink,
                                                padding: "8px 12px",
                                                borderRadius: "2px",
                                                cursor: page === 1 ? "not-allowed" : "pointer",
                                            }}
                                        >
                                            Previous
                                        </button>
                                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
                                            <button
                                                key={pageNumber}
                                                onClick={() => setPage(pageNumber)}
                                                style={{
                                                    border: `1px solid ${pageNumber === page ? COLORS.ink : COLORS.border}`,
                                                    background: pageNumber === page ? COLORS.ink : "#FFFDF8",
                                                    color: pageNumber === page ? "#FFFDF8" : COLORS.ink,
                                                    padding: "8px 11px",
                                                    borderRadius: "2px",
                                                    cursor: "pointer",
                                                    minWidth: "38px",
                                                }}
                                            >
                                                {pageNumber}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={page === totalPages}
                                            style={{
                                                border: `1px solid ${COLORS.border}`,
                                                background: page === totalPages ? COLORS.parchmentDeep : "#FFFDF8",
                                                color: COLORS.ink,
                                                padding: "8px 12px",
                                                borderRadius: "2px",
                                                cursor: page === totalPages ? "not-allowed" : "pointer",
                                            }}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* mobile filter drawer */}
            {mobileFiltersOpen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(27,42,74,0.4)",
                        zIndex: 50,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                    onClick={() => setMobileFiltersOpen(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            width: "300px",
                            maxWidth: "85vw",
                            background: COLORS.parchment,
                            height: "100%",
                            padding: "24px",
                            overflowY: "auto",
                        }}
                    >
                        <button
                            onClick={() => setMobileFiltersOpen(false)}
                            style={{ background: "none", border: "none", marginBottom: "16px", cursor: "pointer", color: COLORS.ink }}
                        >
                            <X size={20} />
                        </button>
                        <FilterRail filters={filters} setFilters={setFilters} resultCount={results.length} />
                    </div>
                </div>
            )}

            <style>{`
        @media (max-width: 860px) {
          .filter-rail-desktop { display: none !important; }
          .filters-mobile-btn { display: flex !important; }
        }
      `}</style>
        </div>
    );
}

function Chip({ label, onRemove }) {
    return (
        <span
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12.5px",
                fontWeight: 600,
                padding: "5px 6px 5px 10px",
                borderRadius: "2px",
                background: "#1B2A4A",
                color: "#FAF7F0",
            }}
        >
            {label}
            <button
                onClick={onRemove}
                style={{ background: "none", border: "none", color: "#FAF7F0", cursor: "pointer", display: "flex", padding: "2px" }}
            >
                <X size={11} />
            </button>
        </span>
    );
}

function EmptyState({ onReset }) {
    return (
        <div
            style={{
                textAlign: "center",
                padding: "70px 20px",
                border: `1px dashed ${COLORS.border}`,
                borderRadius: "2px",
                background: "#FFFDF8",
            }}
        >
            <div
                style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: COLORS.clayDeep,
                    marginBottom: "10px",
                }}
            >
                No matches in the catalog
            </div>
            <p style={{ fontFamily: "'Fraunces', serif", fontSize: "20px", color: COLORS.ink, margin: "0 0 18px 0" }}>
                Nobody fits all those filters yet.
            </p>
            <p style={{ fontSize: "14px", color: COLORS.warmGray, maxWidth: "380px", margin: "0 auto 20px" }}>
                Try widening the price range, clearing a subject, or removing a day filter.
            </p>
            <button
                onClick={onReset}
                style={{
                    background: COLORS.clay,
                    color: "#FFFDF8",
                    border: "none",
                    borderRadius: "2px",
                    padding: "10px 20px",
                    fontSize: "13.5px",
                    fontWeight: 600,
                    cursor: "pointer",
                }}
            >
                Clear all filters
            </button>
        </div>
    );
}