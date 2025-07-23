"use client";

import React from 'react';
import { useTutor } from '@/providers/TutorProvider';
import { BookSession } from '@/components/modules/booking/BookSession';
import { FadeLoader } from 'react-spinners';
import { ITutor } from '@/types';


const BookTutorPage = () => {

    const tutorData = useTutor();
    const tutor = tutorData?.data || null;

    if (!tutorData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FadeLoader />
            </div>
        );
    }

    return (
        <div>
            <BookSession tutor={tutor} />
        </div>
    );
};

export default BookTutorPage;

//  studentId
//   tutorId
//   date
//   duration
//   price 