"use client";

import { useEffect, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { HashLoader } from "react-spinners";
import { getTutorProfiles } from "@/services/TutorProfile";
import { ITutor } from "@/types/tutor.type";
import { COLORS } from "./Tutorcatalog.constants";
import { IndexCard } from "./Indexcard";
import { FilterRail } from "./Filterrail";
import { Chip } from "./Chip";
import { Pagination } from "./Pagination";
import { TutorFilters,IMeta, DEFAULT_FILTERS } from "@/types/Tutorcatalog.types";
import { EmptyState } from "./Emptystate";


const PAGE_LIMIT = 12;

// Subjects shown in the filter sidebar. Since subjects now drive a server
// query (not a client .filter() over an in-memory list), this list can't be
// derived from "whatever subjects happen to be on the current page" anymore.
// Replace with a real subjects endpoint, or a fixed list matching your data.
const KNOWN_SUBJECTS = ["Math", "English", "Biology", "Programming", "Physics", "Chemistry"];

const BrowseTutors = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [filters, setFilters] = useState<TutorFilters>(DEFAULT_FILTERS);

    const [tutors, setTutors] = useState<ITutor[]>([]);
    const [meta, setMeta] = useState<IMeta>({ page: 1, limit: PAGE_LIMIT, skip: 0, total: 0, totalPages: 1 });
    const [isLoading, setIsLoading] = useState(false);

    // Reset to page 1 whenever search term or filters change, so we never
    // sit on a stale page number that no longer has results.
    useEffect(() => {
        setPage(1);
    }, [searchTerm, filters.location, filters.subjects, filters.days, filters.maxPrice]);

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            setIsLoading(true);
            try {
                const res = await getTutorProfiles({
                    searchTerm,
                    page,
                    limit: PAGE_LIMIT,
                    location: filters.location,
                    subjects: filters.subjects,
                    days: filters.days,
                    // maxPrice: filters.maxPrice,
                });
                if (cancelled) return;
                setTutors(res?.data?.result ?? []);
                setMeta(
                    res?.data?.meta ?? {
                        page,
                        limit: PAGE_LIMIT,
                        skip: 0,
                        total: res?.data?.result?.length ?? 0,
                        totalPages: 1,
                    }
                );
            } catch (err) {
                console.error(err);
                if (!cancelled) {
                    setTutors([]);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }

        fetchData();
        return () => {
            cancelled = true;
        };
    }, [searchTerm, page, filters.location, filters.subjects, filters.days, filters.maxPrice]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchTerm(searchInput.trim());
    };

    const hasActiveFilters = filters.subjects.length > 0 || !!filters.location || filters.days.length > 0;

    const resetEverything = () => {
        setFilters(DEFAULT_FILTERS);
        setSearchInput("");
        setSearchTerm("");
    };

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
                input[type="range"]::-webkit-slider-thumb { appearance: none; width: 14px; height: 14px; border-radius: 50%; background: ${COLORS.clay}; cursor: pointer; }
                @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
                @media (max-width: 860px) {
                    .filter-rail-desktop { display: none !important; }
                    .filters-mobile-btn { display: flex !important; }
                }
            `}</style>

            {/* HEADER / HERO */}
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
                        Find the right tutor,
                        <br />
                        not just any tutor.
                    </h1>
                    <p
                        style={{
                            fontSize: "15.5px",
                            color: COLORS.warmGray,
                            maxWidth: "520px",
                            margin: "0 0 28px 0",
                            lineHeight: 1.5,
                        }}
                    >
                        Browse by subject, schedule, and rate. Every listing below is a real tutor with real
                        availability.
                    </p>

                    <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "10px", maxWidth: "640px" }}>
                        <div style={{ position: "relative", flex: 1 }}>
                            <Search
                                size={17}
                                color={COLORS.warmGray}
                                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
                            />
                            <input
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
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
                            type="submit"
                            style={{
                                background: COLORS.clay,
                                color: "#FFFDF8",
                                border: "none",
                                borderRadius: "2px",
                                padding: "13px 22px",
                                fontSize: "14px",
                                fontWeight: 600,
                                cursor: "pointer",
                            }}
                        >
                            Search
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileFiltersOpen(true)}
                            className="filters-mobile-btn"
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
                        >
                            <SlidersHorizontal size={15} /> Filters
                        </button>
                    </form>
                </div>
            </header>

            {/* BODY */}
            <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "36px 28px 80px", display: "flex", gap: "40px" }}>
                <div style={{ width: "240px", flexShrink: 0 }} className="filter-rail-desktop">
                    <FilterRail
                        filters={filters}
                        setFilters={setFilters}
                        allSubjects={KNOWN_SUBJECTS}
                        resultCount={meta.total}
                    />
                </div>

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
                            <span style={{ color: COLORS.ink, fontWeight: 700 }}>{meta.total}</span> tutors found
                            {meta.totalPages > 1 && (
                                <span>
                                    {" "}
                                    — page {meta.page} of {meta.totalPages}
                                </span>
                            )}
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                            {filters.location && (
                                <Chip
                                    label={filters.location === "ONLINE" ? "Remote" : "On-site"}
                                    onRemove={() => setFilters((f) => ({ ...f, location: null }))}
                                />
                            )}
                            {filters.subjects.map((s) => (
                                <Chip
                                    key={s}
                                    label={s}
                                    onRemove={() =>
                                        setFilters((f) => ({ ...f, subjects: f.subjects.filter((x) => x !== s) }))
                                    }
                                />
                            ))}
                            {filters.days.map((d) => (
                                <Chip
                                    key={d}
                                    label={d}
                                    onRemove={() => setFilters((f) => ({ ...f, days: f.days.filter((x) => x !== d) }))}
                                />
                            ))}
                        </div>
                    )}

                    {isLoading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
                            <HashLoader color={COLORS.clay} />
                        </div>
                    ) : tutors.length === 0 ? (
                        <EmptyState onReset={resetEverything} />
                    ) : (
                        <>
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                                    gap: "22px",
                                }}
                            >
                                {tutors.map((t) => (
                                    <IndexCard key={t.id} tutor={t} />
                                ))}
                            </div>

                            <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={setPage} />
                        </>
                    )}
                </div>
            </div>

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
                            type="button"
                            onClick={() => setMobileFiltersOpen(false)}
                            style={{ background: "none", border: "none", marginBottom: "16px", cursor: "pointer", color: COLORS.ink }}
                        >
                            <X size={20} />
                        </button>
                        <FilterRail
                            filters={filters}
                            setFilters={setFilters}
                            allSubjects={KNOWN_SUBJECTS}
                            resultCount={meta.total}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrowseTutors;



// "use client";

// import { getTutorProfiles } from "@/services/TutorProfile";
// import { useEffect, useState } from "react";
// import { TutorCard } from "./TutorCard";
// import { ITutor } from "@/types/tutor.type";
// import { HashLoader } from 'react-spinners';
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// const BrowseTutors = () => {

//     const [searchTerm, setSearchTerm] = useState('');
//     const [tutors, setTutors] = useState<ITutor[]>([]);
//     const [isLoading, setIsLoading] = useState(false);


//     useEffect(() => {
//         async function fetchData() {
//             setIsLoading(true)
//             try {
//                 const res = await getTutorProfiles(searchTerm);
//                 setTutors(res.data.result);
//             } catch (err) {
//                 console.error(err);
//             }
//             finally {
//                 setIsLoading(false)
//             }
//         };
//         fetchData();
//     }, [])

//     const handleSearch = async () => {
//         setIsLoading(true)
//         try {
//             const res = await getTutorProfiles(searchTerm);
//             setTutors(res.data.result);
//         } catch (err) {
//             console.error(err);
//         }
//         finally {
//             setIsLoading(false)
//         }
//     };

//     return (
//         <div className="md:mx-10">
//             {/* Search Bar */}
//             <div className="my-10 max-w-sm md:max-w-lg mx-auto flex items-center gap-2 bg-white rounded-full p-2 shadow-lg">
//                 <Search className="h-5 w-5 text-gray-500 ml-2" />
//                 <Input
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     type="text"
//                     placeholder="Search by subject, grade, or tutor name"
//                     className="flex-1 border-none focus:ring-0 text-gray-900 placeholder-gray-400"
//                 />
//                 <Button
//                     onClick={handleSearch}
//                     className="rounded-full px-4 sm:px-6 bg-indigo-700 hover:bg-indigo-800"
//                 >
//                     Search
//                 </Button>
//             </div>

//             <h1>Browser Tutors {tutors?.length}</h1>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
//                 {isLoading ? (
//                     <div className="col-span-full flex items-center justify-center min-h-[200px]">
//                         <HashLoader />
//                     </div>
//                 ) : tutors.length > 0 ? (
//                     tutors.map(tutor => (
//                         <TutorCard
//                             key={tutor.id}
//                             tutor={tutor}
//                         />
//                     ))
//                 ) : (
//                     <div className="col-span-full flex items-center justify-center min-h-[200px]">
//                         <p className="text-red-400 text-2xl">No tutors found</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BrowseTutors;
