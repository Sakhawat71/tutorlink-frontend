"use client";


import { COLORS } from "./Tutorcatalog.constants";
interface EmptyStateProps {
    onReset: () => void;
}

export const EmptyState = ({ onReset }: EmptyStateProps) => {
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
                type="button"
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