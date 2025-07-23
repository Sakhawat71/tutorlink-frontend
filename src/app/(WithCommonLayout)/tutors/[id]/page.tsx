"use client";

import { TutorDetailsComponent } from '@/components/modules/browseTutors/TutorDetails';
import { useTutor } from '@/providers/TutorProvider';
import { FadeLoader } from 'react-spinners';


const TutorDetailsPage = () => {

    const tutor = useTutor();

    if (!tutor) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FadeLoader />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            <TutorDetailsComponent tutor={tutor} />
        </div>
    );
};

export default TutorDetailsPage;