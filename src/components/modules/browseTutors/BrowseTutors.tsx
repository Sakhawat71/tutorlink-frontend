"use client";

import { getTutorProfiles } from "@/services/TutorProfile";
import { useEffect, useState } from "react";
import { TutorCard } from "./TutorCard";
import { ITutor } from "@/types/tutor.type";
import { HashLoader } from 'react-spinners';

const BrowseTutors = () => {

    const [tutorProfiles, setTutorProfile] = useState<ITutor[]>([]);

    useEffect(() => {
        async function fetchData() {
            const res = await getTutorProfiles();
            setTutorProfile(res.data)
            // console.log(res);
        };
        fetchData();
    }, [])

    // console.log(tutorProfiles);

    // loading 
    if (tutorProfiles?.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <HashLoader />
            </div>
        );
    }

    if (!tutorProfiles) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">No tutors found</p>
            </div>
        );
    }

    return (
        <div className="md:mx-10">

            <div className="flex flex-col md:flex-row gap-4 justify-between items-center px-6">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by name..."
                    // value={searchQuery}
                    // onChange={(e) => setSearchQuery(e.target.value)}
                    className="border px-4 py-2 rounded w-full md:w-1/3"
                />

                {/* Subject Filter */}
                <select
                    // value={selectedSubject}
                    // onChange={(e) => setSelectedSubject(e.target.value)}
                    className="border px-4 py-2 rounded w-full md:w-1/4"
                >
                    <option value="">All Subjects</option>
                    <option value="math">Math</option>
                    <option value="english">English</option>
                    <option value="physics">Physics</option>
                    {/* Add more subjects based on your data */}
                </select>

                {/* Sort */}
                <select
                    // value={sortOption}
                    // onChange={(e) => setSortOption(e.target.value)}
                    className="border px-4 py-2 rounded w-full md:w-1/4"
                >
                    <option value="name_asc">Name A-Z</option>
                    <option value="name_desc">Name Z-A</option>
                    <option value="rating_desc">Highest Rated</option>
                </select>
            </div>


            <h1>Browser Tutors {tutorProfiles?.length}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {tutorProfiles?.map(tutor => (
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