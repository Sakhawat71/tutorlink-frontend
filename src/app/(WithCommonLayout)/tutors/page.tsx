import BrowseTutors from '@/components/modules/BrowseTutors/BrowseTutors';
import { getSubjects } from '@/services/SubjectService';
import { ISubject } from '@/types';
import React from 'react';

const TutorsPage = async () => {

    const result = await getSubjects();
    const subjects = result.data as ISubject[];

    return (
        <div>
            <BrowseTutors subject={subjects} />
        </div>
    );
};

export default TutorsPage;