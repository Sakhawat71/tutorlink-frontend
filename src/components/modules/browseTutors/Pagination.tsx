"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { COLORS } from "./Tutorcatalog.constants";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

/**
 * Builds a compact page list with ellipses, e.g.
 * [1, '…', 4, 5, 6, '…', 12]
 */
function buildPageList(current: number, total: number): (number | "ellipsis")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const pages = new Set<number>([1, total, current, current - 1, current + 1]);
    const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

    const result: (number | "ellipsis")[] = [];
    let prev = 0;
    for (const p of sorted) {
        if (p - prev > 1) result.push("ellipsis");
        result.push(p);
        prev = p;
    }
    return result;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const pageList = buildPageList(page, totalPages);

    const btnBase: React.CSSProperties = {
        minWidth: "34px",
        height: "34px",
        padding: "0 8px",
        borderRadius: "2px",
        border: `1px solid ${COLORS.border}`,
        background: "#FFFDF8",
        color: COLORS.ink,
        fontSize: "13px",
        fontWeight: 600,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 120ms",
    };

    return (
        <nav
            aria-label="Tutor catalog pagination"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                marginTop: "44px",
                paddingTop: "28px",
                borderTop: `1px solid ${COLORS.border}`,
            }}
        >
            <button
                type="button"
                aria-label="Previous page"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                style={{
                    ...btnBase,
                    opacity: page === 1 ? 0.4 : 1,
                    cursor: page === 1 ? "not-allowed" : "pointer",
                }}
            >
                <ChevronLeft size={15} />
            </button>

            {pageList.map((p, idx) =>
                p === "ellipsis" ? (
                    <span
                        key={`ellipsis-${idx}`}
                        style={{
                            width: "34px",
                            textAlign: "center",
                            color: COLORS.warmGray,
                            fontSize: "13px",
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        …
                    </span>
                ) : (
                    <button
                        key={p}
                        type="button"
                        aria-label={`Page ${p}`}
                        aria-current={p === page ? "page" : undefined}
                        onClick={() => onPageChange(p)}
                        style={{
                            ...btnBase,
                            background: p === page ? COLORS.ink : "#FFFDF8",
                            color: p === page ? COLORS.parchment : COLORS.ink,
                            border: `1px solid ${p === page ? COLORS.ink : COLORS.border}`,
                            fontFamily: "'JetBrains Mono', monospace",
                        }}
                    >
                        {p}
                    </button>
                )
            )}

            <button
                type="button"
                aria-label="Next page"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
                style={{
                    ...btnBase,
                    opacity: page === totalPages ? 0.4 : 1,
                    cursor: page === totalPages ? "not-allowed" : "pointer",
                }}
            >
                <ChevronRight size={15} />
            </button>
        </nav>
    );
}