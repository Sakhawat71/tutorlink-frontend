"use client";

import React from "react";
import { COLORS, ALL_DAYS } from "./Tutorcatalog.constants";
import { FilterGroup } from "./Filtergroup";
import { DEFAULT_FILTERS, TutorFilters } from "@/types/Tutorcatalog.types";
import { Checkbox } from "./Checkbox";

interface FilterRailProps {
    filters: TutorFilters;
    setFilters: React.Dispatch<React.SetStateAction<TutorFilters>>;
    allSubjects: string[];
    resultCount: number;
}

export function FilterRail({ filters, setFilters, allSubjects, resultCount }: FilterRailProps) {
    const toggleSubject = (s: string) =>
        setFilters((f) => ({
            ...f,
            subjects: f.subjects.includes(s) ? f.subjects.filter((x) => x !== s) : [...f.subjects, s],
        }));

    const toggleDay = (d: string) =>
        setFilters((f) => ({
            ...f,
            days: f.days.includes(d) ? f.days.filter((x) => x !== d) : [...f.days, d],
        }));

    const hasActiveFilters =
        filters.subjects.length > 0 || filters.location || filters.days.length > 0 || filters.maxPrice < 60;

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

            <FilterGroup label="Format">
                {(["ONLINE", "ONSITE"] as const).map((loc) => (
                    <Checkbox
                        key={loc}
                        checked={filters.location === loc}
                        label={loc === "ONLINE" ? "Remote" : "On-site"}
                        onClick={() => setFilters((f) => ({ ...f, location: f.location === loc ? null : loc }))}
                    />
                ))}
            </FilterGroup>

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
                <div style={{ fontSize: "11px", color: COLORS.warmGray, marginTop: "2px" }}>
                    up to ${filters.maxPrice}/hr
                </div>
            </FilterGroup>

            <FilterGroup label="Subject">
                {allSubjects.map((s) => (
                    <Checkbox key={s} checked={filters.subjects.includes(s)} label={s} onClick={() => toggleSubject(s)} />
                ))}
            </FilterGroup>

            <FilterGroup label="Available on">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "4px" }}>
                    {ALL_DAYS.map((d) => {
                        const active = filters.days.includes(d);
                        return (
                            <button
                                key={d}
                                type="button"
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

            {hasActiveFilters && (
                <button
                    type="button"
                    onClick={() => setFilters(DEFAULT_FILTERS)}
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