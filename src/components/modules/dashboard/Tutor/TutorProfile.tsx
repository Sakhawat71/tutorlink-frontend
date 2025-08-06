"use client";

import { getTutorDetails } from "@/services/TutorProfile";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const TutorProfile = () => {

    const session  = useSession();
    console.log(session.data?.user.id);


    useEffect(()=> {
        const fetchData = async () => {
            const res = await getTutorDetails(session.data?.user.id as string);
            console.log(res);
        }
        fetchData();
    },[session.data?.user.id])



    return (
        <div>
            
        </div>
    );
};

export default TutorProfile;