import BrowseTutors from '@/components/modules/BrowseTutors/BrowseTutors';
import { getSubjects } from '@/services/SubjectService';
import React from 'react';

const TutorsPage = async () => {

    const {data} = await getSubjects();
    // console.log(data);

    return (
        <div>
            <BrowseTutors subject={data?.data} />
        </div>
    );
};

export default TutorsPage;