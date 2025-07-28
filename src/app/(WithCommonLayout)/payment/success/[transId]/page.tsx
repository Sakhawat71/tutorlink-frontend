"use server";

import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

export const createPaymentIntent = async (id: string) => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment/initiate-payment/${id}`, {
        method: "POST",
        headers: {
            Authorization: accessToken || "",
        },
    });

    return await result.json();
};

export const get_user_payments = async () => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment`, {
        method: "GET",
        headers: {
            Authorization: accessToken || "",
        },
    });

    return await result.json();
};

export const get_my_payments = async () => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    const result = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment/my-payment`, {
        method: "GET",
        headers: {
            Authorization: accessToken || "",
        },
    });

    return await result.json();
};

export const validatePayment = async (transactionId: string) => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/payment/validate-payment?tran_id=${transactionId}`, {
            method: "GET",
            headers: {
                Authorization: accessToken || "",
                "Content-Type": "application/json",
            },
        });

        return await res.json();
    } catch (error) {
        console.error("Payment validation error:", error);
        return {
            success: false,
            message: "Failed to validate payment",
            data: null,
        };
    }
};
