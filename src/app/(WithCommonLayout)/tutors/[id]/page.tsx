"use client";

import { TutorDetailsComponent } from '@/components/modules/browseTutors/TutorDetails';
import { getTutorDetails } from '@/services/TutorProfile';
import { ITutor } from '@/types/tutor.type';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FadeLoader } from 'react-spinners';


const TutorDetailsPage = () => {

    const [tutor, setTutor] = useState<ITutor | null>(null);
    const params = useParams();

    useEffect(() => {
        const fetchTutorDetails = async (id: string) => {
            try {
                const details = await getTutorDetails(id);
                setTutor(details.data);
            } catch (error) {
                console.error("Failed to fetch tutor details:", error);
            }
        };

        if (params.id) {
            fetchTutorDetails(params.id as string);
        }
    }, [params.id]);


    if (!tutor) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FadeLoader />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {tutor && <TutorDetailsComponent tutor={tutor} />}
        </div>
    );
};

export default TutorDetailsPage;