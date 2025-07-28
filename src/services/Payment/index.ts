"use server"

import { cookies } from "next/headers";



export const createPaymentIntent = async (id: string) => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/payment/init-payment/${id}`, {
        method: "POST",
        headers: {
            "Authorization": accessToken!,
        }
    });
    // console.log(result);
    return await result.json();
};


export const getUserPayments = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/payment`, {
        method: "GET",
        headers: {
            "Authorization": accessToken!,
        }
    })
    return await result.json();
}
export const getMyPayments = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/payment/my-payment`, {
        method: "GET",
        headers: {
            "Authorization": accessToken!,
        }
    })
    return await result.json();
}



export const validatePayment = async (transactionId: string) => {
    const accessToken = (await cookies()).get("accessToken")?.value;

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/payment/validate-payment?tran_id=${transactionId}`, {
            method: 'GET',
            headers: {
                "Authorization": accessToken || '',
                "Content-Type": "application/json"
            }
        });

        return await res.json();
    } catch (error) {
        console.error("Payment validation error:", error);
        return {
            success: false,
            message: "Failed to validate payment",
            data: null
        };
    }
};