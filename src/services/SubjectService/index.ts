"use server";

import { ISubject } from "@/types";


export const createSubject = async (subData: ISubject) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subjects/create-subject`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subData),
        });
        // revalidateTag("PRODUCT");
        return await res.json();

    } catch (error) {
        return error;
    }
};

// export const getSubjects = async (subData) => {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subjects`, {

//         })
//     } catch (error) {
//         return error;
//     }
// };

// Get all subjects for a tutor (assuming tutorId filter)
export const getSubjects = async (tutorId?: string): Promise<ApiResponse<ISubject[]>> => {
    try {
        const url = tutorId
            ? `${process.env.NEXT_PUBLIC_BASE_API}/tutor/subjects?tutorId=${tutorId}`
            : `${process.env.NEXT_PUBLIC_BASE_API}/tutor/subjects`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store", // Ensure fresh data, adjust as needed
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch subjects: ${res.statusText}`);
        }

        const data: ISubject[] = await res.json();
        return { data };
    } catch (error) {
        console.error("Error in getSubjects:", error);
        return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
    }
};