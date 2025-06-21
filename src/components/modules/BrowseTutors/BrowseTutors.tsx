"use client";

import { ISubject } from "@/types";
import ShowSubjectCard from "./SubjectCard";

interface BrowseTutorsProps {
    subject: ISubject[];
}

const BrowseTutors = ({ subject }: BrowseTutorsProps) => {

    return (
        <div className="container mx-auto py-10 px-5 md:px-10 lg:px-20">
            <h2 className="text-3xl font-bold text-center mb-8">Browse Tutors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-10">
                {subject?.map((sub) => (
                    <ShowSubjectCard
                        subject={sub}
                        key={sub.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default BrowseTutors;