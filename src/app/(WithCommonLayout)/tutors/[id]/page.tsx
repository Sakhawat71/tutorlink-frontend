"use client";

import { TutorDetailsComponent } from '@/components/modules/browseTutors/TutorDetails';
import { getTutorDetails } from '@/services/TutorProfile';
import { ITutor } from '@/types/tutor.type';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

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
            <div className="max-w-6xl mx-auto px-4 py-8">
                <p className="text-center text-gray-500">Loading tutor details...</p>
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