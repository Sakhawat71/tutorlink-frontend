import { TutorDetailsComponent } from '@/components/modules/browseTutors/TutorDetails';
import React from 'react';

const TutorDetailsPage = () => {

    return (
        <div className="bg-gray-50 min-h-screen">
            <TutorDetailsComponent tutor={tutor} />
        </div>
    );
};

export default TutorDetailsPage;