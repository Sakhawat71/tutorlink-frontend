"use client";

import React from "react";
import { COLORS } from "./Tutorcatalog.constants";

interface CheckboxProps {
    checked: boolean;
    label: string;
    onClick: () => void;
}

export function Checkbox({ checked, label, onClick }: CheckboxProps) {
    return (
        <button
            type="button"
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