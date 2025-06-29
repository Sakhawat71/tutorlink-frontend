"use client";

import { TutorDetailsComponent } from '@/components/modules/browseTutors/TutorDetails';
import { getTutorDetails } from '@/services/TutorProfile';
import { ITutor } from '@/types/tutor.type';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const TutorDetailsPage = () => {
    
    const [tutor, setTutor] = useState<ITutor | null>(null);
    const params = useParams();

    useEffect(()=>{
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
    },[params.id]);

    // console.log(tutor);

    return (
        <div className="bg-gray-50 min-h-screen">
            <p>Details page</p>
            {tutor && <TutorDetailsComponent tutor={tutor} />}
        </div>
    );
};

export default TutorDetailsPage;