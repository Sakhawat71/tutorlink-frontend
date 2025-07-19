import BrowseTutors from '@/components/modules/browseTutors/BrowseTutors';
import { Metadata } from 'next';
import React from 'react';

export const metadata:Metadata = {
    title: 'TutorLink | Tutors',
    description: 'Browse and connect with tutors',
}

const TutorsPage = async () => {

    return (
        <div>
            <BrowseTutors />
        </div>
    );
};

export default TutorsPage;