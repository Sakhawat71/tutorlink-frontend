"use server";

import { revalidateTag } from "next/cache";

export const createTutorProfile = async (payload: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/tutor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        revalidateTag("tutor-profile");
        // console.log("in service ", res);
        return await res.json();

    } catch (error) {
        return error;
    }
};


export const getTutorProfiles = async (searchTerm : string) => {
    console.log(searchTerm);
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/tutor?searchTerm=${searchTerm}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });
        revalidateTag("tutor-profile");
        return await res.json();
    } catch (error) {
        return error;
    }
};


export const getTutorDetails = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/tutor/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store"
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};