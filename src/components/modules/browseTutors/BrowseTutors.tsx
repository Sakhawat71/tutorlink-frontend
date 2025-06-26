"use client";

import { getTutorProfiles } from "@/services/TutorProfile";
import { useEffect, useState } from "react";
import { TutorCard } from "./TutorCard";


const BrowseTutors = () => {

    const [tutorProfiles, setTutorProfile] = useState([]);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {tutorProfiles.map(tutor  => (
                    <TutorCard
                        key={tutor.id}
                        tutor={tutor}
                    />
                ))}
            </div>
        </div>
    );
};

export default BrowseTutors;