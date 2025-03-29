"use server";

import { ISubject } from "@/types";
import { revalidateTag } from "next/cache";


export const createSubject = async (subData: ISubject) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/subjects/create-subject`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(subData),
        });
        revalidateTag("SUBJECT");
        return await res.json();

    } catch (error) {
        return error;
    }
};


// Get all subjects for a tutor
export const getSubjects = async (tutorId?: string) => {
    try {
        const url = tutorId
            ? `${process.env.NEXT_PUBLIC_BASE_API}/subjects?tutorId=${tutorId}`
            : `${process.env.NEXT_PUBLIC_BASE_API}/subjects`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
            next: {
                tags: ["SUBJECT"]
            }
        });

        const data: ISubject[] = await res.json();
        return { data };
    } catch (error) {
        console.error("Error in getSubjects:", error);
        return { error: error instanceof Error ? error.message : "An unexpected error occurred" };
    }
};


// get single product
export const getSingleSubject = async (productId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/subjects/${productId}`,
            {
                next: {
                    tags: ["SUBJECT"],
                },
            }
        );
        const data = await res.json();
        return data;
    } catch (error: any) {
        return Error(error.message);
    }
};