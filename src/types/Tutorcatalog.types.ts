import { ITutor } from "@/types/tutor.type";

export interface IMeta {
    page: number;
    limit: number;
    skip: number;
    total: number;
    totalPages: number;
}

export interface IPaginatedTutorResponse {
    success: boolean;
    message?: string;
    data: {
        result: ITutor[];
        meta: IMeta;
    };
}

export interface TutorFilters {
    subjects: string[];
    location: "ONLINE" | "ONSITE" | null;
    days: string[];
    maxPrice: number;
}

export const DEFAULT_FILTERS: TutorFilters = {
    subjects: [],
    location: null,
    days: [],
    maxPrice: 60,
};