"use client";

import { getTutorProfiles } from "@/services/TutorProfile";
import { useEffect, useState } from "react";


const BrowseTutors = () => {

    const [tutorProfiles ,setTutorProfile] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await getTutorProfiles();
            setTutorProfile(res.data)
            // console.log(res);
        }
        fetchData();
    }, [])

    console.log(tutorProfiles);


    return (
        <div>
            <h1>Browser Tutors {tutorProfiles.length}</h1>
        </div>
    );
};

export default BrowseTutors;