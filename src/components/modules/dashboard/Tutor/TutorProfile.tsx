"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CreateTutorProfile from "./CreateTutorProfile";
import { getUserDetails } from "@/services/User";
import GetTutorProfile from "./GetTutorProfile";

const TutorProfile = () => {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status !== "authenticated" || !session?.user?.id) return;

        const fetchData = async () => {
            try {
                const res = await getUserDetails(session.user.id);
                setUser(res.data);
            } catch (error) {
                console.error("Failed to fetch user details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [status, session?.user?.id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Failed to load user data.</div>;
    }

    return (
        <div>
            {user.isCompleteProfile ? (
                <GetTutorProfile tutor={user.tutor} />
            ) : (
                <CreateTutorProfile />
            )}
        </div>
    );
};

export default TutorProfile;