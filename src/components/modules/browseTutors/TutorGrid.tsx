import { ITutor } from "@/types/tutor.type";
import { TutorCard } from "./TutorCard";
import { EmptyState } from "./EmptyState";
import { HashLoader } from "react-spinners";

interface TutorGridProps {
    tutors: ITutor[];
    isLoading: boolean;
}

export const TutorGrid = ({ tutors, isLoading }: TutorGridProps) => {
    if (isLoading) {
        return (
            <div className="col-span-full flex items-center justify-center min-h-50">
                <HashLoader />
            </div>
        );
    }

    if (tutors.length === 0) {
        return <EmptyState />;
    }

    return (
        <>
            {tutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
            ))}
        </>
    );
};