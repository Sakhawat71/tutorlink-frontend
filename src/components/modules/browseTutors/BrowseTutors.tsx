"use client";

import { getTutorProfiles } from "@/services/TutorProfile";
import { useEffect, useState } from "react";
import { TutorCard } from "./TutorCard";
import { ITutor } from "@/types/tutor.type";
import { HashLoader } from 'react-spinners';
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const BrowseTutors = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [tutors, setTutors] = useState<ITutor[]>([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const res = await getTutorProfiles('');
            setTutors(res.data.result)
            // console.log(res);
        };
        fetchData();
    }, [])

    const handleSearch = async () => {
        setIsLoading(true)
        try {
            const res = await getTutorProfiles(searchTerm);
            setTutors(res.data.result);
        } catch (err) {
            console.error(err);
        }
        finally {
            setIsLoading(false)
        }
    };

    // console.log(tutorProfiles);

    // loading 
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <HashLoader />
            </div>
        );
    }

    if (!tutors) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">No tutors found</p>
            </div>
        );
    }

    return (
        <div className="md:mx-10">
            {/* Search Bar */}
            <div className="my-10 max-w-sm md:max-w-lg mx-auto flex items-center gap-2 bg-white rounded-full p-2 shadow-lg">
                <Search className="h-5 w-5 text-gray-500 ml-2" />
                <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search by subject, grade, or tutor name"
                    className="flex-1 border-none focus:ring-0 text-gray-900 placeholder-gray-400"
                />
                <Button
                    onClick={handleSearch}
                    className="rounded-full px-4 sm:px-6 bg-indigo-700 hover:bg-indigo-800"
                >
                    Search
                </Button>
            </div>

            <h1>Browser Tutors {tutors?.length}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {tutors?.map(tutor => (
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
