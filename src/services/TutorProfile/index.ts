"use server";

import { revalidateTag } from "next/cache";

export const createTutorProfile = async (payload: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/tutor`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        revalidateTag("tutor-profile");
        console.log("in service ",res);
        return await res.json();

    } catch (error) {
        return error;
    }
};