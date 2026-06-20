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
        revalidateTag("tutor-profile", {});
        return await res.json();
    } catch (error) {
        return error;
    }
};

export interface GetTutorProfilesParams {
    searchTerm?: string;
    page?: number;
    limit?: number;
    location?: "ONLINE" | "ONSITE" | null;
    subjects?: string[];
    days?: string[];
    maxPrice?: number;
}

/**
 * Fetches a paginated, filtered list of tutor profiles.
 * Maps directly onto TutorService.getAllTutors's supported query params:
 * searchTerm, page, limit, location, subjects (comma-separated), days
 * (comma-separated), maxPrice.
 */
export const getTutorProfiles = async ({
    searchTerm = "",
    page = 1,
    limit = 12,
    location = null,
    subjects = [],
    days = [],
    maxPrice,
}: GetTutorProfilesParams) => {
    try {
        const params = new URLSearchParams();
        if (searchTerm) params.set("searchTerm", searchTerm);
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (location) params.set("location", location);
        if (subjects.length > 0) params.set("subjects", subjects.join(","));
        if (days.length > 0) params.set("days", days.join(","));
        if (maxPrice) params.set("maxPrice", String(maxPrice));

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/tutor?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        revalidateTag("tutor-profile", {});
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
            cache: "no-store",
        });
        return await res.json();
    } catch (error) {
        return error;
    }
};



// "use server";

// import { revalidateTag } from "next/cache";

// export const createTutorProfile = async (payload: any) => {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/tutor`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//         });
//         revalidateTag("tutor-profile", {});
//         // console.log("in service ", res);
//         return await res.json();

//     } catch (error) {
//         return error;
//     }
// };


// export const getTutorProfiles = async (searchTerm : string) => {
//     // console.log(searchTerm);
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/tutor?searchTerm=${searchTerm}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             cache: "no-store"
//         });
//         revalidateTag("tutor-profile",{});
//         return await res.json();
//     } catch (error) {
//         return error;
//     }
// };


// // export const getTutorProfiles = async (searchTerm: string, page: number = 1, limit: number = 9) => {
// //     try {
// //         const res = await fetch(
// //             `${process.env.NEXT_PUBLIC_BASE_API}/api/tutor?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
// //             {
// //                 method: "GET",
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //                 cache: "no-store"
// //             }
// //         );
// //         revalidateTag("tutor-profile", {});
// //         return await res.json();
// //     } catch (error) {
// //         return error;
// //     }
// // };


// export const getTutorDetails = async (id: string) => {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/tutor/${id}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             cache: "no-store"
//         });
//         return await res.json();
//     } catch (error) {
//         return error;
//     }
// };