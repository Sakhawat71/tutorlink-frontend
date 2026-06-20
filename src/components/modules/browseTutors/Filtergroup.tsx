"use client";

import React from "react";
import { COLORS } from "./Tutorcatalog.constants";

interface FilterGroupProps {
    label: string;
    children: React.ReactNode;
}

export function FilterGroup({ label, children }: FilterGroupProps) {
    return (
        <div style={{ marginBottom: "26px" }}>
            <div
                style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: COLORS.ink,
                    marginBottom: "10px",
                    fontFamily: "'Fraunces', serif",
                }}
            >
                {label}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>{children}</div>
        </div>
    );
}