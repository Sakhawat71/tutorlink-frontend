"use client";

import ShowSubjectCard from "./SubjectCard";

// import { getSubjects } from "@/services/SubjectService";

const BrowseTutors = ({subject}) => {   
    console.log(subject);

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-3xl font-bold text-center mb-8">Browse Tutors</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subject?.map((sub) => (
                    // <ShowSubjectCard />
                ))}
            </div>
        </div>
    );
};

export default BrowseTutors;