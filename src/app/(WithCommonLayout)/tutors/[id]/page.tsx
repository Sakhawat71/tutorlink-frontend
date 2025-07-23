"use client";

import { TutorDetailsComponent } from '@/components/modules/browseTutors/TutorDetails';
import { useTutor } from '@/providers/TutorProvider';
// import { getTutorDetails } from '@/services/TutorProfile';
import { ITutor } from '@/types';
// import { useParams } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';


const TutorDetailsPage = () => {

    // const [tutor, setTutor] = useState<ITutor | null>(null);
    // const params = useParams();

    // useEffect(() => {
    //     const fetchTutorDetails = async (id: string) => {
    //         try {
    //             const details = await getTutorDetails(id);
    //             setTutor(details.data);
    //         } catch (error) {
    //             console.error("Failed to fetch tutor details:", error);
    //         }
    //     };
    //     const id = Array.isArray(params.id) ? params.id[0] : params.id;
    //     if (id) {
    //         fetchTutorDetails(id as string);
    //     }
    // }, [params.id]);

    const data = useTutor();
    const tutor = data?.data as ITutor;

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