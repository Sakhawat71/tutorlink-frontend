"use client";

import React from "react";
import { X } from "lucide-react";

interface ChipProps {
    label: string;
    onRemove: () => void;
}

export function Chip({ label, onRemove }: ChipProps) {
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
                type="button"
                onClick={onRemove}
                style={{
                    background: "none",
                    border: "none",
                    color: "#FAF7F0",
                    cursor: "pointer",
                    display: "flex",
                    padding: "2px",
                }}
            >
                <X size={11} />
            </button>
        </span>
    );
}