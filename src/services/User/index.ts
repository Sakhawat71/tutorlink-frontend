"use server";

export const getUserDetails = async (id: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/user/${id}`, {
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