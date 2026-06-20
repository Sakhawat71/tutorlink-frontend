// Design tokens for the "library catalog" redesign of the Browse Tutors page.
// Import COLORS into any component that needs the palette instead of
// re-declaring hex values inline.

export const COLORS = {
    ink: "#1B2A4A",
    parchment: "#FAF7F0",
    parchmentDeep: "#F1ECE0",
    clay: "#C65D3B",
    clayDeep: "#A84A2D",
    forest: "#2F6F5E",
    warmGray: "#8A8377",
    border: "#E0D9C8",
} as const;

export const ALL_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
] as const;

/**
 * Deterministic "Dewey-style" classification number derived from a subject
 * string. Purely cosmetic — gives each card the catalog-card eyebrow tag.
 */
export function classNum(subject: string): string {
    let hash = 0;
    for (let i = 0; i < subject.length; i++) {
        hash = (hash * 31 + subject.charCodeAt(i)) >>> 0;
    }
    const major = 100 + (hash % 800);
    const minor = (hash >> 3) % 99;
    return `${major}.${minor.toString().padStart(2, "0")}`;
}

export function initials(name: string): string {
    return name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("");
}