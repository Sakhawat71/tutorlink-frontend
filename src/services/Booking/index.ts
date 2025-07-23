"use server";

import { IBookingCreateInput } from "@/types";
import { revalidateTag } from "next/cache";


export const createBookingSession = async (payload: IBookingCreateInput) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/booking/create-booking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        revalidateTag("booking-session");
        return await res.json();
    } catch (error) {
        return error;
    }
}